# Implementação das camadas de rede do modelo TCP 

>- **Camada Fisica:** https://github.com/pedrohenriquecordeiro/camadafisica
>- **Camada Rede:** https://github.com/thiagofigcosta/camadarede
>- **Camada Transporte:** https://github.com/Bernard2254/camadatransporte
>- **Camada Aplicação:** https://github.com/thiagofigcosta/camadaaplicacao

>- **Todas as camadas:** https://github.com/thiagofigcosta/camadas-rede

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

>- **message_mouse.pdu**: Mensagem da camada de aplicação que contem a posição do mouse, resolução da tela, ip (de onde vai conectar) e porta (de onde vai conectar), escrito pelo cliente, as informações são separadas por um caractere de controle (char 30)

>- **message_image.pdu**: Mensagem da camada de aplicação que contem a imagem da tela em formato base 64, escrito pelo servidor

### Transporte #

>- **segment_handshake.pdu**: Arquivo que contem os dados das camadas de transporte,rede e fisica junto das flags de sincronismo ( sincronismo entre as camadas que consomem os dados do arquivo ), as informações são separadas por um caractere de controle ( '=' ). Na parte do cabe

>- **segment_mouse.pdu**: 

>- **segment_image.pdu**:

### Rede

>- **datagram_handshake.pdu**:

>- **datagram_mouse.pdu**: 

>- **datagram_image.pdu**:


### Fisica

>- **bit_handshake.pdu**:

>- **bit_mouse.pdu**: 

>- **bit_image.pdu**:



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
