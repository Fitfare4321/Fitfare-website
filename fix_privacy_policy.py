import re

with open("src/pages/PrivacyPolicyPage.tsx", "r") as f:
    content = f.read()

# Remove everything from {/* Hero Header */} up to {/* Right Column: Full Complete Policy Content */}
start_marker = "{/* Hero Header */}"
end_marker = "{/* Right Column: Full Complete Policy Content */}"

if start_marker in content and end_marker in content:
    pre_hero = content[:content.find(start_marker)]
    post_hero = content[content.find(end_marker) + len(end_marker):]
    
    # We also need to fix the closing tags of the grid and max-w-7xl wrappers that were opened before the main tag
    # Let's completely replace the outer wrappers too.
    
    # The structure was:
    # return (
    #   <div className="min-h-screen bg-[#07090E] ...">
    #     <PageSEO ... />
    #     <Navbar />
    #     {/* Hero Header */} ...
    #     {/* Main Two-Column Body */}
    #     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    #       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
    #         {/* Left Column: Sticky Table of Contents (Desktop lg+) */} ...
    #         {/* Right Column: Full Complete Policy Content */}
    #         <main className="...">
    #           [ACCORDIONS]
    #         </main>
    #       </div>
    #     </div>
    #   </div>
    # )
    
    # We want:
    # return (
    #   <div className="min-h-screen bg-[#07090E] ...">
    #     <PageSEO ... />
    #     <Navbar />
    #     <div className="pt-40 pb-32 max-w-5xl mx-auto px-6">
    #       <h1 className="text-5xl sm:text-7xl font-black text-white mb-16 tracking-tight">Privacy Policy</h1>
    #       <div className="border-t border-white/10">
    #         [ACCORDIONS]
    #       </div>
    #     </div>
    #   </div>
    # )
    
    # Let's extract [ACCORDIONS] which are currently inside `<main className="lg:col-span-8 xl:col-span-9">` and end with `</main>`
    main_match = re.search(r'<main className="[^"]*">([\s\S]*?)<\/main>', content)
    if main_match:
        accordions_html = main_match.group(1).strip()
        
        # Construct new content
        new_content = pre_hero + f"""
      <div className="pt-40 pb-32 max-w-5xl mx-auto px-6">
        <h1 className="text-5xl sm:text-7xl font-black text-white mb-16 tracking-tight">Privacy Policy</h1>
        <div className="border-t border-white/10">
          {accordions_html}
        </div>
      </div>
      
      {{/* Floating Back to Top Button */}}
"""
        
        # append the rest of the file (Floating back to top button and Footer)
        footer_match = re.search(r'{\/\* Floating Back to Top Button \*\/}[\s\S]*', content)
        if footer_match:
            new_content += footer_match.group(0)
            
        with open("src/pages/PrivacyPolicyPage.tsx", "w") as f:
            f.write(new_content)
        print("Hero section replaced successfully!")
    else:
        print("Could not find main element.")
else:
    print("Could not find markers.")
