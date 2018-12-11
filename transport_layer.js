var maximumSegmentSize=536;

var ConvertBase = function (num) {
    return {
        from : function (baseFrom) {
            return {
                to : function (baseTo) {
                    return parseInt(num, baseFrom).toString(baseTo);
                }
            };
        }
    };
};

var bin2dec = function (num) {
    return ConvertBase(num).from(2).to(10);
};

var dec2bin = function (num) {
	if (num==="")
		return "";
    return ConvertBase(num).from(10).to(2);
};

function readBinFile(file) {
    return readStrFile(file);
}

function writeBinFile(file, base64str) {
	console.log(base64str);
    writeStrFile(file, base64str);
}

function readStrFile(fileName) {
	var fs = require("fs");
	var text = fs.readFileSync(fileName);
	return text.toString();
}

function writeStrFile(fileName, string){
	var fs = require('fs');
	while (fs.existsSync(fileName)) {

	}
	fs.writeFile(fileName, string);
	// var wstream = fs.createWriteStream(fileName, 'base64');
	// wstream.write(string);
}

function removeFile(fileName){
	var fs = require("fs");
	fs.unlinkSync(fileName)
}

function sizeGarantee(binary, size){
	var bin = ""+binary;
	for(i=0; i<size;i++){
		if(bin.length==size)
			break;
		bin="0"+bin;
	}
	return bin;
}

function concatDatagram(datagram){

	var allConcat = sizeGarantee(dec2bin(datagram.sourcePort), 16);
	allConcat+=sizeGarantee(dec2bin(datagram.destinationPort), 16);
	allConcat+=sizeGarantee(dec2bin(datagram.sequenceNumber), 32);
	allConcat+=sizeGarantee(dec2bin(datagram.ackNumber), 32);
	allConcat+=sizeGarantee(dec2bin(datagram.dataOffset), 4);
	allConcat+=sizeGarantee(dec2bin(datagram.reserved), 6);
	allConcat+=sizeGarantee(dec2bin(datagram.urgFlag), 1);
	allConcat+=sizeGarantee(dec2bin(datagram.ackFlag), 1);
	allConcat+=sizeGarantee(dec2bin(datagram.pshFlag), 1);
	allConcat+=sizeGarantee(dec2bin(datagram.rstFlag), 1);
	allConcat+=sizeGarantee(dec2bin(datagram.synFlag), 1);
	allConcat+=sizeGarantee(dec2bin(datagram.finFlag), 1);
	allConcat+=sizeGarantee(dec2bin(datagram.microsoftWindow), 16);
	allConcat+=sizeGarantee(dec2bin(datagram.checkSum), 16);
	allConcat+=sizeGarantee(dec2bin(datagram.urgentPointer), 16);
	allConcat+=dec2bin(datagram.badOptions);
	allConcat+=sizeGarantee(dec2bin(datagram.padding), paddingLenght(datagram));
	allConcat+=datagram.dataDeAniversario;

	return allConcat

}

function shiftDatagram(datagram){
	var allConcat = String.fromCharCode(datagram.sourcePort>>8);
	allConcat += String.fromCharCode(datagram.sourcePort&0b11111111);
	allConcat += String.fromCharCode(datagram.destinationPort>>8);
	allConcat += String.fromCharCode(datagram.destinationPort&0b11111111);
	allConcat += String.fromCharCode((datagram.sequenceNumber>>24)&0b11111111);
	allConcat += String.fromCharCode((datagram.sequenceNumber>>16)&0b11111111);
	allConcat += String.fromCharCode((datagram.sequenceNumber>>8)&0b11111111);
	allConcat += String.fromCharCode((datagram.sequenceNumber)&0b11111111);
	allConcat += String.fromCharCode((datagram.ackNumber>>24)&0b11111111);
	allConcat += String.fromCharCode((datagram.ackNumber>>16)&0b11111111);
	allConcat += String.fromCharCode((datagram.ackNumber>>8)&0b11111111);
	allConcat += String.fromCharCode((datagram.ackNumber)&0b11111111);
	allConcat += String.fromCharCode((datagram.dataOffset<<4)|((datagram.reserved>>2)&0b1111));
	allConcat += String.fromCharCode(((datagram.reserved&0b11)<<6)|(((datagram.urgFlag>>2)&0b1)<<5)|(((datagram.ackFlag>>2)&0b1)<<4)|(((datagram.pshFlag>>2)&0b1)<<3)|(((datagram.rstFlag>>2)&0b1)<<2)|(((datagram.synFlag>>2)&0b1)<<1)|(((datagram.finFlag>>2)&0b1)));
	allConcat += String.fromCharCode(datagram.microsoftWindow>>8);
	allConcat += String.fromCharCode(datagram.microsoftWindow&0b11111111);
	allConcat += String.fromCharCode(datagram.checkSum>>8);
	allConcat += String.fromCharCode(datagram.checkSum&0b11111111);
	allConcat += String.fromCharCode(datagram.urgentPointer>>8);
	allConcat += String.fromCharCode(datagram.urgentPointer&0b11111111);
	allConcat += String.fromCharCode(datagram.badOptions>>2);
	allConcat += String.fromCharCode(((datagram.badOptions&0b11)<<6)|0);
	allConcat+=datagram.dataDeAniversario;
	return allConcat

}

