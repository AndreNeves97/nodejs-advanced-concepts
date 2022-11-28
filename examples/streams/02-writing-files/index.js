const crypto = require('crypto');
const { readFileSync, createReadStream, writeFileSync } = require('fs');
const http = require('http');

const port = 3002;
const filePath = 'big.file';

createFile(filePath);

http
  .createServer((req, res) => {
    hugeFileStream = createReadStream(filePath);
    hugeFileStream.pipe(res);
  })
  .listen(port)
  .on('listening', () => console.log('server is listening at ', port));

function createFile(filePath) {
  const hugeDataBuffer = crypto.randomBytes(1e9);

  console.log(`writing ${filePath}...`);
  writeFileSync(filePath, hugeDataBuffer);
  console.log('file writed');
}
