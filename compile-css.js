const fs = require('fs');
const path = require('path');

const partsDir = path.join(__dirname, 'css_parts');
const files = fs.readdirSync(partsDir).sort();

let fullCss = '';
for (const file of files) {
    if (file.endsWith('.css')) {
        fullCss += fs.readFileSync(path.join(partsDir, file), 'utf8') + '\n\n';
    }
}

fs.writeFileSync(path.join(__dirname, 'public', 'styles.css'), fullCss, 'utf8');
console.log(`Successfully compiled ${files.length} CSS parts into public/styles.css!`);