function writeDatagramBin(fileName, datagram){
	var concat = shiftDatagram(datagram);
	console.log(concat);
	writeBinFile(fileName, concat);
}

function stringBin2dec(string){
	var sum=0;
	for(i=string.length-1; i>=0; i--){
		if(string.charAt(i)==1){
			sum+=Math.pow(2, string.length-1-i);
		}
	}
	return sum;
}

function notOperator(string){
	var not = "";
	for(i=0; i<string.length; i++){
		if(string.charAt(i)==1){
			not=not+0;
		} else {
			not=not+1;
		}
	}
	return not;

}

function objectPropInArray(list, prop, val, prop2, val2) {
  if (list.length > 0 ) {
    for (i in list) {
      if (list[i][prop] === val && list[i][prop2] === val2) {
        return list[i];
      }
    }
  }
  return undefined;
}

function setPropInArray(list, prop, val, prop2, val2, setProp, valSetProp) {
  if (list.length > 0 ) {
    for (i in list) {
      if (list[i][prop] === val && list[i][prop2] === val2) {
      	list[i][setProp] = valSetProp;
      }
    }
  }
}

function setDataInArray(list, prop, val, prop2, val2, prop3, valSetProp) {
  if (list.length > 0 ) {
    for (i in list) {
      if (list[i][prop] === val && list[i][prop2] === val2) {
      	list[i][prop3].push(valSetProp);
      	console.log(valSetProp);
      }
    }
  }
}

function removeObjInArray(list, prop, val, prop2, val2, prop3, index) {
  if (list.length > 0 ) {
    for (i in list) {
      if (list[i][prop] === val && list[i][prop2] === val2) {
      	list[i][prop3].splice(index, 1);
      }
    }
  }
}

function generateCheksum(datagram){
	var allConcat = sizeGarantee(dec2bin(datagram.sourcePort), 16);
	allConcat+=sizeGarantee(dec2bin(datagram.destinationPort), 16);
	allConcat+=sizeGarantee(dec2bin(datagram.sequenceNumber), 32);
	allConcat+=sizeGarantee(dec2bin(datagram.ackNumber), 32);
	allConcat+=sizeGarantee(dec2bin(datagram.dataOffset), 4);
	allConcat+=sizeGarantee(dec2bin(datagram.reserved), 6);
	allConcat+=sizeGarantee(dec2bin(datagram.urgFlag), 1);
	allConcat+=sizeGarantee(dec2bin(datagram.ackFlag), 1);
	allConcat+=sizeGarantee(dec2bin(datagram.pshFlag), 1);
	allConcat+=sizeGarantee(dec2bin(datagram.rstFlag), 1);
	allConcat+=sizeGarantee(dec2bin(datagram.synFlag), 1);
	allConcat+=sizeGarantee(dec2bin(datagram.finFlag), 1);
	allConcat+=sizeGarantee(dec2bin(datagram.microsoftWindow), 16);
	allConcat+=sizeGarantee(dec2bin(datagram.urgentPointer), 16);
	allConcat+=dec2bin(datagram.badOptions);
	allConcat+=sizeGarantee(dec2bin(datagram.padding), paddingLenght(datagram));
	allConcat+=datagram.dataDeAniversario;

	var value=0;

	for(y=0; y<allConcat.length/16;y++){
		var tmp = allConcat.substring(y*16, ((y+1)*16));
		if(tmp.length!=16){
			sizeGarantee(tmp, 16);
		}
		value += stringBin2dec(tmp);
	}

	value = sizeGarantee(dec2bin(value%Math.pow(2, 16)), 16);

	return stringBin2dec(notOperator(value));

}

