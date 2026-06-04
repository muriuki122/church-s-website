import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find occurrences of Kaloleni that are NOT part of a url (like youtube.com/@churchofelohimkaloleni)
    # or email (support@churchofelohimkaloleni.org)
    # We can use a regex that matches Kaloleni only if it's not preceded/followed by url/email characters
    # Or simpler: replace 'Kaloleni Seventh day Church of Elohim'
    # replace 'Kaloleni Church of Elohim'
    # replace 'Kaloleni Church'
    # replace 'Kaloleni Seventh Day Church'
    # replace 'Kanisa la Kaloleni la Siku ya Saba'
    # replace 'Kanisa la Kaloleni'
    # replace 'Kilisiya ya Kaloleni'
    # replace 'Kaloleni' -> 'Church of Elohim, 7th day' except in specific places

    replacements = [
        ("Kaloleni Seventh day Church of Elohim", "Church of Elohim, 7th day"),
        ("Kaloleni Church of Elohim", "Church of Elohim, 7th day"),
        ("Kaloleni Church", "Church of Elohim, 7th day"),
        ("Kaloleni Seventh Day Church", "Church of Elohim, 7th day"),
        ("Kanisa la Kaloleni la Siku ya Saba", "Kanisa la Church of Elohim, 7th day la Siku ya Saba"),
        ("Kanisa la Kaloleni", "Kanisa la Church of Elohim, 7th day"),
        ("Kilisiya ya Kaloleni", "Kilisiya ya Church of Elohim, 7th day"),
        ("Kaloleni, Nairobi, Kenya", "Church of Elohim, 7th day, Nairobi, Kenya"),
        ("Kaloleni Estate", "Church of Elohim, 7th day Estate"),
        ("Find Us in Kaloleni", "Find Us at Church of Elohim, 7th day"),
        ("Kaloleni", "Church of Elohim, 7th day")
    ]

    new_content = content
    # We want to replace "Kaloleni" but ignore it if it's "kaloleni" (lowercase) in urls/emails
    # Let's just do a case-sensitive replacement for "Kaloleni", since URLs are usually lowercase, 
    # except wait: the script should avoid replacing in URLs even if they have Kaloleni.
    # URLs in this project seem to use `kaloleni` lowercase: `churchofelohimkaloleni`
    # Let's replace "Kaloleni" with "Church of Elohim, 7th day"
    
    for old, new in replacements[:-1]:
        new_content = new_content.replace(old, new)
        
    # for the lone "Kaloleni", we can do a regex to avoid matching inside other words, though "Kaloleni" is a standalone word
    # \bKaloleni\b
    new_content = re.sub(r'\bKaloleni\b', 'Church of Elohim, 7th day', new_content)

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.js', '.md')):
            filepath = os.path.join(root, file)
            process_file(filepath)
