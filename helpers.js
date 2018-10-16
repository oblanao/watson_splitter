const WordExtractor = require('word-extractor');
const pdf = require('pdf-parse');

const fs = require('fs');
const path = require('path');

const { readPath, savePath, chunkSize } = require('./config');

const supported = (filename) => {
    const extension = path.extname(filename);
    const extensionList = ['.doc', '.pdf', '.txt'];
    if (extensionList.indexOf(extension) > -1) return true;
    return false;
}

const parsePdf = (file) => {
    let fileString = readPath + file;
    let dataBuffer = fs.readFileSync(fileString);
    pdf(dataBuffer).then((data) => {
        splitText(file, data.text);
    });
}

const parseDoc = (file) => {
    let fileString = readPath + file;
    let extractor = new WordExtractor();
    const extracted = extractor.extract(fileString);
    extracted.then((doc) => {
        splitText(file, doc.getBody());
    });
}

const parseTxt = (file) => {
    let fileString = readPath + file;
    fs.readFile(fileString, 'utf-8', (err, data) => {
        if (err) throw err;
        splitText(file, data);
    });
}

const splitText = (file, text) => {
    console.log(`Splitting file ${file}`);
    
    const words = text.split(" ");
    console.log(`\tInside ${file} there are ${words.length} words.`)
    let tempArray = [];
    let totalSplits = 0;
    for (i = 0; i < words.length; i += chunkSize) {
        tempArray = words.slice(i, i + chunkSize);
        let txtFilename = `${savePath}${file}${totalSplits}.txt`;
        console.log(`\t\tSaving ${txtFilename}`);
        fs.writeFile(txtFilename, tempArray.join(" "), (err) => {
            if (err) {
                console.log(`\t\tError saving ${txtFilename}!`);
            }
        });
        totalSplits++;
    }
    console.log(`\tFile ${file} has been split into ${totalSplits} files inside ${savePath}`);
    console.log('\n');
}

module.exports = {
    parsePdf,
    parseDoc,
    parseTxt,
    supported
}