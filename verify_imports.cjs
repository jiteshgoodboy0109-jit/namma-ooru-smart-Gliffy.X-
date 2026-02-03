const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, 'src', 'data', 'products.js');
const baseDir = path.dirname(productsPath);

try {
    const content = fs.readFileSync(productsPath, 'utf8');
    const importRegex = /import\s+\w+\s+from\s+['"]([^'"]+)['"]/g;

    let match;
    let missingCount = 0;

    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        const fullPath = path.resolve(baseDir, importPath);

        if (!fs.existsSync(fullPath)) {
            console.error(`MISSING: ${importPath}`);
            console.error(`  --> Resolved to: ${fullPath}`);
            missingCount++;
        } else {
            console.log(`OK: ${importPath}`);
        }
    }

    if (missingCount > 0) {
        console.error(`\nFound ${missingCount} missing files.`);
        process.exit(1);
    } else {
        console.log('\nAll imports look good!');
    }

} catch (e) {
    console.error('Error reading products.js:', e);
}
