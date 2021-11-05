const path = require('path');
const fs = require('fs');
const { unlink, mkdir, copyFile } = require('fs/promises');

const pathForDir = path.join(__dirname, 'files');
const pathForNewDir = path.join(__dirname, 'files-copy');


fs.readdir(pathForDir, {withFileTypes: true}, (err, data) => {
  if (err) throw err;
  mkdir(pathForNewDir, { recursive: true });
  
  data.forEach(element => {

      
    copyFile(path.join(pathForDir, element.name), path.join(pathForNewDir, element.name));
  });
});

fs.readdir(pathForNewDir, {withFileTypes: true}, (err, data) => {
  if (err) throw err;
  data.forEach(element => {
    fs.stat(path.join(pathForDir, `${element.name}`), (err, stats) => {
      if (stats === undefined) unlink(path.join(pathForNewDir, `${element.name}`));
    });
  });
});

console.log('Файлы скопированы');
