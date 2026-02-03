const fs = require('fs');
const path = require('path');

console.log('CWD:', process.cwd());

try {
    const publicItems = fs.readdirSync('public');
    console.log('public contains:', publicItems);

    if (publicItems.includes('ASSETS') || publicItems.includes('assets')) {
        const assetsName = publicItems.find(i => i.toLowerCase() === 'assets');
        const assetsPath = path.join('public', assetsName);
        console.log(`Found assets dir: ${assetsPath}`);

        const subItems = fs.readdirSync(assetsPath);
        console.log('Assets subitems:', subItems);
    } else {
        console.error('ASSETS folder NOT found in public');
    }
} catch (e) {
    console.error('Error:', e);
}
