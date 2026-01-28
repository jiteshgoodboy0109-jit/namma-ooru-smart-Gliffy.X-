import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = 'public';

async function optimize() {
    console.log('--- Starting Image Optimization ---');

    // 1. Optimize Logo
    if (fs.existsSync(path.join(publicDir, 'logo.png'))) {
        console.log('Optimizing logo.png -> logo.webp');
        await sharp(path.join(publicDir, 'logo.png'))
            .webp({ quality: 80 })
            .toFile(path.join(publicDir, 'logo.webp'));
    }

    // 2. Optimize Desktop Hero
    if (fs.existsSync(path.join(publicDir, 'home.jpg'))) {
        console.log('Optimizing home.jpg -> home.webp');
        await sharp(path.join(publicDir, 'home.jpg'))
            .webp({ quality: 80 })
            .toFile(path.join(publicDir, 'home.webp'));
    }

    // 3. Optimize Mobile Hero (Resize to 1080px width max)
    if (fs.existsSync(path.join(publicDir, 'home-m.jpg'))) {
        console.log('Optimizing home-m.jpg -> home-m.webp (resizing)');
        await sharp(path.join(publicDir, 'home-m.jpg'))
            .resize({ width: 1080 })
            .webp({ quality: 75 })
            .toFile(path.join(publicDir, 'home-m.webp'));
    }

    console.log('--- Optimization Complete ---');
}

optimize().catch(err => {
    console.error('Optimization failed:', err);
    process.exit(1);
});
