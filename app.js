// Node.js WebSocket server script
const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
const port = process.env.PORT || 5000;
server.listen(port);
const wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
    console.log("===================>>> ", message.utf8Data);
      wsServer.broadcast(message.utf8Data)
    
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });

    connection.on('disconnect', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});