function paddingLenght(datagram){
	return 32-(dec2bin(datagram.badOptions).length)%32;
}

function generateDataOffset(datagram){
	return (160+dec2bin(datagram.badOptions).length+paddingLenght(datagram))/32;
}

var Datagram = class {
	constructor(ipZap, sendToNetworkLayer, sourcePort, destinationPort, sequenceNumber, ackNumber,
		reserved, urgFlag, ackFlag, pshFlag, rstFlag, synFlag, finFlag,
		urgentPointer, dataDeAniversario) {

		this.sourcePort = sourcePort														 						// 16 bits
		this.destinationPort = destinationPort																		// 16 bits
		this.sequenceNumber = sequenceNumber;																		// 32 bits
		this.ackNumber = ackNumber;																					// 32 bits
		this.reserved = reserved;																					//  6 bits
		this.urgFlag = urgFlag;																						//  1 bit
		this.ackFlag = ackFlag;																						//  1 bit
		this.pshFlag = pshFlag;																						//  1 bit
		this.rstFlag = rstFlag;																						//  1 bit
		this.synFlag = synFlag;																						//  1 bit
		this.finFlag = finFlag;																						//  1 bit
		this.microsoftWindow = 0b100;																				// 16 bits tamnho da janela fixo 4
		this.urgentPointer = urgentPointer;																			// 16 bits
		this.badOptions = maximumSegmentSize;																		// 10 bits maximum segment size (MSS) 
		this.dataDeAniversario = dataDeAniversario;																	// 16 bits
		this.padding = 0;																							// variable bit
		this.dataOffset = generateDataOffset(this);																	//  4 bits Número de 32 bits antes do conteúdo de data
		this.checkSum = generateCheksum(this);																		// 16 bits
		this.ipZap = undefined;
		if(sendToNetworkLayer){
			writeDatagramBin("datagram_out.pdu", this);
		}
		if(ipZap!=undefined){
			this.ipZap=ipZap;
			writeStrFile("transport_ips.zap", ipZap.split(":")[0]+"-"+ipZap.split("-")[1].split(":")[0]);
		}
	}

};

function getNextAck(){

}

var arrayOfConections = [];

