const sharp = require('sharp');
const fs = require('fs');
const inDir = './hero/';
const outDir = './hero1980/';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
fs.readdirSync(inDir).forEach(file => {
    if (file.endsWith('.webp')) {
        sharp(inDir + file)
            .resize({ width: 1980 })
            .webp({ quality: 82 })
            .toFile(outDir + file, (err, info) => {
                if (err) console.log(file, 'error', err);
                else console.log('done:', file);
            });
    }
});