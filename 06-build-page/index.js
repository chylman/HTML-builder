const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

const pathForStyles = path.join(__dirname, 'styles');
const pathForBundle = path.join(__dirname, 'project-dist', 'style.css');
const writeableStream = fs.createWriteStream(path.join(pathForBundle));
const pathForDist = path.join(__dirname, 'project-dist');
const pathForComponents = path.join(__dirname, 'components');
const pathForTemplate = path.join(__dirname, 'template.html');
let template = '';

const stream = fs.createReadStream(pathForTemplate, 'utf-8');
stream.on('data', chunk => template += chunk);
stream.on('end', () => {
  fs.readdir(pathForComponents, { withFileTypes: true }, (err, files) => {
    files.forEach(file => {
      const fileExt = file.name.split('.')[1];
      if (fileExt === 'html') {
        fs.readFile(path.join(pathForComponents, `${file.name}`), 'utf8', (err, data) => {
          if (err) throw err;
          template = template.replace(`{{${file.name.split('.')[0]}}}`, data);
          let writeableStream = fs.createWriteStream(path.join(pathForDist, 'index.html'));
          writeableStream.write(template);
        });
      }
    });
  });
});

fs.readdir(pathForStyles, { withFileTypes: true}, (err, data) => {
  if (err) throw err;
  data.forEach(element => {
    if (element.name.split('.')[1] === 'css') {
      const readableStream = fs.createReadStream(path.join(pathForStyles, `${element.name}`), 'utf-8');
      readableStream.pipe(writeableStream);
    }
  });
});

function copyFiles(__dirname, currentDir) {
  fs.mkdir(path.join(pathForDist, 'assets'), { recursive: true }, (err) => {
    if (err) throw err;
  });
  fs.readdir(__dirname, { withFileTypes: true}, (err, files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.copyFile(path.join(__dirname, `${file.name}`), path.join(pathForDist, 'assets', currentDir, `${file.name}`), (err) => {
          if (err) throw err;
        });          
      } else {
        let currentDir = file.name;
        fs.mkdir(path.join(pathForDist, 'assets', currentDir), { recursive: true }, (err) => {
          if (err) throw err;
        });
        copyFiles(path.join(__dirname, `${file.name}`), currentDir);
      }
    });
  });
}

copyFiles(path.join(__dirname, 'assets'));