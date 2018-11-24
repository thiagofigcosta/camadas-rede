var crc = require('crc');
var convert_string = require('convert-string');
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

/*
estrutura da pdu
- camada anterior: ip destino, porta destino
sequence number
acknowledgmente number
data offset
windows_size
checksum (feito da seq. bytes msg + padding)
time
padding
data
*/

var seq=0;
var ack=0;
var bytes_from_data = convert_string.UTF8.stringToBytes(msg); // msg (encoded in bytes)
var data_offset = bytes_from_data.length;
ack += data_offset;
var window_size = 1000000000;
var time = new Date().toLocaleString(); // formato: 11/16/2015, 11:18:48 PM
var padding_size = 100 - data_offset;
var padding_and_msg = Array(100);
for (var i=0; i<padding_size; i++) {
	if(i<padding_size){
		padding_and_msg[i] = bytes_from_data[i];
	} else {
		padding_and_msg[i] = 0x0;
	}
}
var checksum = crc.crc32(padding_and_msg).toString(16);
var separator = String.fromCharCode(30);

var pdu = seq.toString() + separator;
pdu += ack.toString() + separator;
pdu += data_offset + separator;
pdu += window_size.toString() + separator;
pdu += checksum + separator;
pdu += time + separator
pdu += bytes_from_data + separator;
pdu += msg;

fs.writeFileSync('../message_master.txt', pdu);
