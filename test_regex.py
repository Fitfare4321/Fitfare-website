import re

with open("src/pages/PrivacyPolicyPage.tsx", "r") as f:
    content = f.read()

sections_matches = list(re.finditer(r'<m\.section[\s\S]*?id="([^"]+)"[\s\S]*?className="([^"]+)"[\s\S]*?>([\s\S]*?)<\/m\.section>', content))

print(f"Found {len(sections_matches)} sections")
