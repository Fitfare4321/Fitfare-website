with open("src/pages/PrivacyPolicyPage.tsx", "r") as f:
    content = f.read()

content = content.replace("dangerouslySetInnerHTML={ __html:", "dangerouslySetInnerHTML={{ __html:")
content = content.replace("} />\n                </h2>", "}} />\n                </h2>")
content = content.replace("animate={ rotate:", "animate={{ rotate:")
content = content.replace(" ? 45 : 0 } transition={ duration: 0.2 }>", " ? 45 : 0 }} transition={{ duration: 0.2 }}>")

with open("src/pages/PrivacyPolicyPage.tsx", "w") as f:
    f.write(content)

print("Fixed JSX syntax")
