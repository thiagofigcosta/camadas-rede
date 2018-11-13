/* Or use this example tcp client written in node.js.  (Originated with 
example code from 
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */

var net = require('net');

var client = net.Socket();
client.connect(7878, '127.0.0.1', function() {
	console.log('Cliente conectado');
	client.write('Cliente: Olá, servidor! Sou o Cliente.');
});

client.on('data', function(data) {
	console.log('Conteúdo recebido: [' + data + ']');
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Conexão terminada');
});	