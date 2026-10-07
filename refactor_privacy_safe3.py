import re

with open("temp_privacy.tsx", "r") as f:
    content = f.read()

def replacer(match):
    section_id = match.group(1)
    inner_content = match.group(3)
    
    # Extract the header div. It starts with <div className="flex items-center gap-3 and ends with one or more </div>
    header_div_match = re.search(r'<div className="flex items-center gap-3[^>]*>[\s\S]*?<h2[^>]*>(.*?)<\/h2>(?:\s*<\/div>)+', inner_content, re.DOTALL)
    
    if not header_div_match:
        print("Header div not found for section", section_id)
        return match.group(0)
    
    h2_text = header_div_match.group(1).strip()
    h2_text = h2_text.replace('`', '\\`')
    
    body_content = inner_content.replace(header_div_match.group(0), "").strip()
    
    # Just to verify, body_content should not start with </div>
    if body_content.startswith("</div"):
        print(f"ERROR: body_content for {section_id} still starts with </div")
        
    new_section = f"""<div id="{section_id}" className="border-b border-white/10 last:border-b-0 scroll-mt-32">
              <button 
                onClick={{() => toggleSection("{section_id}")}}
                className="w-full py-6 sm:py-8 flex items-center justify-between text-left group transition-colors"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#D9A84E] transition-colors pr-6">
                  <span dangerouslySetInnerHTML={{{{ __html: `{h2_text}` }}}} />
                </h2>
                <span className="flex-shrink-0 text-white group-hover:text-[#D9A84E] transition-colors flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] border border-white/10">
                  <m.div animate={{{{ rotate: openSections.includes("{section_id}") ? 45 : 0 }}}} transition={{{{ duration: 0.2 }}}}>
                    <Plus size={{20}} />
                  </m.div>
                </span>
              </button>
              <AnimatePresence initial={{false}}>
                {{openSections.includes("{section_id}") && (
                  <m.div
                    initial={{{{ height: 0, opacity: 0 }}}}
                    animate={{{{ height: "auto", opacity: 1 }}}}
                    exit={{{{ height: 0, opacity: 0 }}}}
                    transition={{{{ duration: 0.3, ease: "easeInOut" }}}}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 text-slate-300 space-y-6">
                      {body_content}
                    </div>
                  </m.div>
                )}}
              </AnimatePresence>
            </div>"""
    return new_section

new_content = re.sub(r'<m\.section[\s\S]*?id="([^"]+)"[\s\S]*?className="([^"]+)"[\s\S]*?>([\s\S]*?)<\/m\.section>', replacer, content)

# Check if main exists
main_match = re.search(r'<main className="[^"]*">([\s\S]*?)<\/main>\s*<\/div>\s*<\/div>', new_content)
if main_match:
    print("Found main tag. Good to go.")
    
    # We will write the final file directly to src/pages/PrivacyPolicyPage.tsx
    # But wait, we need to add the imports and state first.
    if "AnimatePresence" not in new_content:
        new_content = new_content.replace('import { m } from "framer-motion";', 'import { m, AnimatePresence } from "framer-motion";')
    if "Plus" not in new_content:
        new_content = new_content.replace("Shield,", "Shield,\n  Plus,")

    if "openSections" not in new_content:
        new_content = new_content.replace(
            'const [activeSection, setActiveSection] = useState<string>("who");',
            'const [activeSection, setActiveSection] = useState<string>("who");\n  const [openSections, setOpenSections] = useState<string[]>(["who"]);\n\n  const toggleSection = (id: string) => {\n    setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);\n  };'
        )

    new_content = new_content.replace(
        'const scrollTo = (id: string) => {\n    const el = document.getElementById(id);',
        'const scrollTo = (id: string) => {\n    setOpenSections(prev => prev.includes(id) ? prev : [...prev, id]);\n    setTimeout(() => {\n      const el = document.getElementById(id);'
    )
    new_content = new_content.replace(
        'setShowMobileTOC(false);\n    }\n  };',
        'setShowMobileTOC(false);\n      }\n    }, 100);\n  };'
    )
    
    start_marker = "{/* Hero Header */}"
    end_marker = "{/* Right Column: Full Complete Policy Content */}"
    
    pre_hero = new_content[:new_content.find(start_marker)]
    post_hero = new_content[new_content.find(end_marker) + len(end_marker):]
    
    main_match = re.search(r'<main className="[^"]*">([\s\S]*?)<\/main>\s*<\/div>\s*<\/div>', post_hero)
    
    final_content = pre_hero + f"""
      <div className="pt-40 pb-32 max-w-5xl mx-auto px-6">
        <h1 className="text-5xl sm:text-7xl font-black text-white mb-16 tracking-tight">Privacy Policy</h1>
        <div className="border-t border-white/10">
          {main_match.group(1).strip()}
        </div>
      </div>
      
      {{/* Floating Back to Top Button */}}
"""
    footer_match = re.search(r'{\/\* Floating Back to Top Button \*\/}[\s\S]*', post_hero)
    final_content += footer_match.group(0)
    
    with open("src/pages/PrivacyPolicyPage.tsx", "w") as f:
        f.write(final_content)
    print("Fixed and replaced successfully")
else:
    print("Main tag not found!")
