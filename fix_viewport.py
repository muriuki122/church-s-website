import os, glob

files = glob.glob('*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Standardize viewports to block scaling/wobbling
    content = content.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print('Viewports strictly firmly locked.')
