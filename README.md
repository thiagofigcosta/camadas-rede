# Mickey Mouse Protocol

>- **Camada Fisica:** https://github.com/pedrohenriquecordeiro/camadafisica
>- **Camada Rede:** https://github.com/thiagofigcosta/camadarede
>- **Camada Transporte:** https://github.com/Bernard2254/camadatransporte
>- **Camada Aplicação:** https://github.com/thiagofigcosta/camadaaplicacao

>- **Todas as camadas:** https://github.com/thiagofigcosta/tcpip_layers

>- **Maquina virtual configurada para executar todas as camadas:** https://drive.google.com/file/d/1c9fUdUE6_LxIfJ-yEhVWyaKXFnRBOi7T/view?usp=sharing

Implementacao da Camada de Transporte  do Trabalho Prático de Redes 1 - CEFET-MG

  - Integrantes do grupo:
    + Bernard Menezes Moreira da Costa bernard.menezes98@gmail.com
    + Pedro Henrique Cordeiro de Jesus pedro.henrique.cefetmg@gmail.com
    + Thiago Figueiredo Costa thiagofigcosta@hotmail.com
    + Marcos Tiago Ferreira Henriques marcostiagofh@gmail.com

O Enunciado está neste __[link.](https://docs.google.com/document/d/1O3cNM0T6gFNz9PeMYcnzbmBzEe8J7k34DaefJDSsv4A/edit)__

___

---

***

## Relação de Linguagens Escolhidas 

| Camada        | Linguagem   |
| ------------- | ----------- |
| aplicação     | python      |
| transporte    | javascript  |
| rede          | swift       |
| fisica        | perl        |

___


## PDUs #

### Aplicação #

>- **message_in.pdu**: Mensagem que a camada de aplicação recebe da camada de transporte. ***Formato***: Host: **resolutionX**+30\*+**resolutionY**+30\*+**mouseX**+30\*+**mouseY** Client: **screenBase64**

>- **message_out.pdu**: Mensagem que a camada de aplicação envia para a camada de transporte. ***Formato***: Host: **screenBase64** Client: **resolutionX**+30\*+**resolutionY**+30\*+**mouseX**+30\*+**mouseY**

### Transporte #

>- **datagram_in.pdu**: Mensagem que a camada de transporte recebe da camada de rede, sem o header de rede.

>- **datagram_out.pdu**: Mensagem que a camada de transporte envia para a camada de rede, com o header de transporte.

### Rede

>- **packet_in.pdu**: Mensagem que a camada de rede recebe da camada fisica, sem o header da camada fisica.

>- **packet_out.pdu**: Mensagem que a camada de rede envia para a camada fisica, com o header de rede.


### Fisica

>- **bit_out.pdu**: Mensagem que a camada fisica envia para a camada de rede, com o header da camada fisica.

## Zaps #

Zaps são informações trocadas entre as camadas que não são referentes à nenhuma PDU, contem informações importantes para o encaminhamento das PDUs.

>- **application_ips.zap**: Contem os ips e as portas de origem e destino da mensagem, é enviada da camada de aplicação para a camada de transporte. ***Formato***: **sourceIp**:**sourcePort**-**destinationIp**:**destinationPort**

>- **transport_ips.zap**: Contem os ips de origem e destino do datagrama, é enviada da camada de transporte para a camada de rede. ***Formato***: **sourceIp**-**destinationIp**

>- **routed_ip.zap**: Contem o ip intermediario para a transmissão do pacote, é enviada da camada de rede para a camada fisica. ***Formato***: **routedIp**

## Execução

>- Definir quais dispositivos irão se conectar à rede, o limite é de 11 dispositivos podendo ser expandido até o limite de conexões aceitas em sockets perl + 1. 
>- Um dos despositivos deve ser escolhido como servidor na camada fisica e os outros deverão ser clientes. 
>- Caso o computador esteja conectado no wifi, definir a variável isWifi como 1 na camada fisica (se for maquina virtual considerar o computador sempre como conexão cabeada). 
>- Executar a camada fisica como servidor, digitar o numero de dispositivos que irão se conectar nele
>- Abrir a camada fisica nesses dispositivos como cliente.
>- Executar a camada de rede e configurar a tabela de roteamento, lembrar de colocar o default gateway (0.0.0.0). Caso seja necessário use o comando `ip -c a` para consultar ips.
>- Execute a camada de transporte.
>- Execute a camada de aplicação e escolha entre controlar e ser controlado.
>- Aproveite o protocoloco mickey mouse :)
    
