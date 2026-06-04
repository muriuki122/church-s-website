import os
import re

js_dir = r'C:\Users\Caro\Downloads\projects\church-s-website\js'

for filename in os.listdir(js_dir):
    if not filename.endswith('.js'): continue
    filepath = os.path.join(js_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace .lang-btn with .language-dropdown li
    new_content = content.replace('.lang-btn', '.language-dropdown li')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print('JS updated.')
