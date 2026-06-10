import os
import glob
import re
import shutil

deep_dive_dir = 'src/content/deep-dives'
if not os.path.exists(deep_dive_dir):
    os.makedirs(deep_dive_dir)

# Find all visualizers
visualizers = glob.glob('src/pages/visualizers/*.tsx')

for filepath in visualizers:
    # Read the file
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Find the import statement from `src/content/blog/...`
    # It looks like: import ModuleNameMdx from '../../content/blog/module-name.mdx';
    match = re.search(r"import\s+(\w+Mdx)\s+from\s+['\"]../../content/blog/([^'\"]+\.mdx)['\"];", content)
    
    if match:
        import_name = match.group(1)
        mdx_filename = match.group(2)
        old_mdx_path = os.path.join('src/content/blog', mdx_filename)
        new_mdx_path = os.path.join(deep_dive_dir, mdx_filename)
        
        # Move the file if it exists in the old location
        if os.path.exists(old_mdx_path):
            shutil.move(old_mdx_path, new_mdx_path)
            print(f"Moved {mdx_filename} to deep-dives.")
        
        # Update the import path
        new_content = content.replace(
            f"from '../../content/blog/{mdx_filename}'",
            f"from '../../content/deep-dives/{mdx_filename}'"
        )
        
        with open(filepath, 'w') as f:
            f.write(new_content)
