// Script to update product imports to use optimized thumbnails
import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PRODUCTS_FILE = join(__dirname, '../src/data/products.js');

async function updateImports() {
    console.log('📝 Updating product imports to use thumbnails...\n');

    let content = await readFile(PRODUCTS_FILE, 'utf-8');

    // Replace all image imports to use _thumbnail versions
    const importRegex = /import\s+(\w+)\s+from\s+'([^']+\/([\w\d]+)\.(webp|jpeg|jpg|png))';/g;

    content = content.replace(importRegex, (match, varName, path, filename, ext) => {
        // Skip if already a thumbnail
        if (path.includes('_thumbnail') || path.includes('_medium') || path.includes('_large')) {
            return match;
        }

        // Replace extension with _thumbnail.webp
        const newPath = path.replace(new RegExp(`${filename}\\.${ext}$`), `${filename}_thumbnail.webp`);
        console.log(`  ✓ ${varName}: ${filename}.${ext} → ${filename}_thumbnail.webp`);
        return `import ${varName} from '${newPath}';`;
    });

    await writeFile(PRODUCTS_FILE, content, 'utf-8');
    console.log('\n✅ Product imports updated successfully!');
}

updateImports().catch(console.error);
