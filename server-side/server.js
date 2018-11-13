function exibePDU(pdu, protocolo){
    console.log('\n\tImprimindo PDU');
    console.log('Porta origem: '+pdu[0]);
    console.log('Porta destino: '+pdu[1]);
    if(protocolo == 'udp')
        console.log('Tamanho: '+pdu[2]);
    else{
        console.log('Seq: '+pdu[2]);
        console.log('ACK: '+pdu[3]);
        console.log('Window: '+pdu[4]);
    }
    console.log('--------------------------------------\n');
}

function exibeMensagem(pdu){
	console.log('\n\tImprimindo Mensagem');
    console.log('Tempo: '+pdu[5]);
    console.log('Mensagem: '+pdu[6]);
    
    console.log('--------------------------------------\n');	
}

var seq=0;
var ack;
var window = 1000000000;
var port = 7878
var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Servidor: Eco do servidor\r\n');
	socket.pipe(socket);
});

server.listen(port, '127.0.0.1');


var net = require('net');

var client = new net.Socket();
client.connect(port, '127.0.0.1', function() {
	console.log('Cliente conectado');
	client.write('Cliente: Olá, servidor! Sou o Cliente.');
});

client.on('data', function(data) {
	console.log('Conteúdo recebido: [' + data + ']');
	var time = new Date().toLocaleString(); // 11/16/2015, 11:18:48 PM
	var pdu = [port, process.pid, seq, ack, window, time, data]; 
	exibePDU(pdu,'tcp');
	exibeMensagem(pdu);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Conexão terminada');
});	