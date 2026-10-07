with open("src/pages/PrivacyPolicyPage.tsx", "r") as f:
    content = f.read()

content = content.replace('initial={ height: 0, opacity: 0 }', 'initial={{ height: 0, opacity: 0 }}')
content = content.replace('animate={ height: "auto", opacity: 1 }', 'animate={{ height: "auto", opacity: 1 }}')
content = content.replace('exit={ height: 0, opacity: 0 }', 'exit={{ height: 0, opacity: 0 }}')
content = content.replace('transition={ duration: 0.3, ease: "easeInOut" }', 'transition={{ duration: 0.3, ease: "easeInOut" }}')

with open("src/pages/PrivacyPolicyPage.tsx", "w") as f:
    f.write(content)

print("Fixed JSX syntax")
