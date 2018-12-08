# Implementação das camadas de rede do modelo TCP 

>- **Camada Fisica:** https://github.com/pedrohenriquecordeiro/camadafisica
>- **Camada Rede:** https://github.com/thiagofigcosta/camadarede
>- **Camada Transporte:** https://github.com/Bernard2254/camadatransporte
>- **Camada Aplicação:** https://github.com/thiagofigcosta/camadaaplicacao

>- **Todas as camadas:** https://github.com/thiagofigcosta/tcpip_layers

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

>- **device_socket.zap**: Contem o ip e a porta do dispositivo para que a camada fisica abra o socket, no caso dos computadores é enviada da camada de aplicação para a camada fisica no caso dos roteadores é escrito manualmente. ***Formato***: **sourceIp**:**sourcePort**

>- **application_ips.zap**: Contem os ips e as portas de origem e destino da mensagem, é enviada da camada de aplicação para a camada de transporte. ***Formato***: **sourceIp**:**sourcePort**-**destinationIp**:**destinationPort**

>- **transport_ips.zap**: Contem os ips de origem e destino do datagrama, é enviada da camada de transporte para a camada de rede. ***Formato***: **sourceIp**-**destinationIp**

>- **routed_ip.zap**: Contem o ip intermediario para a transmissão do pacote, é enviada da camada de rede para a camada fisica. ***Formato***: **routedIp**

## Execução
    
### Computador
```
    WIP
```

### Roteador
```
    WIP
```

## Uso do Código

### Camada Física
Instale a linguagem `perl`

Instale os pacotes necessários, através dos comandos:

    cpan
    install IO::Socket::INET
    install Time::HiRes
    install Net::Address::IP::Local


Na máquina que será o servidor, rode o script "server.pl"

```
perl server.pl
```

Na máquina que será o cliente, rode o script "client.pl"

```
perl client.pl
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
node server.js
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
