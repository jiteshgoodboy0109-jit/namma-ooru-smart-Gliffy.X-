const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    let entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
    }
}

try {
    const mappings = {
        'public/ASSETS/Water_Purifier_a': 'src/assets/images/products/water-purifiers',
        'public/ASSETS/Water_Softener_b': 'src/assets/images/products/water-softeners',
        'public/ASSETS/Inverter_Battery': 'src/assets/images/products/inverters',
        'public/ASSETS/Solar camera': 'src/assets/images/products/cameras',
        'public/ASSETS/Robotics_c': 'src/assets/images/products/robotics',
        'public/ASSETS/Robotics_d': 'src/assets/images/products/robotics'
    };

    for (const [src, dest] of Object.entries(mappings)) {
        if (fs.existsSync(src)) {
            console.log(`Copying ${src} to ${dest}...`);
            copyDir(src, dest);
        } else {
            console.error(`Skipping missing source: ${src}`);
        }
    }

    // Copy logo - try both png name variants just in case
    const logoSrc = fs.existsSync('public/logo_new.png') ? 'public/logo_new.png' :
        fs.existsSync('public/logo.png') ? 'public/logo.png' : null;

    if (logoSrc) {
        fs.mkdirSync('src/assets/images', { recursive: true });
        fs.copyFileSync(logoSrc, 'src/assets/images/logo_new.png');
        console.log(`Copied logo from ${logoSrc}`);
    } else {
        console.error('Logo file not found in public/');
    }

} catch (e) {
    console.error('Error:', e);
}
