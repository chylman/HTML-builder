const path = require('path');
const fs = require('fs');

const pathForStyles = path.join(__dirname, 'styles');
const pathForBundle = path.join(__dirname, 'project-dist', 'bundle.css');
const writeableStream = fs.createWriteStream(path.join(pathForBundle));

fs.readdir(pathForStyles, { withFileTypes: true}, (err, data) => {
  if (err) throw err;
  data.forEach(element => {
    if (element.name.split('.')[1] === 'css') {
      const readableStream = fs.createReadStream(path.join(pathForStyles, `${element.name}`), 'utf-8');
      readableStream.pipe(writeableStream);
    }
  });
});