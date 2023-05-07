const fs = require('fs');
const path = require('path');
const bundle = '05-merge-styles/project-dist/bundle.css';
const stylesFolder = '05-merge-styles/styles';

fs.stat(bundle, (err, stats) => {
  if (!stats) {
    fs.writeFile(bundle, '', () => {});
  } else {
    fs.truncate(bundle, () => {});
  }
});

fs.readdir(stylesFolder, (err, data) => {

  data.forEach(file => {
    fs.stat(`${stylesFolder}/${file}`, (err, stats) => {
      if (stats.isFile() && path.extname(file) === '.css') {
        fs.readFile(`${stylesFolder}/${file}`, 'utf-8', (err, data) => {
          fs.appendFile(bundle, data + '\n', 'utf-8', () => {})
        });
      }
    });
  });
});