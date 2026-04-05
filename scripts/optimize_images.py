
import os
from PIL import Image

def optimize_images(directory, quality=80, max_width=1200):
    extensions = ['.jpg', '.jpeg', '.png', '.webp']
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in extensions:
                file_path = os.path.join(root, file)
                try:
                    with Image.open(file_path) as img:
                        # Convert RGBA to RGB if saving as JPEG
                        if img.mode in ('RGBA', 'P') and ext in ['.jpg', '.jpeg']:
                            img = img.convert('RGB')
                        
                        # Resize if width exceeds max_width
                        if img.width > max_width:
                            ratio = max_width / float(img.width)
                            new_height = int((float(img.height) * float(ratio)))
                            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                            print(f"Resized {file}")

                        # Save with optimization
                        img.save(file_path, optimize=True, quality=quality)
                        print(f"Optimized {file}")
                        
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    base_dir = os.path.join(os.getcwd(), 'public')
    print(f"Starting optimization in {base_dir}")
    optimize_images(base_dir)
    print("Optimization complete.")
