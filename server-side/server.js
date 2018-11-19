var fs = require('fs');
var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Servidor: Eco do servidor\r\n');
	socket.pipe(socket);
});

server.listen(7878, '127.0.0.1');
