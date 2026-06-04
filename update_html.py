import os
import re

html_dir = r'C:\Users\Caro\Downloads\projects\church-s-website'
replacement = '''<div class="language-switcher-container">
        <div class="language-switcher">
            <ul class="language-dropdown">
                <li data-lang="en" class="active">English</li>
                <li data-lang="sw">Kiswahili</li>
                <li data-lang="rw">Kinyarwanda</li>
            </ul>
        </div>
    </div>'''

for filename in os.listdir(html_dir):
    if not filename.endswith('.html'): continue
    filepath = os.path.join(html_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = re.sub(r'<div class="language-switcher">.*?</div>', replacement, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print('HTML updated.')
