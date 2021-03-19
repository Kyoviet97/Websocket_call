var webSocketServer = new (require('ws')).Server({
    server: require('http').createServer(function (request, response) {
      response.end()
    }).listen(process.env.PORT || 5000)
  })

  webSocketServer.on('connection', function(socket){
    socket.on('connection', (toId, message) => {
		console.log("=================>>> connect");
    })

    socket.on("message", function(data){
		webSocketServer.clients.forEach(function each(client) {
            client.send(data);
         });
    })

	socket.on('disconnect', function() {
		console.log("=================>>> disconnect");
	})
});