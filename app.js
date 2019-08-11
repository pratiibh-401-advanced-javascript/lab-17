// 'use strict';

// const util = require('util');
// const fs = require('fs');
// const net = require('net');

// const socket = new net.Socket();

// socket.connect(3001, 'localhost', () => console.log('connected') );


// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);

// const loadFile = (file) => {
//   console.log(file);
//   return readFile(file);
// }

// const convertBuffer = (buffer) => {
//   console.log(buffer);
//   Buffer.from(buffer.toString().trim().toUpperCase());
//   console.log(buffer);
// }

// const saveFile = (file, buffer) => {
//   return writeFile(file, buffer);
// }

// const alterFile = (file) => {
//   return loadFile(file)
//     .then((contents) => {
//       console.log('Contents', contents);
//       convertBuffer(contents);
//     })
//     .then((buffer) => {
//       console.log('undefined', buffer);
//       saveFile(file, buffer)
//     })
//     .then(() => {
//       socket.write(`save ${file}`);
//     })
//     .catch((error) => {
//       socket.write(`error ${error}`)
//     })
// };

// let file = process.argv.slice(2).shift();
// alterFile(file);

'use strict';

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.readFile);
const net = require('net');
const client = new net.Socket();

client.connect(3001, '172.16.1.18', () => {
  console.log(`I'm in!`);
});

const loadFile = (file) => readFile(file);
const saveFile = (file, buffer) => writeFile(file, buffer);
const convertBuffer = buffer => Buffer.from( buffer.toString().toUpperCase());

const alterFile = (file) => {
  return loadFile(file)
    .then(contents => convertBuffer(contents))
    .then(buffer => saveFile(file, buffer))
    .then(() => client.write(`save ${file}`) && client.end())
    .catch(error => client.write(`${error}`) && client.end());
};

let file = process.argv.slice(2).shift();
alterFile(file);
