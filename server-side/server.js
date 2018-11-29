var tools = require('../modules_js/modules.js');

/*  espera o primeiro ACK */
do{
	data = tools.read_file('transporte+fisica.txt');
	array_data = data.split(constants.control_separator);
}while((array_data[1] == 'TRANSPORT_DIDNT|PHYSICAL_DIDNT') 
		|| (array_data[1] == 'TRANSPORT_DONE|PHYSICAL_DIDNT')  );


/* temos que fragmentar o conteudo para atualizar o ack e o seq*/
var fragmented_data = array_data[0].split(':');
/* atualizamos o ACK e o SEQ */
fragmented_data[2] = fragmented_data[2] + 1;
fragmented_data[3] = fragmented_data[3] + fragmented_data[0].length;
array_data[0] = fragmented_data.join(constants.atribute_separator);
data = array_data[0] + '=TRANSPORT_DONE|PHYSICAL_DIDNT';

// escreve segundo ACK no arquivo
tools.write_file('transporte+fisica.txt',data);

do{
	/* espera o terceiro ACK */
	data = tools.read_file('transporte+fisica.txt');
	array_data = data.split(constants.control_separator);
}while(array_data[1] == '=TRANSPORT_DONE|PHYSICAL_DIDNT');