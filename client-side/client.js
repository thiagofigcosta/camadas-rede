var tools = require('../modules_js/modules.js');

var source_port = '7878';
var destination_port = '7879';
var seq = 0;
var ack = 0;

// primeiro ack
var data = tools.create_pdu('MSG',seq,ack,source_port,destination_port);
var array_data = data.split(String.fromCharCode(30));
// atualiza o ack
ack = array_data[3];

data += '=TRANSPORT_CLIENT_WROTE|PHYSICAL_DIDNT_READ';

// escreve o primeiro ack no arquivo 
tools.write_file('transporte+fisica.txt',data);

do{
	data = tools.read_file('transporte+fisica.txt');
	array_data = data.split('=');
}while( (array_data[1] == 'TRANSPORT_CLIENT_WROTE|PHYSICAL_DIDNT_READ') 
			|| (array_data[1] == 'TRANSPORT_CLIENT_WROTE|PHYSICAL_READ') );

// podemos agora 