### Computador
```
    sudo perl physical.pl                   # camada fisica caso seja servidor
    perl physical.pl                        # camada fisica caso seja cliente
    swiftc swiftepc.swift -o swiftepc
    ./swiftepc network.swift -o network
    ./network                               # camada de rede
    nodejs transport_layer.js               # camada de transporte
    python MickeyMouseProtocol.py           # camada de aplicação
```

### Roteador
```
    sudo perl physical.pl                   # camada fisica caso seja servidor
    perl physical.pl                        # camada fisica caso seja cliente
    swiftc swiftepc.swift -o swiftepc
    ./swiftepc network.swift -o network
    ./network                               # camada de rede
```

## Uso do Código

### Camada Física
Instale a linguagem `perl`

Instale os pacotes necessários, através dos comandos:

    cpan
    install IO::Socket::INET
    install Time::HiRes
    install Net::Address::IP::Local
    install Try::Tiny


Para executar basta rodar os comandos:
```
    sudo perl physical.pl   # executar como servidor
    perl physical.pl        # executar como cliente
```


### Camada de Rede

Instale a linguagem `swift` (versão 4.2) e os pacotes necessários, através dos comandos:

```
sudo apt-get install build-essential clang libicu-dev


```
**Ubuntu 18.04**:
```
   wget -O .swift.tar.gz https://swift.org/builds/swift-4.2.1-release/ubuntu1804/swift-4.2.1-RELEASE/swift-4.2.1-RELEASE-ubuntu18.04.tar.gz
```
**Ubuntu 16.04**:
```
    wget -O .swift.tar.gz https://swift.org/builds/swift-4.2.1-release/ubuntu1604/swift-4.2.1-RELEASE/swift-4.2.1-RELEASE-ubuntu16.04.tar.gz
```
**Ubuntu 14.04**:
```
    wget -O .swift.tar.gz https://swift.org/builds/swift-4.2.1-release/ubuntu1404/swift-4.2.1-RELEASE/swift-4.2.1-RELEASE-ubuntu14.04.tar.gz
```

```
    mkdir ~/.swift
    tar xzf .swift.tar.gz -C ~/.swift --strip-components=1
    export PATH=~/.swift/usr/bin:"${PATH}"
    vi ~/.bashrc                                              # add 'export PATH=~/.swift/usr/bin:"${PATH}"' to end
    swift                                                     # test
```

#### Caso haja algum problema de instalação no ubuntu tente
```
    echo "deb http://security.ubuntu.com/ubuntu xenial-security main" | sudo tee -- append /etc/apt/sources.list
    sudo apt-get update
    sudo apt-get install libicu55
```

Para executar basta rodar os comandos:
```
    swiftc swiftepc.swift -o swiftepc
    ./swiftepc network.swift -o network
    ./network
```


### Camada de transporte

Instale o interpretador `javascript`, através dos comandos:

    sudo apt-get install nodejs
    sudo apt-get install npm


Para executar basta rodar o comando:

```
    node transport_layer.js
```

### Camada de aplicação
Instale a linguagem `python` (versão 2.7) e os pacotes necessários, através dos comandos:

    sudo apt-get install python
    sudo apt-get install python-pip
    sudo apt-get install python-tk
    sudo apt-get install python-xlib
    sudo apt-get install scrot
    pip install -r requirements.txt

Para executar basta rodar o comando:
```
    python MickeyMouseProtocol.py
