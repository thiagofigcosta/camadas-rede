#!/usr/bin/perl

######### includes
use 5.010;
use strict;
use threads;
use warnings;
use IO::Socket::INET;
use Time::HiRes ('sleep');
use Net::Address::IP::Local; # eh necessario instalar esse modulo a partir do cpan



######### declara variaveis
my $port='7878';
my ($socket,$clientsocket,$serverdata,$clientdata);
my ($mensagem_do_cliente,$mensagem_do_cliente_bin);

my $first_file = "message_master.txt";
my $file_master = "message_master.txt";
my $file_slave = "message_slave.txt";

my $separator = chr(30);
my $f_receive;
my $tryopenfile;
my $freceive_bin;
my $freceive;
my $freceive_data;
my $data_fsend;
my $f_send;
my $fsend_data;
my $fsend_data_bin;

######### cria o socket, com possibilidade de apenas um cliente conectado (Reuse eh 1 pois o socket pode ser reutilizavel)
my $address = eval{Net::Address::IP::Local->public_ipv4}; #descobre o ip da maquina servidor
print "Starting server [ip:".$address." port:".$port."]...\n";
$socket = new IO::Socket::INET ( 
	LocalHost => $address,
	LocalPort => $port,
	Proto     => 'tcp',
	Listen    => 1,
	Reuse     => 1              
)or die "Erro: $! \n";
$clientsocket = $socket->accept() or die "Erro no inicio de conexao com o cliente"; # aceita ou nao a conexao com um cliente

##########  cria PDU
# preambulo da pdu = 7 bytes
my $preambulo = '10101010101010101010101010101010101010101010101010101010';
my $preambulo_bin = sprintf unpack("b*",$preambulo);

# início do delimitador de Quadro = 1 byte
my $start_frame = '10101011';
my $start_frame_bin = sprintf unpack("b*",$start_frame);

# mac do destino =  6 bytes
my $mac = `arp -a $address`;
if($mac =~ m/(\w\w-\w\w-\w\w-\w\w-\w\w-\w\w) | (\w\w:\w\w:\w\w:\w\w:\w\w:\w\w) /){
	$mac = $1;
}
my $mac_bin = sprintf unpack("b*",$mac);

# mac do remetente = 6 bytes
my $cmac = `getmac`;
if($cmac =~ m/(\w\w-\w\w-\w\w-\w\w-\w\w-\w\w) | (\w\w:\w\w:\w\w:\w\w:\w\w:\w\w) /){
	$cmac = $1;
}
my $cmac_bin = sprintf unpack("b*",$cmac );

# dado a ser enviado tera 46 bytes
# tamanho do quadro
# 7 + 1 + 6 + 6 + 46 = 66 bytes
my $length = '00000000‭01000010';
my $length_bin = sprintf unpack("b*",$length );

my $pre_pdu = $preambulo_bin.$start_frame_bin.$mac_bin.$cmac_bin.$length_bin;

######### loop
print "Running...\n";
while(1){
	######### espera uma mensagem do controller (posicao do mouse)
	$freceive_bin = <$socket>;
	if(defined $freceive_bin){
		$freceive = sprintf pack("b*",$freceive_bin); # converte para string
		$freceive_data = substr $freceive , 117; # extrai da mensagem o conteudo efetivo
		open($f_receive, '>', $file_master) or die "Não foi possível abrir o arquivo '$file_master' $!";
		print $f_receive $freceive_data;
		close $f_receive;
	}

	######### le mensagem da camada de cima (tela)
	$tryopenfile=1;
	while($tryopenfile){
		try {
			open($f_send, '<:encoding(UTF-8)', $file_slave) or die "Nao foi possivel abrir o arquivo '$file_slave' $!";
			$fsend_data = <$f_send>;
			close $f_send;
			$tryopenfile=0;
			unlink $file_slave; #deleta o arquivo
		} catch {
		};
	}	
	$fsend_data_bin = sprintf unpack("b*",$fsend_data); # converte a mensagem para binario
	$fsend_data_bin = $pre_pdu.$fsend_data_bin; # concatena o os campos da pdu
	my $thread_1 = threads->create(\&send_message,$clientsocket,$fsend_data_bin) or die "Erro no envio"; #envia o quadro
	$thread_1->join();
}
$socket->close();
print "Bye!\n";




###### Funcao para enviar mensagem
sub send_message{
	# pegar parametros passados
	my @s = @_ ;
	my $sk = $s[0];
	my $data = $s[1];
	
	my ($colisao,$time); 
	$colisao = int(rand(10)); # colisao se o numero for >= 4
	while($colisao le 4){ #ocorreu colisao
		$time = int(rand(10)/10);
		sleep($time); # espera um tempo aleatorio
		$colisao = int(rand(10)); #calcula se vai ocorrer outra colisao
	}	
	print $sk "$data\n"; #envia os dados
	threads->exit();
}
