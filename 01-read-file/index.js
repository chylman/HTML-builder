const path = require('path');
const fs = require('fs');
let data = '';



const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readableStream.on('data', chunk => data += chunk.toString());
readableStream.on('end', () => console.log(data));