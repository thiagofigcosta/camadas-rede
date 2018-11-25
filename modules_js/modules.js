
/*
    fonte para a criacao da pdu :
    https://www.lifewire.com/tcp-headers-and-udp-headers-explained-817970
*/

module.exports = {
  create_pdu: function (msg , seq , ack , source_port , destination_port ) {
    
    var separator = ':';
	var data_offset = msg.length;
    ack += data_offset;

    // 1 porta de origem
    var pdu = source_port + separator; 
    // 2 porta de destino
    pdu += destination_port + separator;
    // 3 numero de sequencia
    pdu += seq.toString() + separator;
    // 4 numero de confirmacao
    pdu += ack.toString() + separator;
    // 5 deslocamento de dados
    pdu += '111100' + separator;
    // 6 dados reservado para o cabeçalho
    pdu += '10100' + separator;
    // 7 sinalizadores de controle
    pdu += '101010000' + separator;
    // 8 tamanho da janela
    pdu += '1111111111111111' + separator;
    // 9 soma de verificacao : ( tamanho da msg + 11 )
    var sum =  msg.length + 11 ;
    pdu += sum.toString() + separator;
    // 10 ponteiro urgente
    pdu += '0' + separator;
    // 11 dados
    pdu += msg;
    return pdu;
  },


  write_file: function (file,data) {
    var fs = require('fs');
    fs.writeFileSync(file, data);

  },


  read_file: function (file) {
    var fs = require('fs');
    var msg = fs.readFileSync(file, 'utf8');
    return msg;
  }

};