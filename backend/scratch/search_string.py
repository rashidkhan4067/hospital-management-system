import os

search_str = "Login attempt received"
root_dir = r"e:\Download\solid project\hospital-management-system\backend"

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith(".py"):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if search_str in content:
                        print(f"Found in {path}")
            except Exception as e:
                pass
