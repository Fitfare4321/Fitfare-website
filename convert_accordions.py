import re

with open("src/pages/PrivacyPolicyPage.tsx", "r") as f:
    content = f.read()

# Make sure imports are present
if "AnimatePresence" not in content:
    content = content.replace('import { m } from "framer-motion";', 'import { m, AnimatePresence } from "framer-motion";')
if "Plus" not in content:
    content = content.replace("Shield,", "Shield,\n  Plus,")

def replacer(match):
    section_id = match.group(1)
    inner_content = match.group(3)
    
    # We just need to extract the h2 text.
    h2_match = re.search(r'<h2[^>]*>(.*?)<\/h2>', inner_content, re.DOTALL)
    if not h2_match:
        print("Could not find h2 in section:", section_id)
        return match.group(0)
        
    h2_text = h2_match.group(1).strip()
    
    # The body content is everything after the header div.
    # We find the header div which starts with <div className="flex items-center gap-3" and ends with </div>
    header_div_match = re.search(r'<div className="flex items-center gap-3[^>]*>[\s\S]*?<\/h2>\s*<\/div>', inner_content)
    if header_div_match:
        body_content = inner_content.replace(header_div_match.group(0), "").strip()
    else:
        print("Could not find header div in section:", section_id)
        return match.group(0)
        
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

new_content = re.sub(
    r'<m\.section[\s\S]*?id="([^"]+)"[\s\S]*?className="([^"]+)"[\s\S]*?>([\s\S]*?)<\/m\.section>',
    replacer,
    content
)

if new_content == content:
    print("NO SECTIONS REPLACED!")
else:
    with open("src/pages/PrivacyPolicyPage.tsx", "w") as f:
        f.write(new_content)
    print("Sections replaced!")
