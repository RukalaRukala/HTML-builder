const fs = require('fs');
const path = require('path');
let stream = fs.createReadStream(path.resolve('./01-read-file/text.txt'));

stream.on('data', function(chunk) {
  console.log(chunk.toString());
});

