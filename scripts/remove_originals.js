import { readdir, unlink, stat } from 'fs/promises';
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

async function removeOriginalImages() {
    console.log('🗑️  Removing original large images...\n');
    console.log('Keeping only: *_thumbnail.webp files\n');

    const allFiles = await getAllFiles(SOURCE_DIR);

    // Files to delete: All images that DON'T end with _thumbnail.webp
    const filesToDelete = allFiles.filter(file => {
        const isImage = /\.(webp|jpeg|jpg|png)$/i.test(file);
        const isThumbnail = file.includes('_thumbnail.');
        return isImage && !isThumbnail;
    });

    console.log(`Found ${filesToDelete.length} original images to remove\n`);

    let deleted = 0;
    let totalSize = 0;

    for (const file of filesToDelete) {
        try {
            const stats = await stat(file);
            totalSize += stats.size;

            await unlink(file);
            const fileName = file.split('products\\')[1] || file.split('products/')[1];
            console.log(`  ✓ Deleted: ${fileName} (${(stats.size / 1024).toFixed(1)}KB)`);
            deleted++;
        } catch (error) {
            console.error(`  ✗ Error deleting ${file}:`, error.message);
        }
    }

    console.log(`\n✅ Cleanup complete!`);
    console.log(`Deleted ${deleted} original images`);
    console.log(`Space saved: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`\nRemaining: Only optimized thumbnails (used in app)`);
}

removeOriginalImages().catch(console.error);