function forward(){
	var fs = require('fs');
		console.log(fs.existsSync("message_out.pdu"));
		if (fs.existsSync("message_out.pdu") && fs.existsSync("application_ips.zap")) {
		    var applicationZap = readStrFile("application_ips.zap");
		    removeFile("application_ips.zap");
		    var dataDeAniversario = readStrFile("message_out.pdu");
		    removeFile("message_out.pdu");
			var sourceInfo = applicationZap.split("-")[0];
			var destinationInfo = applicationZap.split("-")[1];
			var sourcePort = sourceInfo.substring(sourceInfo.indexOf(":")+1, sourceInfo.length) 						
			var destinationPort = destinationInfo.substring(destinationInfo.indexOf(":")+1, destinationInfo.length)
			var datagramaSend;
			var startConection = true;

			if(arrayOfConections.length!=0 && objectPropInArray(arrayOfConections,'source', sourcePort, 'destination', destinationPort)!=undefined){
				startConection=false;
			}

			if(startConection){
				datagramaSend = new Datagram(applicationZap, true,
					sourcePort,
					destinationPort,
					0, // primeiro sequence number. Geralmente é randômico, para facilitar será 0
					0, // ackNumber não será utilizado nesse caso
					0, // reserved sempre nulo
					0, // urgent pointer não usado
					0, // não é um ACK
					0, // não indica o final de uma segmentação da data
					0, // não reseta conexão
					1, // tenta sincronizar
					0, // não indica que acabou a conexão
					0, // urgent pointer não usado
					"" // sem data
				);
				arrayOfConections.push({'fragmentation': [], 'source': sourcePort, 'destination': destinationPort, 'expectedAck': 1, 'windowAck': [2, 3, 4], 'handshakeSituation': "IN_PROGRESS", 'conectionMMS': maximumSegmentSize, 'data':[{'conteudo': datagramaSend, 'status': 'naoconfirmado'}]});
				

			} else {

				var buffer = objectPropInArray(arrayOfConections,'source', sourcePort, 'destination', destinationPort);
				var status = 'naoconfirmado'
				switch (buffer.handshakeSituation){
					case "IN_PROGRESS":

						status = 'pendente'

					case "DONE":
						var sendData = dataDeAniversario;
						var index;
						if(buffer.data.length>0){
							buffer.data.forEach(function (value, i) {
								if(value.status=='pendente' && index==undefined){
									datagramaSend=value.conteudo;
									index=i;
								}
							});
							if(sendData==dataDeAniversario){
								buffer.data.forEach(function (value, i) {
									if(value.status=='naoconfirmado' && index==undefined){
										datagramaSend=value.conteudo
										index=i;
									}
								});
							}
							removeObjInArray(arrayOfConections,'source', sourcePort, 'destination', destinationPort, 'data', index);
						}

						if(buffer.windowAck[0] >= buffer.expectedAck+4){
							console.log("Esperando confirmação ack: "+buffer.expectedAck);
							datagramaSend = new Datagram(datagramaSend.ipZap, true,
								datagramaSend.sourcePort, 
								datagramaSend.destinationPort, 
								datagramaSend.sequenceNumber, // sequence number
								datagramaSend.expectedAck, // ackNumber não será utilizado nesse caso
								datagramaSend.reserved, // reserved sempre nulo
								datagramaSend.urgFlag, // urgent pointer não usado
								datagramaSend.ackFlag, // não é um ACK
								datagramaSend.pshFlag, // indica o final de uma segmentação da data
								datagramaSend.rstFlag, // não reseta conexão
								datagramaSend.synFlag, // tenta sincronizar
								datagramaSend.finFlag, // não indica que acabou conexão
								datagramaSend.urgentPointer, // urgent pointer não usado
								datagramaSend.dataDeAniversario
							);
							setDataInArray(arrayOfConections,'source', sourcePort, 'destination', destinationPort, 'data', {'conteudo': datagramaSend, 'status': 'naoconfirmado'});
						} else {

							var sequenceNumber = buffer.windowAck[0];
							setPropInArray(arrayOfConections,'source', sourcePort, 'destination', destinationPort, 'windowAck', buffer.windowAck.map((a, i) => a + [1,1,1][i]));	

							if(sendData.length<=maximumSegmentSize){
								
								datagramaSend = new Datagram(applicationZap, status=='naoconfirmado',
											sourcePort, 
											destinationPort, 
											sequenceNumber, // sequence number
											0, // ackNumber não será utilizado nesse caso
											0, // reserved sempre nulo
											0, // urgent pointer não usado
											0, // não é um ACK
											1, // indica o final de uma segmentação da data
											0, // não reseta conexão
											0, // tenta sincronizar
											0, // não indica que acabou conexão
											0, // urgent pointer não usado
											sendData
										);
								
								setDataInArray(arrayOfConections,'source', sourcePort, 'destination', destinationPort, 'data', {'conteudo': datagramaSend, 'status': status});
							} else {
								for(i=0; i<sendData.length/maximumSegmentSize; i++){
									sequenceNumber = buffer.windowAck[0];
									var sendToNetworkLayer = true;
									var sequencesNumbers = [];
									if(sequenceNumber >= buffer.expectedAck+4){
										sendToNetworkLayer = false;
										status='pendente';
									}

									if(i+1==sendData.length/maximumSegmentSize){
										datagramaSend = new Datagram(applicationZap, sendToNetworkLayer,
											sourcePort, 
											destinationPort, 
											sequenceNumber, // sequence number
											0, // ackNumber não será utilizado nesse caso
											0, // reserved sempre nulo
											0, // urgent pointer não usado
											0, // não é um ACK
											1, // indica o final de uma segmentação da data
											0, // não reseta conexão
											0, // tenta sincronizar
											0, // não indica que acabou conexão
											0, // urgent pointer não usado
											sendData.substring(i*maximumSegmentSize)
										);
									} else {
										datagramaSend = new Datagram(applicationZap, sendToNetworkLayer,
											sourcePort, 
											destinationPort, 
											sequenceNumber, // sequence number
											0, // ackNumber não será utilizado nesse caso
											0, // reserved sempre nulo
											0, // urgent pointer não usado
											0, // não é um ACK
											0, // indica o final de uma segmentação da data
											0, // não reseta conexão
											0, // tenta sincronizar
											0, // não indica que acabou conexão
											0, // urgent pointer não usado
											sendData.substring(i*maximumSegmentSize, (i+1)*maximumSegmentSize)
										);
										sequencesNumbers.push(sequenceNumber);
									}
									setDataInArray(arrayOfConections,'source', sourcePort, 'destination', destinationPort, 'fragmentation', sequencesNumbers);	
									setDataInArray(arrayOfConections,'source', sourcePort, 'destination', destinationPort, 'data', {'conteudo': datagramaSend, 'status': status});
								}
							}

						}

						break;

				}

				if(arrayOfConections[0]!=undefined){
					console.log(arrayOfConections[0]);	
				}

			}

		}
}

