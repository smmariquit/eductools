import os
import re
import glob

def camel_to_kebab(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1-\2', s1).lower()

visualizers = glob.glob('src/pages/visualizers/*.tsx')

for filepath in visualizers:
    filename = os.path.basename(filepath)
    if filename in ['PhotosynthesisVisualizer.tsx', 'ComputerScienceVisualizer.tsx']:
        continue

    module_name = filename.replace('Visualizer.tsx', '')
    kebab_name = camel_to_kebab(module_name)
    mdx_path = f'src/content/blog/{kebab_name}.mdx'

    with open(filepath, 'r') as f:
        content = f.read()

    # Find educationalContent={...}
    # It might be educationalContent={<>...</>} or educationalContent={<div>...</div>}
    # We will use a stack to find the matching closing brace for educationalContent={
    start_idx = content.find('educationalContent={')
    if start_idx == -1:
        continue

    brace_start = start_idx + len('educationalContent=')
    if content[brace_start] != '{':
        continue

    brace_count = 0
    end_idx = -1
    for i in range(brace_start, len(content)):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                end_idx = i
                break

    if end_idx == -1:
        print(f"Could not find matching brace in {filename}")
        continue

    # Extract the original JSX content to put into the MDX file
    original_jsx = content[brace_start+1:end_idx].strip()
    
    # Very rough cleanup of JSX to Markdown (just stripping tags for the placeholder)
    rough_md = re.sub(r'<[^>]+>', '\n', original_jsx)
    rough_md = re.sub(r'\n\s*\n', '\n\n', rough_md).strip()

    # Create the MDX file
    mdx_content = f"""# {module_name} Deep Dive

{rough_md}

## Dissection of Variables

- **Variable 1**: Explanation of how it works in the physical world.
- **Variable 2**: Deep dive into the math and units.

---
*Note: This is a deep dive section that breaks down the variables and the underlying physics/math of the simulation.*
"""
    if not os.path.exists(mdx_path):
        with open(mdx_path, 'w') as f:
            f.write(mdx_content)

    # Replace the educationalContent in TSX
    new_educational_content = f"educationalContent={{<{module_name}Mdx />}}"
    content = content[:start_idx] + new_educational_content + content[end_idx+1:]

    # Add the import at the top
    import_statement = f"import {module_name}Mdx from '../../content/blog/{kebab_name}.mdx';\n"
    if import_statement not in content:
        # Just insert it at the very top (index 0) or after the first line if there are directives
        content = import_statement + content

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"Migrated {filename} to MDX.")
