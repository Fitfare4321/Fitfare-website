import re

with open("src/pages/PrivacyPolicyPage.tsx", "r") as f:
    content = f.read()

# Add AnimatePresence and Plus import
if "AnimatePresence" not in content:
    content = content.replace('import { m } from "framer-motion";', 'import { m, AnimatePresence } from "framer-motion";')
if "Plus" not in content:
    content = content.replace("Shield,", "Shield,\n  Plus,")

# Add state for open sections
if "openSections" not in content:
    content = content.replace(
        'const [activeSection, setActiveSection] = useState<string>("who");',
        'const [activeSection, setActiveSection] = useState<string>("who");\n  const [openSections, setOpenSections] = useState<string[]>(["who"]);\n\n  const toggleSection = (id: string) => {\n    setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);\n  };'
    )

# Modify scrollTo function
content = content.replace(
    'const scrollTo = (id: string) => {\n    const el = document.getElementById(id);',
    'const scrollTo = (id: string) => {\n    setOpenSections(prev => prev.includes(id) ? prev : [...prev, id]);\n    setTimeout(() => {\n      const el = document.getElementById(id);'
)
content = content.replace(
    'setShowMobileTOC(false);\n    }\n  };',
    'setShowMobileTOC(false);\n      }\n    }, 100);\n  };'
)

# Replace the sections
# The sections look like:
# {/* 1. Who we are & how to contact us */}
# <m.section ... id="who" className="...">
#   <div className="flex items-center gap-3 ...">
#     ...
#     <h2 ...>1. Who we are &amp; how to contact us</h2>
#   </div>
#   <p ...
# </m.section>

# Let's extract each section block.
sections_matches = list(re.finditer(r'({\/\* \d+\..*?\*\/}\s*)<m\.section[\s\S]*?id="([^"]+)" className="[^"]*">([\s\S]*?)<\/m\.section>', content))

for match in sections_matches:
    full_match = match.group(0)
    comment = match.group(1)
    section_id = match.group(2)
    inner_content = match.group(3)
    
    # Extract the header div and the rest
    # Header div starts right after inner_content and ends with </div>
    # It contains an h2.
    header_match = re.search(r'<div className="flex items-center gap-3[^>]*>[\s\S]*?<h2[^>]*>(.*?)<\/h2>[\s\S]*?<\/div>', inner_content)
    
    if header_match:
        header_div = header_match.group(0)
        h2_text = header_match.group(1).strip()
        body_content = inner_content.replace(header_div, "").strip()
        
        # Clean h2_text from any spans or inner tags if needed, but it should be fine.
        
        new_section = f"""{comment}<div id="{section_id}" className="border-b border-white/10 last:border-b-0 scroll-mt-28">
              <button 
                onClick={{() => toggleSection("{section_id}")}}
                className="w-full py-6 sm:py-8 flex items-center justify-between text-left group transition-colors"
              >
                <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#D9A84E] transition-colors pr-6">
                  {h2_text}
                </h2>
                <span className="flex-shrink-0 text-white group-hover:text-[#D9A84E] transition-colors flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/10">
                  <m.div animate={{ rotate: openSections.includes("{section_id}") ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus size={{24}} />
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
                    <div className="pb-8 space-y-6">
                      {body_content}
                    </div>
                  </m.div>
                )}}
              </AnimatePresence>
            </div>"""
        content = content.replace(full_match, new_section)

# We also need to remove the wrapper around all sections if there's any styling we don't want, but the sections were separate <m.section>s inside a <main> which is fine.

with open("src/pages/PrivacyPolicyPage.tsx", "w") as f:
    f.write(content)
print("Accordion refactored")