function checkCheckSum(allConcat){
	return true;
	var value=0;	

	for(y=0; y<allConcat.length/16;y++){
		var tmp = allConcat.substring(y*16, ((y+1)*16));
		if(tmp.length!=16){
			sizeGarantee(tmp, 16);
		}
		value += stringBin2dec(tmp);
	}

	value = sizeGarantee(dec2bin(value%Math.pow(2, 16)), 16);
	return stringBin2dec(notOperator(value));

}


function receive(){
	var fs = require('fs');
		if (fs.existsSync("datagram_in.pdu")) {
		    var datagrama = readBinFile("datagram_in.pdu");
		    removeFile("datagram_in.pdu");





			var sourcePort=0;
			var destinationPort =0;
			var sequenceNumber =0;
			var ackNumber =0;
			var dataOffset =0;
			var reserved =0;
			var urgFlag = 0;
			var ackFlag = 0;
			var pshFlag =0;
			var rstFlag = 0;
			var synFlag =0;
			var finFlag = 0;
			var microsoftWindow=0;
			var checkSum=0;
			var urgentPointer=0;
			var badOptions=0;
			var data;
		 	for (var i=0; i<datagrama.length; i++){
				var v=datagrama[i].charCodeAt(0);
				if (i==0) {
					sourcePort=(v<<8);
				}else if(i==1){
					sourcePort=sourcePort|v;
				}else if(i==2){
					destinationPort=(v<<8);
				}else if(i==3){
					destinationPort=destinationPort|v;
				}else if(i==4){
					sequenceNumber=(v<<24);
				}else if(i==5){
					sequenceNumber=sequenceNumber|(v<<16);
				}else if(i==6){
					sequenceNumber=sequenceNumber|(v<<8);
				}else if(i==7){
					sequenceNumber=sequenceNumber|v;
				}else if(i==8){
					ackNumber=(v<<24);
				}else if(i==9){
					ackNumber=ackNumber|(v<<16);
				}else if(i==10){
					ackNumber=ackNumber|(v<<8);
				}else if(i==11){
					ackNumber=ackNumber|v;
				}else if(i==12){
					dataOffset=v>>4;
					reserved=(v&0b1111)<<2;
				}else if(i==13){
					reserved=reserved|(v>>6)&0b11;
					urgFlag=(v>>5)&0b1;
					ackFlag=(v>>4)&0b1;
					pshFlag=(v>>3)&0b1;
					rstFlag=(v>>2)&0b1;
					synFlag=(v>>1)&0b1;
					finFlag=(v)&0b1;
				}else if(i==14){
					microsoftWindow=(v<<8);
				}else if(i==15){
					microsoftWindow=microsoftWindow|v;
				}else if(i==16){
					checkSum=(v<<8);
				}else if(i==17){
					checkSum=checkSum|v;
				}else if(i==18){
					urgentPointer=(v<<8);
				}else if(i==19){
					urgentPointer=urgentPointer|v;
				}else if(i==20){
					badOptions=v>>2;
				}else if(i==21){
					badOptions=badOptions|(v>>6);
					data=datagrama.substring(22);
					break;
				}
			}
			sourcePort = sizeGarantee(dec2bin(sourcePort), 16);
			destinationPort = sizeGarantee(dec2bin(destinationPort), 16);
			sequenceNumber = sizeGarantee(dec2bin(sequenceNumber), 32);
			ackNumber = sizeGarantee(dec2bin(ackNumber), 32);
			dataOffset = sizeGarantee(dec2bin(dataOffset), 4);
			reserved = sizeGarantee(dec2bin(reserved), 6);
			urgFlag = sizeGarantee(dec2bin(urgFlag), 1);
			ackFlag = sizeGarantee(dec2bin(ackFlag), 1);
			pshFlag = sizeGarantee(dec2bin(pshFlag), 1);
			rstFlag = sizeGarantee(dec2bin(rstFlag), 1);
			finFlag = sizeGarantee(dec2bin(finFlag), 1);
			synFlag = sizeGarantee(dec2bin(synFlag), 1);
			microsoftWindow = sizeGarantee(dec2bin(microsoftWindow), 16);
			checkSum = sizeGarantee(dec2bin(checkSum), 16);
			urgentPointer = sizeGarantee(dec2bin(urgentPointer), 16);
			badOptions = sizeGarantee(dec2bin(badOptions), 10);

			// var data = datagrama.substring(dataOffset*32);
			console.log("Reading datagram_in.pdu:\n\tSource Port: "+sourcePort+"\n\tDestination Port: "+destinationPort+"\n\tSequence number: "+sequenceNumber+"\n\tAck Number: "+ackNumber+
				"\n\tData Offset: "+dataOffset+"\n\tReserved: "+reserved+"\n\tUrg Flag: "+urgFlag+"\n\tAck Flag: "+ackFlag+"\n\tPsh Flag: "+pshFlag+"\n\tRst Flag: "+rstFlag+
				"\n\tSyn Flag: "+synFlag+"\n\tFin Flag: "+finFlag+"\n\tWindow Size: "+microsoftWindow+"\n\tChecksum: "+checkSum+"\n\tUrgent Pointer: "+urgentPointer+
				"\n\tOptions: "+badOptions+"\n\tData: "+data);

			if(checkCheckSum(sourcePort+destinationPort+sequenceNumber+ackNumber+dataOffset+reserved+urgFlag+ackFlag+pshFlag+rstFlag+synFlag+finFlag+microsoftWindow+checkSum+urgentPointer+badOptions+padding+data)==0){

				var datagramaSend;
				var startConection = true;

				if(arrayOfConections.length!=0 && objectPropInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort))!=undefined){
					startConection=false;
				}

				if(startConection && bin2dec(synFlag)==1){
					datagramaSend = new Datagram(undefined, true,
						bin2dec(destinationPort),
						bin2dec(sourcePort),
						0, // Primeito sequence number
						bin2dec(sequenceNumber)+1, // ackNumber próximo sequence number esperado
						0, // reserved sempre nulo
						0, // urgent pointer não usado
						1, // é um ACK
						0, // não indica o final de uma segmentação da data
						0, // não reseta conexão
						1, // tenta sincronizar
						0, // não indica que acabou a conexão
						0, // urgent pointer não usado
						"" // sem data
					);
					arrayOfConections.push({'fragmentation': [],'source': bin2dec(destinationPort), 'destination': bin2dec(sourcePort), 'data':[{'conteudo': datagramaSend,'status': 'naoconfirmado'}]});

				} else {

					var buffer = objectPropInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort));
					var status = 'naoconfirmado';
					if(buffer.data.length>0){
						buffer.data.forEach(function (value, i) {
							if(info.status=='pendente' && index==undefined){
								datagramaSend=info.conteudo;
								index=i;
							}
						});
						if(sendData==dataDeAniversario){
							buffer.data.forEach(function (value, i) {
								if(info.status=='naoconfirmado' && index==undefined){
									datagramaSend=info.conteudo
									index=i;
								}
							});
						}
						removeObjInArray(arrayOfConections,'source', sourcePort, 'destination', destinationPort, 'data', index);
					}
					if(buffer.windowAck[0] >= buffer.expectedAck+4){
						status = 'pendente';
						console.log("Esperando confirmação ack: "+buffer.expectedAck);
						datagramaSend = new Datagram(datagramaSend.ipZap, true,
							datagramaSend.sourcePort, 
							datagramaSend.destinationPort, 
							datagramaSend.sequenceNumber, // sequence number
							datagramaSend.expectedAck, // ackNumber não será utilizado nesse caso
							datagramaSend.reserved, // reserved sempre nulo
							datagramaSend.urgFlag, // urgent pointer não usado
							datagramaSend.ackFlag, // não é um ACK
							datagramaSend.pshFlag, // indica o final de uma segmentação da data
							datagramaSend.rstFlag, // não reseta conexão
							datagramaSend.synFlag, // tenta sincronizar
							datagramaSend.finFlag, // não indica que acabou conexão
							datagramaSend.urgentPointer, // urgent pointer não usado
							datagramaSend.dataDeAniversario
						);
						setDataInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort), 'data', {'conteudo': datagramaSend, 'status': 'naoconfirmado'});
					}

					switch (buffer.handshakeSituation){
						case "IN_PROGRESS":
							if(bin2dec(ackFlag)==1){
								if(bin2dec(ackNumber)==buffer.expectedAck){
									setPropInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort), 'expectedAck', buffer.windowAck[0]);
								}
								setPropInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort), 'windowAck', buffer.windowAck.map((a, i) => a + [1,1,1][i]));	
								setPropInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort), 'handshakeSituation', 'DONE');	
							}

							if(bin2dec(synFlag)==1){
								datagramaSend = new Datagram(undefined, status=='naoconfirmado',
									bin2dec(destinationPort),
									bin2dec(sourcePort),
									objectPropInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort)).expectedAck, // sequence number
									bin2dec(sequenceNumber)+1, // ackNumber não será utilizado nesse caso
									0, // reserved sempre nulo
									0, // urgent pointer não usado
									1, // é um ACK
									0, // não indica o final de uma segmentação da data
									0, // não reseta conexão
									0, // tenta sincronizar
									0, // não indica que acabou a conexão
									0, // urgent pointer não usado
									"" // sem data
								);
								arrayOfConections.push({'fragmentation': [],'source': bin2dec(destinationPort), 'destination': bin2dec(sourcePort), 'data':[{'conteudo': datagramaSend,'status': status}]});
							}

							break;
						case "DONE":

								if(bin2dec(ackFlag)==1){
									if(bin2dec(ackNumber)==buffer.expectedAck){
										setPropInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort), 'expectedAck', buffer.windowAck[0]);
									}
									setPropInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort), 'windowAck', buffer.windowAck.map((a, i) => a + [1,1,1][i]));	
									setPropInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort), 'handshakeSituation', 'DONE');	
									setPropInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort), 'status', 'confirmado');	
								}

								if(bin2dec(pshFlag)==1){
									if(buffer.expectedAck+1==buffer.windowAck[0]){
										var dataSend = "";
										for(sequence in objectPropInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort)).fragmentation){
											objectPropInArray(arrayOfConections,'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort)).dataforEach(function (value, i) {
												if(value.conteudo.sequenceNumber==sequence){
													dataSend+=value.conteudo.dataDeAniversario;
													removeObjInArray(arrayOfConections, 'source', bin2dec(destinationPort), 'destination', bin2dec(sourcePort), 'data', i)
												}
											});	
										}
										writeBinFile("message_in.pdu", dataSend);
									}

								}
							break;
					}
				}

			}
		}
}


