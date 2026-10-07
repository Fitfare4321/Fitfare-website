import re

with open("src/pages/PrivacyPolicyPage.tsx", "r") as f:
    content = f.read()

# Make sure imports and state are set
if "AnimatePresence" not in content:
    content = content.replace('import { m } from "framer-motion";', 'import { m, AnimatePresence } from "framer-motion";')
if "Plus" not in content:
    content = content.replace("Shield,", "Shield,\n  Plus,")
if "openSections" not in content:
    content = content.replace(
        'const [activeSection, setActiveSection] = useState<string>("who");',
        'const [activeSection, setActiveSection] = useState<string>("who");\n  const [openSections, setOpenSections] = useState<string[]>(["who"]);\n\n  const toggleSection = (id: string) => {\n    setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);\n  };'
    )
if "setOpenSections(" not in content:
    # Just to be safe, patch scrollTo
    content = content.replace(
        'const scrollTo = (id: string) => {\n    const el = document.getElementById(id);',
        'const scrollTo = (id: string) => {\n    setOpenSections(prev => prev.includes(id) ? prev : [...prev, id]);\n    setTimeout(() => {\n      const el = document.getElementById(id);'
    )
    content = content.replace(
        'setShowMobileTOC(false);\n    }\n  };',
        'setShowMobileTOC(false);\n      }\n    }, 100);\n  };'
    )

def replacer(match):
    full_match = match.group(0)
    section_id = match.group(1)
    inner_content = match.group(3)
    
    # Extract the header div (the one containing h2)
    header_match = re.search(r'<div className="flex items-center gap-3[\s\S]*?<h2[^>]*>(.*?)<\/h2>[\s\S]*?<\/div>', inner_content)
    
    if header_match:
        header_div = header_match.group(0)
        # Remove numbers from the title like "1. Who we are &amp; how to contact us" -> "Who we are & how to contact us"
        # Optional: just use the raw h2_text
        h2_text = header_match.group(1).strip()
        body_content = inner_content.replace(header_div, "").strip()
        
        return f"""<div id="{section_id}" className="border-b border-white/10 last:border-b-0 scroll-mt-32">
              <button 
                onClick={{() => toggleSection("{section_id}")}}
                className="w-full py-6 sm:py-8 flex items-center justify-between text-left group transition-colors"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#D9A84E] transition-colors pr-6">
                  <span dangerouslySetInnerHTML={{ __html: `{repr(h2_text)[1:-1]}` }} />
                </h2>
                <span className="flex-shrink-0 text-white group-hover:text-[#D9A84E] transition-colors flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] border border-white/10">
                  <m.div animate={{ rotate: openSections.includes("{section_id}") ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus size={{20}} />
                  </m.div>
                </span>
              </button>
              <AnimatePresence initial={{false}}>
                {{openSections.includes("{section_id}") && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 text-slate-300 space-y-6">
                      {body_content}
                    </div>
                  </m.div>
                )}}
              </AnimatePresence>
            </div>"""
    return full_match

content = re.sub(
    r'<m\.section[\s\S]*?id="([^"]+)"[\s\S]*?className="([^"]+)"[\s\S]*?>([\s\S]*?)<\/m\.section>',
    replacer,
    content
)

# Remove `space-y-14` from `<main className="lg:col-span-8 xl:col-span-9 space-y-14">`
content = content.replace(
    '<main className="lg:col-span-8 xl:col-span-9 space-y-14">',
    '<main className="lg:col-span-8 xl:col-span-9">'
)

with open("src/pages/PrivacyPolicyPage.tsx", "w") as f:
    f.write(content)
print("Done")
