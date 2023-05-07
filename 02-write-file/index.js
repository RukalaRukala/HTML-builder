const fs = require('fs');
const process = require('node:process');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const messenges = ['Отлично! Добавил! Что-то ещё?',
                  'Супер! Ну ты фантазёр! Давай накидывай',
                  'Добавил! Не останавливайся!',
                  'Круто сказано! Добавил! Ещё?',
                  'Тебе бы романы писать)) Ещё строчечку?',
                  'Чуть помедленнее...Я записываю...'];

console.log('Привет! Готов содать новый файл и поместить туда твой текст. Для записи строки жди ENTER. ВВЕДИ ТЕКСТ (для остановки нажми Ctrl+C или введи "exit" на отдельной строке):')
fs.writeFile('02-write-file/NewFile.txt', '', () => {});
readline.prompt();
readline.on('line', function(cmd) {
  if (cmd.toLowerCase() === 'exit') {
    console.log();
    console.log('Спасибо! Файл "NewFile.txt" создан в директории 02-write-file. Проверь!')
    process.exit(0);
    }
  fs.appendFile('02-write-file/NewFile.txt', cmd + '\n', () => {
    let rand = Math.floor(Math.random() * messenges.length);
    console.log(messenges[rand]);
  });
});

readline.on('close', () => {
  console.log();
  console.log('Спасибо! Файл "NewFile.txt" создан в директории 02-write-file. Проверь!')
  process.exit(0);
});




