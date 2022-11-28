const http = require('http');
const { Readable, Writable } = require('stream');

const port = 3002;

// stream.write

function* run() {
  for (let i = 0; i <= 99; i++) {
    const data = {
      name: `entry-${i}`,
      at: Date.now(),
    };

    yield data;
  }
}

function serverHandler(req, res) {
  const stream = new Readable({
    read() {
      for (const data of run()) {
        this.push(JSON.stringify(data));
      }

      this.push(null);
    },
  });

  stream.pipe(res);
}

http
  .createServer(serverHandler)
  .listen(port)
  .on('listening', () => console.log('server is listening at ', port));
