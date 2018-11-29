var tools = require('../modules_js/modules.js');

var source_port = '7878';
var destination_port = '7978';
var seq = 1;
var ack = 0;

// primeiro ack - indexa a PDU da camada de transporte
var data = tools.create_pdu('3_WAY_HANDSHAKE',seq,ack,source_port,destination_port);
var array_data = data.split(tools.atributes_separator);
// atualiza o ack
ack = array_data[3];

data += '=TRANSPORT_DONE|PHYSICAL_DIDNT';

// escreve o primeiro ack no arquivo 
tools.write_file('transporte+fisica.txt',data);

do{	
	/* espera o segundo ack do servidor */
	data = tools.read_file('transporte+fisica.txt');
	array_data = data.split('=');
}while( array_data[1] == 'TRANSPORT_DONE|PHYSICAL_DIDNT' );

/* temos que fragmentar o conteudo para atualizar o ack e o seq*/
var fragmented_data = array_data[0].split(tools.atributes_separator);
/* atualizamos o SEQ */
fragmented_data[2] += 1;
/* atualizamos o ACK */
fragmented_data[3] += fragmented_data[0].length;

/* desfragmentamos para enviar */ 
array_data[0] = fragmented_data.join(tools.atributes_separator);

data = array_data[0] + '=TRANSPORT_DONE|PHYSICAL_DIDNT';

// escreve o terceiro ack no arquivo 
tools.write_file('transporte+fisica.txt',data);

