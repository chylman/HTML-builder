const fs = require('fs');
const path = require('path');

const pathForFolder = path.join(__dirname, 'secret-folder');


fs.readdir(pathForFolder, {withFileTypes: true}, (err, data) => {
  if (err) throw err;
  console.log(data);
  data.forEach(element => {
    if (element.isFile()) {
      fs.stat(path.join(pathForFolder, `${element.name}`), (err, stats) => {
        if (err) throw err;
        console.log(`${element.name.split('.')[0]} - ${path.extname(element.name).toUpperCase().split('.')[1]} - ${stats.size / 1000}kb`);
      });
    }
  });
});