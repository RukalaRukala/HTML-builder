const fs = require('fs');
const path = require('path');
const index = '06-build-page/project-dist/index.html';
const style = '06-build-page/project-dist/style.css';
const stylesFolder = '06-build-page/styles';
const fromAssets = '06-build-page/assets';
const assetsFolder = '06-build-page/project-dist/assets';
let rowsTemplate = [];

fs.mkdir('06-build-page/project-dist', {recursive: true}, (err) => { if (err) throw err; });

fs.stat(index, (err, stats) => {
  if (!stats) {
    fs.writeFile(index, '', () => {});
  } else {
    fs.truncate(index, () => {});
  }
});

fs.stat(style, (err, stats) => {
  if (!stats) {
    fs.writeFile(style, '', () => {});
  } else {
    fs.truncate(style, () => {});
  }
});

fs.readdir(stylesFolder, (err, data) => {
  data.forEach(file => {
    fs.stat(`${stylesFolder}/${file}`, (err, stats) => {
      if (stats.isFile() && path.extname(file) === '.css') {
        fs.readFile(`${stylesFolder}/${file}`, 'utf-8', (err, data) => {
          fs.appendFile(style, data + '\n', 'utf-8', () => {})
        });
      }
    });
  });
});

async function copyAssets(path, where) {
  const data = await fs.promises.readdir(path, {withFileTypes:true});
  await fs.promises.mkdir(where, {recursive: true}, (err) => { if (err) throw err; });
  data.forEach(dirent => {
    if (dirent.isFile()) {
      fs.promises.copyFile(`${path}/${dirent.name}`,`${where}/${dirent.name}`);
    } else if (dirent.isDirectory()) {
      copyAssets(`${path}/${dirent.name}`,`${where}/${dirent.name}`);
    }
  });
}

copyAssets('06-build-page/assets', '06-build-page/project-dist/assets');

async function completeIndex() {

  rowsTemplate = (await fs.promises.readFile('06-build-page/template.html', 'utf-8', (data) => {})).split('\n');
  let compFiles = {};

  for (let i = 0; i < rowsTemplate.length; i += 1) {
    if (rowsTemplate[i].includes('{{')) {
      rowsTemplate[i] = rowsTemplate[i].trim().split(' ');
      await rowsTemplate[i].forEach(teg => {return teg.trim() + '\n'});
    }
  }

  for (let i = 0; i < rowsTemplate.length; i += 1) {
    if (Array.isArray(rowsTemplate[i])) {
      rowsTemplate = rowsTemplate.slice(0, i).concat(rowsTemplate[i], rowsTemplate.slice(i + 1));
    }
  }

  for (let i = 0; i < rowsTemplate.length; i += 1) {
    if (rowsTemplate[i].includes('{{')) {
      let file = rowsTemplate[i].slice(2,-2) + '.html';
      rowsTemplate[i] = await fs.promises.readFile('06-build-page/components/' + file, 'utf-8', (data) => {});
    }
  }

  await fs.promises.writeFile(index, rowsTemplate.join('\n'));

}

completeIndex();