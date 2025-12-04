const fs = require('fs');
const zlib = require('zlib');

const inputPath = './copy.txt';    
const outputPath = './message.txt'; 

const gzip = zlib.createGzip();

const input = fs.createReadStream(inputPath);
const output = fs.createWriteStream(outputPath);

input.pipe(gzip).pipe(output);

console.log("File compressed!");
