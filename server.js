'use strict';
const express = require('express');
const { Server } = require('ws');

var WebSocketServer = require("ws").Server;

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function(message) {
    wss.clients.forEach(function each(client) {
      client.send(message);
   });
    console.log("====================>>> ", message)
  });

  ws.on('close', () => console.log('Client disconnected'));
});
