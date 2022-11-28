const stdin = process.stdin;
const stdout = process.stdout;

stdin.on('data', (msg) => {
  stdout.write(msg.toString().toUpperCase());
});
