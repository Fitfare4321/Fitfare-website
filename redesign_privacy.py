import re

with open("temp_privacy.tsx", "r") as f:
    content = f.read()

def replacer(match):
    section_id = match.group(1)
    inner_content = match.group(3)
    
    header_div_match = re.search(r'<div className="flex items-center gap-3[^>]*>[\s\S]*?<h2[^>]*>(.*?)<\/h2>(?:\s*<\/div>)+', inner_content, re.DOTALL)
    
    if not header_div_match:
        return match.group(0)
    
    h2_text = header_div_match.group(1).strip()
    h2_text = h2_text.replace('`', '\\`')
    
    body_content = inner_content.replace(header_div_match.group(0), "").strip()
    
    # Extract number and title
    m = re.match(r'^(\d+)\.\s*(.*)', h2_text)
    if m:
        num = int(m.group(1))
        title = m.group(2)
    else:
        num = 0
        title = h2_text
        
    num_str = f"{num:02d}" if num > 0 else "00"
    
    new_section = f"""<m.div 
              initial={{{{ opacity: 0, y: 30 }}}}
              whileInView={{{{ opacity: 1, y: 0 }}}}
              viewport={{{{ once: true, margin: "-100px" }}}}
              transition={{{{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}}}
              id="{section_id}" className="flex gap-4 sm:gap-8 group scroll-mt-24"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-5xl font-serif font-bold text-white group-hover:text-white/80 transition-colors">{num_str}</span>
                <div className="w-px h-full min-h-[100px] bg-white/20 mt-4 group-hover:bg-white/40 transition-colors"></div>
              </div>
              <div className="pb-16 flex-1 pt-1 sm:pt-3">
                <h2 className="text-xl sm:text-3xl text-white font-light tracking-widest flex flex-wrap items-center gap-2 sm:gap-4 leading-tight">
                  <span className="text-white/30 hidden sm:inline">「</span>
                  <span dangerouslySetInnerHTML={{{{ __html: `{title}` }}}} />
                  <span className="text-white/30 hidden sm:inline">」</span>
                </h2>
                <div className="text-[0.55rem] sm:text-[0.65rem] tracking-[0.2em] sm:tracking-[0.3em] text-white/40 uppercase mt-3 mb-8 sm:mb-12 break-words" dangerouslySetInnerHTML={{{{ __html: `{title}` }}}} />
                
                <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
                  {body_content}
                </div>
              </div>
            </m.div>"""
    return new_section

new_content = re.sub(r'<m\.section[\s\S]*?id="([^"]+)"[\s\S]*?className="([^"]+)"[\s\S]*?>([\s\S]*?)<\/m\.section>', replacer, content)

start_marker = "{/* Hero Header */}"
end_marker = "{/* Right Column: Full Complete Policy Content */}"
if start_marker in new_content and end_marker in new_content:
    pre_hero = new_content[:new_content.find(start_marker)]
    post_hero = new_content[new_content.find(end_marker) + len(end_marker):]
    
    main_match = re.search(r'<main className="[^"]*">([\s\S]*?)<\/main>\s*<\/div>\s*<\/div>', post_hero)
    
    if main_match:
        accordions_html = main_match.group(1).strip()
        
        # We need to construct the new full page layout.
        # Left side: fixed image, right side: sections.
        layout = f"""
      <div className="min-h-screen bg-black flex flex-col lg:flex-row">
        {{/* Left Sidebar */}}
        <div className="lg:w-[40%] xl:w-[35%] lg:fixed lg:inset-y-0 lg:left-0 flex items-center justify-center bg-black relative overflow-hidden z-10 border-b lg:border-b-0 lg:border-r border-white/10">
          <m.div 
            initial={{{{ scale: 1.05, opacity: 0 }}}}
            animate={{{{ scale: 1, opacity: 1 }}}}
            transition={{{{ duration: 1.2, ease: "easeOut" }}}}
            className="absolute inset-0 z-0"
          >
            <img src="/privacy-focus.png" alt="Focus" className="w-full h-full object-cover opacity-80 mix-blend-lighten" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent lg:hidden"></div>
          </m.div>
          <div className="relative z-10 p-12 lg:p-20 flex flex-col justify-end w-full h-full min-h-[50vh] lg:min-h-0">
             <m.div
               initial={{{{ y: 20, opacity: 0 }}}}
               animate={{{{ y: 0, opacity: 1 }}}}
               transition={{{{ delay: 0.5, duration: 0.8 }}}}
             >
                <div className="writing-vertical-rl text-white/50 tracking-[0.5em] text-xs uppercase mb-8 hidden lg:block">
                  Terms & Conditions
                </div>
                <h1 className="text-5xl sm:text-7xl font-serif font-black text-white tracking-tight leading-none mb-4">
                  Privacy<br />Policy
                </h1>
                <p className="text-white/50 tracking-[0.2em] text-xs uppercase">FitFare Legal / 2026</p>
             </m.div>
          </div>
        </div>

        {{/* Right Content */}}
        <div className="lg:w-[60%] xl:w-[65%] lg:ml-auto bg-[#0a0a0a] min-h-screen relative z-0">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{{{ backgroundImage: "url('/privacy-bg.png')", backgroundSize: "cover", backgroundAttachment: "fixed" }}}}></div>
          <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-20 pt-20 lg:pt-32 pb-32 relative z-10">
            <div className="flex flex-col">
              {accordions_html}
            </div>
          </div>
        </div>
      </div>
"""
        
        final_content = pre_hero + layout
        
        # Add footer (adjusting to the new layout)
        footer_match = re.search(r'{\/\* Floating Back to Top Button \*\/}[\s\S]*', post_hero)
        if footer_match:
            final_content += footer_match.group(0)
            
        with open("src/pages/PrivacyPolicyPage.tsx", "w") as f:
            f.write(final_content)
        print("Successfully built the new layout!")
    else:
        print("main_match not found")
else:
    print("markers not found")
