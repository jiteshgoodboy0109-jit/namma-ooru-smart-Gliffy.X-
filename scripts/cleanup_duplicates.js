import { readdir, unlink } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR = join(__dirname, '../src/assets/images/products');

async function getAllFiles(dir, fileList = []) {
    const files = await readdir(dir, { withFileTypes: true });

    for (const file of files) {
        const filePath = join(dir, file.name);
        if (file.isDirectory()) {
            await getAllFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    }

    return fileList;
}

async function cleanupDuplicates() {
    console.log('🧹 Cleaning up duplicate image files...\n');

    const allFiles = await getAllFiles(SOURCE_DIR);

    // Files to delete: _medium, _large, _optimized versions
    const filesToDelete = allFiles.filter(file =>
        file.includes('_medium.webp') ||
        file.includes('_large.webp') ||
        file.includes('_optimized.webp')
    );

    console.log(`Found ${filesToDelete.length} duplicate files to remove\n`);

    let deleted = 0;
    for (const file of filesToDelete) {
        try {
            await unlink(file);
            console.log(`  ✓ Deleted: ${file.split('products\\')[1]}`);
            deleted++;
        } catch (error) {
            console.error(`  ✗ Error deleting ${file}:`, error.message);
        }
    }

    console.log(`\n✅ Cleanup complete!`);
    console.log(`Deleted ${deleted} duplicate files`);
    console.log(`\nKept files:`);
    console.log(`  - Original images (for reference)`);
    console.log(`  - _thumbnail.webp (used in product grid)`);
}

cleanupDuplicates().catch(console.error);
