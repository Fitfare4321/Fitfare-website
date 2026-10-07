import re

with open("src/pages/PrivacyPolicyPage.tsx", "r") as f:
    content = f.read()

# Animate Hero Header Wrapper
# Find: <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
# Replace with: <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
# Then we need to replace its closing div. It's too complex with regex to find the matching closing div. 

# Let's animate specific blocks inside the hero.
content = content.replace(
    '<div className="flex flex-wrap items-center gap-3 mb-6">',
    '<m.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap items-center gap-3 mb-6">'
)
content = content.replace(
    '<h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">',
    '<m.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">'
)
# For the h1 we need to replace </m.h1>
content = content.replace(
    'FitFare Privacy Policy\n          </h1>',
    'FitFare Privacy Policy\n          </m.h1>'
)

content = content.replace(
    '<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8 text-sm">',
    '<m.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8 text-sm">'
)

content = content.replace(
    '<p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl mb-6">',
    '<m.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl mb-6">'
)
content = content.replace(
    'all FitFare products</strong>. Read the part that applies to you:\n          </p>',
    'all FitFare products</strong>. Read the part that applies to you:\n          </m.p>'
)

content = content.replace(
    '<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mb-8">',
    '<m.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mb-8">'
)

content = content.replace(
    '<div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 max-w-4xl text-sm leading-relaxed text-blue-200/90 mb-6">',
    '<m.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 max-w-4xl text-sm leading-relaxed text-blue-200/90 mb-6">'
)

content = content.replace(
    '<p className="text-slate-400 text-sm italic max-w-4xl">',
    '<m.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="text-slate-400 text-sm italic max-w-4xl">'
)
content = content.replace(
    'stop using the products.\n          </p>',
    'stop using the products.\n          </m.p>'
)

content = content.replace(
    '<div className="flex flex-wrap items-center gap-3 pt-6">',
    '<m.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="flex flex-wrap items-center gap-3 pt-6">'
)

# Replace closing tags for m.div by counting matching div blocks. Since we replaced 6 divs, we need to carefully replace the exact closing divs.
# Actually, the quickest way is to just do a string replace of the exact closing block, or we can use regex on the hero section.
# Instead of doing that, let's just make sure all of the above divs are closed properly.
# The structure is:
# <m.div> ... </m.div> 
# Let's replace the corresponding `</div>` manually.

# 1. Badge & Breadcrumb
content = content.replace(
    'Apple & Google Play Disclosures\n            </span>\n          </div>',
    'Apple & Google Play Disclosures\n            </span>\n          </m.div>'
)

# 2. Metadata Card
content = content.replace(
    '<p className="text-white font-medium mt-1">India (DPDP Act, 2023)</p>\n            </div>\n          </div>',
    '<p className="text-white font-medium mt-1">India (DPDP Act, 2023)</p>\n            </div>\n          </m.div>'
)

# 3. Scope Pills
content = content.replace(
    '<ChevronRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />\n            </button>\n          </div>',
    '<ChevronRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />\n            </button>\n          </m.div>'
)

# 4. Info text
content = content.replace(
    'Digital Personal Data Protection Act, 2023 (DPDP)</strong>.\n          </div>',
    'Digital Personal Data Protection Act, 2023 (DPDP)</strong>.\n          </m.div>'
)

# 5. Quick Actions
content = content.replace(
    'Jump to Section ({TOC_ITEMS.length})\n            </button>\n          </div>',
    'Jump to Section ({TOC_ITEMS.length})\n            </button>\n          </m.div>'
)


# TOC Sidebar animation
content = content.replace(
    '<aside className="hidden lg:block lg:col-span-4 xl:col-span-3">',
    '<m.aside initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="hidden lg:block lg:col-span-4 xl:col-span-3">'
)
content = content.replace(
    '</a>\n              </div>\n            </div>\n          </aside>',
    '</a>\n              </div>\n            </div>\n          </m.aside>'
)

with open("src/pages/PrivacyPolicyPage.tsx", "w") as f:
    f.write(content)

print("Done hero animations")
