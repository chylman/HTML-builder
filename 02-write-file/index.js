const path = require('path');
const fs = require('fs');
const process = require('process');
const { stdin: input } = require('process');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const readline = require('readline');
const rl = readline.createInterface({ input });

fs.writeFile (
  path.join(__dirname, 'text.txt'),
  '',
  (err) => {
    if (err) throw err;
    console.log('Файл создан, введите данные');
  }
);

rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Файл сохранён');
    process.exit();
  } else {
    output.write(`${input}\n`);
  }
});

process.on( 'SIGINT', function() {
  console.log('Файл сохранён');
  process.exit();
});