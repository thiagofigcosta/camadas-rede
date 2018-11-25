var tools = require('../modules_js/modules.js');

do{
	data = tools.read_file('transporte+fisica.txt');
	array_data = data.split('=');
}while(array_data[1] == 'write_client');



// escreve o primeiro ack no arquivo
tools.write_file('transporte+fisica.txt',data);

do{
	data = tools.read_file('transporte+fisica.txt');
	array_data = data.split('=');
}while(array_data[1] == 'write');