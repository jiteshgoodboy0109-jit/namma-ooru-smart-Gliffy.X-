import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR = join(__dirname, '../src/assets/images/products');
const SIZES = {
    thumbnail: 400,  // For product grid
    medium: 800,     // For modal view
    large: 1200      // For zoom/detail
};

async function getAllImageFiles(dir, fileList = []) {
    const files = await readdir(dir, { withFileTypes: true });

    for (const file of files) {
        const filePath = join(dir, file.name);
        if (file.isDirectory()) {
            await getAllImageFiles(filePath, fileList);
        } else if (/\.(jpg|jpeg|png|webp)$/i.test(file.name)) {
            fileList.push(filePath);
        }
    }

    return fileList;
}

async function compressImage(inputPath) {
    const ext = extname(inputPath).toLowerCase();
    const baseName = basename(inputPath, ext);
    const dirName = dirname(inputPath);

    console.log(`Processing: ${inputPath}`);

    try {
        // Generate optimized WebP versions at different sizes
        for (const [sizeName, width] of Object.entries(SIZES)) {
            const outputPath = join(dirName, `${baseName}_${sizeName}.webp`);

            await sharp(inputPath)
                .resize(width, width, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({
                    quality: sizeName === 'thumbnail' ? 75 : 85,
                    effort: 6
                })
                .toFile(outputPath);

            console.log(`  ✓ Created ${sizeName}: ${outputPath}`);
        }

        // Also create optimized original size WebP
        if (ext !== '.webp') {
            const outputPath = join(dirName, `${baseName}.webp`);
            await sharp(inputPath)
                .webp({ quality: 85, effort: 6 })
                .toFile(outputPath);
            console.log(`  ✓ Converted to WebP: ${outputPath}`);
        } else {
            // Re-compress existing WebP
            const outputPath = join(dirName, `${baseName}_optimized.webp`);
            await sharp(inputPath)
                .webp({ quality: 85, effort: 6 })
                .toFile(outputPath);
            console.log(`  ✓ Optimized WebP: ${outputPath}`);
        }

    } catch (error) {
        console.error(`  ✗ Error processing ${inputPath}:`, error.message);
    }
}

async function main() {
    console.log('🚀 Starting image compression...\n');
    console.log(`Source directory: ${SOURCE_DIR}\n`);

    if (!existsSync(SOURCE_DIR)) {
        console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
        process.exit(1);
    }

    const imageFiles = await getAllImageFiles(SOURCE_DIR);
    console.log(`Found ${imageFiles.length} images to process\n`);

    let processed = 0;
    for (const imagePath of imageFiles) {
        await compressImage(imagePath);
        processed++;
        console.log(`Progress: ${processed}/${imageFiles.length}\n`);
    }

    console.log('✅ Image compression complete!');
    console.log(`\nProcessed ${processed} images`);
    console.log('Generated thumbnail (400px), medium (800px), and large (1200px) versions');
}

main().catch(console.error);
