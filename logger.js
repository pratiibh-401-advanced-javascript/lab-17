'use strict';

const net = require('net');

const client = new net.Socket();

// client.connect(3001, '172.16.1.18', () => console.log('connected') );
client.connect(3001, 'localhost', () => console.log('connected') );


client.on('data', function(data) {
  console.log('Data');
  let payload = JSON.parse(data);
  console.log(payload);
});

client.on('save', function(data) {
  console.log('save');
  let payload = JSON.parse(data);
  console.log(payload);
});

client.on('error', function(data) {
  console.log('error');
  let payload = JSON.parse(data);
  console.log(payload);
});

client.on('close', function() {
  console.log('Connection Closed');
});

