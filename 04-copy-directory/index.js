const fs = require('fs');


fs.mkdir('04-copy-directory/files-copy', {recursive: true}, (err) => { if (err) throw err; });

fs.readdir('04-copy-directory/files-copy', (err, data) => {
  data.forEach(file => {
    fs.unlink('04-copy-directory/files-copy/' + file, () => {});
  });
});

fs.readdir('04-copy-directory/files', (err, data) => {
  data.forEach(file => {
    fs.copyFile('04-copy-directory/files/' + file, '04-copy-directory/files-copy/' + file, () => {});
  });
})

