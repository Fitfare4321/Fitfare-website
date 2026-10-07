import re

with open("src/pages/PrivacyPolicyPage.tsx", "r") as f:
    content = f.read()

# 1. Update <table ...>
content = re.sub(
    r'<table className="w-full text-left text-sm">',
    r'<table className="w-full text-left text-sm mt-4">',
    content
)

# 2. Update <thead> <tr>
content = re.sub(
    r'<tr className="border-b border-white/10 bg-white/\[0\.04\] text-slate-300 font-semibold text-xs uppercase tracking-wider">',
    r'<tr className="text-slate-400 font-bold text-xs uppercase tracking-wider">',
    content
)

# 3. Update <th>
content = re.sub(
    r'<th className="py-3\.5 px-5">',
    r'<th className="pb-6 pr-4 font-semibold align-bottom">',
    content
)
content = re.sub(
    r'<th className="py-3\.5 px-5 w-1/3">',
    r'<th className="pb-6 pr-4 font-semibold align-bottom w-1/3">',
    content
)
content = re.sub(
    r'<th className="py-3\.5 px-5 w-1/4">',
    r'<th className="pb-6 pr-4 font-semibold align-bottom w-1/4">',
    content
)

# 4. Update <tbody>
content = re.sub(
    r'<tbody className="divide-y divide-white/\[0\.06\] text-slate-300">',
    r'<tbody className="text-slate-200">',
    content
)

# 5. Update <tbody> <tr>
content = re.sub(
    r'<tr className="hover:bg-white/\[0\.02\] transition-colors">',
    r'<tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group">',
    content
)
content = re.sub(
    r'<tr className="border-t border-white/20 hover:bg-white/\[0\.02\] transition-colors group">',
    r'<tr className="border-b border-white/20 hover:bg-white/[0.02] transition-colors group">',
    content
)

# 6. Update <td>
content = re.sub(
    r'<td className="py-3\.5 px-5 font-medium">',
    r'<td className="py-8 pr-4 font-medium align-top group-hover:text-white transition-colors">',
    content
)
content = re.sub(
    r'<td className="py-3\.5 px-5">',
    r'<td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">',
    content
)
content = re.sub(
    r'<td className="py-3\.5 px-5 align-top">',
    r'<td className="py-8 pr-4 align-top text-slate-400 group-hover:text-slate-200 transition-colors">',
    content
)

with open("src/pages/PrivacyPolicyPage.tsx", "w") as f:
    f.write(content)
