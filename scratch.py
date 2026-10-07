import re

with open("src/pages/PrivacyPolicyPage.tsx", "r") as f:
    content = f.read()

# Add import if not exists
if "import { m } from \"framer-motion\";" not in content:
    content = content.replace(
        "import React, { useState, useEffect } from \"react\";",
        "import React, { useState, useEffect } from \"react\";\nimport { m } from \"framer-motion\";"
    )

# Replace sections
content = re.sub(
    r'<section\s+id=',
    r'<m.section\n              initial={{ opacity: 0, y: 20 }}\n              whileInView={{ opacity: 1, y: 0 }}\n              viewport={{ once: true, margin: "-50px" }}\n              transition={{ duration: 0.5, ease: "easeOut" }}\n              id=',
    content
)

# Replace closing section tags
content = content.replace("</section>", "</m.section>")

with open("src/pages/PrivacyPolicyPage.tsx", "w") as f:
    f.write(content)

print("Done")
