var fs = require('fs');

var net = require('net');

var client = net.Socket();
client.connect(7878, '127.0.0.1', function() {
	console.log('Cliente conectado');
	client.write('Cliente: Olá, servidor! Sou o Cliente.');
});

client.on('data', function(data) {
	console.log('Conteúdo recebido: [' + data + ']');
	client.destroy();
});

client.on('close', function() {
	console.log('Conexão terminada');
});	

var msg = fs.readFileSync('../message_master.txt', 'utf8');
console.log(msg);

var seq=0;
var ack=0;
var limite_bytes = 1000000000;

ack += unescape(encodeURIComponent(msg)).length; // msg (encoded in bytes) size

var time = new Date().toLocaleString(); // formato: 11/16/2015, 11:18:48 PM
var separator = String.fromCharCode(30);
var pdu = msg + separator + seq.toString() + separator + ack.toString() + separator + limite_bytes.toString() + separator + time;

fs.writeFileSync('../message_master.txt', pdu);
