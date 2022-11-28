const { get } = require('http');
const { Transform, Writable } = require('stream');
const {
  readFileSync,
  createReadStream,
  writeFileSync,
  createWriteStream,
} = require('fs');

const url = 'http://localhost:3002';
const outputFile = 'response.log';

get(url, (response) => {
  writeFileSync(outputFile, '');

  response
    .pipe(
      new Transform({
        objectMode: true,
        transform(chunk, enc, cb) {
          cb(null, chunk);
        },
      }),
    )
    .map((chunk) => {
      const item = JSON.parse(chunk);

      const number = /\d+/.exec(item.name)[0];
      const isEven = number % 2 === 0;

      item.name = item.name.concat(' is ').concat(isEven ? 'even' : 'odd');

      return JSON.stringify(item).concat('\n');
    })
    .filter((chunk) => chunk.includes('even'))
    .pipe(createWriteStream(outputFile, { flags: 'a' }));
});