// var datagramaSend = new Datagram("192.168.65.7:30-192.168.65.8:40", true,
// 											'30', 
// 											'40', 
// 											'0', // sequence number
// 											0, // ackNumber não será utilizado nesse caso
// 											0, // reserved sempre nulo
// 											0, // urgent pointer não usado
// 											0, // não é um ACK
// 											0, // indica o final de uma segmentação da data
// 											0, // não reseta conexão
// 											0, // tenta sincronizar
// 											0, // não indica que acabou conexão
// 											0, // urgent pointer não usado
// 											"0101011010101010"
// 										);

//  var datagrama = readBinFile("datagram_out.pdu");
// 		    var sourcePort = bin2dec(datagrama.substring(0,16));
// 			var sourcePort = datagrama.substring(0,16);
// 			var destinationPort = datagrama.substring(16,32);
// 			var sequenceNumber = datagrama.substring(32,64);
// 			var ackNumber = datagrama.substring(64,96);
// 			var dataOffset = datagrama.substring(96,100);
// 			var reserved = datagrama.substring(100,106);
// 			var urgFlag = datagrama.substring(106,107);
// 			var ackFlag = datagrama.substring(107,108);
// 			var pshFlag = datagrama.substring(108,109);
// 			var rstFlag = datagrama.substring(109,110);
// 			var synFlag = datagrama.substring(110,111);
// 			var finFlag = datagrama.substring(111,112);
// 			var microsoftWindow = datagrama.substring(112,128);
// 			var checkSum = datagrama.substring(128,144);
// 			var urgentPointer = datagrama.substring(144,160);
// 			var badOptions = datagrama.substring(160,160+dec2bin(maximumSegmentSize).length);
// 			var padding = datagrama.substring(160+dec2bin(maximumSegmentSize).length, dataOffset*32);
// 			var data = datagrama.substring(dataOffset*32);
// 			console.log("Reading datagram_in.pdu\n\tSource Port: "+sourcePort+"\n\tDestination Port: "+destinationPort+"\n\tSequence number: "+sequenceNumber+"\n\tAck Number: "+ackNumber+
// 				"\n\tData Offset: "+dataOffset+"\n\tReserved: "+reserved+"\n\tUrg Flag: "+urgFlag+"\n\tAck Flag: "+ackFlag+"\n\tPsh Flag: "+pshFlag+"\n\tRst Flag: "+rstFlag+
// 				"\n\tSyn Flag: "+synFlag+"\n\tFin Flag: "+finFlag+"\n\tWindow Size: "+microsoftWindow+"\n\tChecksum: "+checkSum+"\n\tUrgent Pointer: "+urgentPointer+
// 				"\n\tOptions: "+badOptions+"\n\tPadding: "+padding+"\n\tData: "+data);

