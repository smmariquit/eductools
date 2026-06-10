import glob
import re
import os

mdx_files = glob.glob('src/content/blog/*.mdx')
for filepath in mdx_files:
    if os.path.basename(filepath) in ['photosynthesis.mdx', 'computer-science.mdx']:
        continue
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Remove loose <> and </>
    content = content.replace('<>', '').replace('</>', '')
    
    # Remove any other unclosed tags if there are any that slipped through
    content = re.sub(r'<[^>]*>', '', content)
    
    with open(filepath, 'w') as f:
        f.write(content)
print("Fixed MDX files.")
