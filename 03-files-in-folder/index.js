const fs = require('fs');
const path = require('path');

console.log();
fs.readdir('03-files-in-folder/secret-folder', (err, data) => {

  data.forEach(file => {
    fs.stat('03-files-in-folder/secret-folder/' + file, function(err, stats) {
      if (stats.isFile()) {
        console.log(`${file.split('.')[0]} - ${path.extname(file).slice(1)} - ${stats.size} b`);
      }
    });
  })
});