//  removeFile("transport_ips.zap");
//  removeFile("datagram_out.pdu");

//  console.log(checkCheckSum(sourcePort+destinationPort+sequenceNumber+ackNumber+dataOffset+reserved+urgFlag+ackFlag+pshFlag+rstFlag+synFlag+finFlag+microsoftWindow+checkSum+urgentPointer+badOptions+padding+data));

// convert image to base64 encoded string
// writeBinFile("batata", 'molecula.pdu');
// var base64str = readBinFile('molecula.pdu');
// console.log(base64str);	
while(true){
forward();
}
// convert base64 string back to image 

// writeBinFile("molecula.pdu", "01010101010");
// console.log(readBinFile("molecula.pdu"));

  // writeBinFile("message_out.pdu", "101011101100011111100001111100001010101");

// arrayOfConections.push({'source': 30, 'destination': 40, 'expectedAck': 1, 'data': [{'conteudo': datagramaSend, 'status': 'pendente'}]});
// console.log(arrayOfConections[0].data[0].conteudo.microsoftWindow);
// var buffer = objectPropInArray(arrayOfConections,'source', 30, 'destination', 40);
// var teste = {'conteudo': "01010101", 'status': 'pendente'};
//  setDataInArray(arrayOfConections,'source', 30, 'destination', 40, 'data', {'conteudo': datagramaSend, 'status': 'pendente'})
// console.log(arrayOfConections[0]);
// removeObjInArray(arrayOfConections,'source', 30, 'destination', 40, 'data', 0);
// console.log(arrayOfConections[0]);

// while(true){
// 	forward();
// 	receive();
// }



// console.log(arrayOfConections[0].receivedAck.push(2));
// console.log(objectPropInArray(arrayOfConections,'source', 30, 'destination', 40).receivedAck);

// console.log(readBinFile('datagram_out.pdu'))

// writeBinFile("message_out.pdu", "0101011111111111111111101110");


// var test = "ip1:porta1-ip2:porta2" 192.888.132.5:30-192.888.132.6:40
// var destinationInfo = test.split("-")[0];
// console.log(destinationInfo.substring(destinationInfo.indexOf(":")+1, destinationInfo.length));

// var dataGram = new Datagram(1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)
// console.log(dataGram);