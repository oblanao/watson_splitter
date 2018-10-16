const { readPath } = require('./config');
const { parsePdf, parseDoc, parseTxt, supported } = require('./helpers');

const fs = require('fs');
const path = require('path');

console.log('\n');

console.log('Document splitter v0.1.0 by oblanao');

console.log('\n');

console.log(`Reading files from ${readPath}`);
let filesArray = fs.readdirSync(readPath);
console.log(`${filesArray.length} files found inside ${readPath}`);

filesArray.map((file) => {
    console.log(`\tProcessing ${file}`);
    const extension = path.extname(file);
    console.log(`\t\tExtension: ${extension}`);
    if (supported(file)) {
        console.log(`\t\tFiletype supported!`);
        fileStr = readPath + file;
        if (extension === '.pdf') {
            parsePdf(file);
        } else if (extension === '.doc') {
            parseDoc(file);
        } else if (extension === '.txt') {
            parseTxt(file);
        }
    } else {
        console.log(`\t\tFiletype unsupported`);
    }
});

console.log(`Finished processing ${filesArray.length} files`);
console.log('\n');