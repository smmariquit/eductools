import os
import glob
import re

visualizers = glob.glob('src/pages/visualizers/*.tsx')

for filepath in visualizers:
    with open(filepath, 'r') as f:
        content = f.read()
    
    # 1. Extract the name of the MDX file from the import
    match = re.search(r"import\s+(\w+Mdx)\s+from\s+['\"]../../content/(?:deep-dives|blog)/([^'\"]+)\.mdx['\"];", content)
    
    if match:
        import_name = match.group(1)
        mdx_filename = match.group(2)
        
        # 2. Remove the import statement
        content = re.sub(r"import\s+" + import_name + r"\s+from\s+['\"]../../content/(?:deep-dives|blog)/" + mdx_filename + r"\.mdx['\"];\n*", "", content)
        
        # 3. Replace educationalContent={<...Mdx />} with guideLink="/blog/filename"
        # Since VisualizerLayout can be multi-line, we search for educationalContent
        content = re.sub(r"educationalContent=\{<" + import_name + r"\s*/>\}", f'guideLink="/blog/{mdx_filename}"', content)
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath} to use guideLink='/blog/{mdx_filename}'")
    else:
        print(f"No MDX import found in {filepath}")
