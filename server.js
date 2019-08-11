'use strict';

const net = require('net');
const port = process.env.PORT || 3001;
const server = net.createServer();
server.listen(port, () => console.log(`up on ${port}`));

let allowedEvents = ['create', 'read', 'update', 'delete', 'error', 'attack'];
let socketPool = {};

server.on('connection', (socket) => {
  let id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  console.log('Welcome', id);
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('close', () => {
    delete socketPool[id];
  })
});

function dispatchEvent(buffer) {
  let text = buffer.toString().trim();
  let [event, payload] = text.split(/\s+(.*)/);

  if( allowedEvents.includes(event) ) {
    let eventPayload = {event,payload};
    let message = JSON.stringify(eventPayload);

    console.log('OK', eventPayload);

    for( let socket in socketPool ){
      socketPool[socket].write(message)
    }
  } else {
    console.log(`IGNORE ${event}`);
  }
}
