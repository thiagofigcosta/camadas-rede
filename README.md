# Camada de Transporte 

>- **Link deste repositório:** https://github.com/thiagofigcosta/camadas-rede

Implementacao da Camada de Transporte  do Trabalho Prático de Redes 1 - CEFET-MG

  - Integrantes do grupo:
    + Marcos Tiago Ferreira Henriques marcostiagofh@gmail.com
    + Bernard Menezes Moreira da Costa bernard.menezes98@gmail.com
    + Thiago Figueiredo Costa thiagofigcosta@hotmail.com
    + Pedro Henrique Cordeiro de Jesus pedro.henrique.cefetmg@gmail.com

O Enunciado está neste __[link.](https://docs.google.com/document/d/1O3cNM0T6gFNz9PeMYcnzbmBzEe8J7k34DaefJDSsv4A/edit)__
O relatório a ser preenchido está neste __[link.](https://docs.google.com/document/d/1Jkdm1ab7stzki03h5Mim50l1egjnSPyiNFp3CbYJx2A/edit?usp=sharing)__

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


## Execução
    
### Server-side
```
    cd server-side
    node server.js
    perl server.pl
    python controlled.py
```

### Client-side
```
    cd client-side
    node client.js
    perl client.pl
    python controller.py
```

## Uso do Código


### Camada de aplicação
Instale a linguagem `python` (versão 2.7) e os pacotes necessários, através dos comandos:

    sudo apt-get install python
	sudo apt-get install python-pip
	sudo apt-get install python-tk
	sudo apt-get install python-xlib
	sudo apt-get install scrot
	pip install -r requirements.txt


Na máquina que será controlada, rode o script "controlled.py"

```
python controlled.py
```

Na máquina que irá controlar, rode o script "controller.py"

```
python controller.py
```


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


### Camada de transporte

Instale os pacotes necessários, através dos comandos:

    sudo apt-get install nodejs
    sudo apt-get install npm

Instale algum interpretador `javascript` (Sugiro node.js e o gerenciador de pacotes Chocolatey)

Rode o script "server.js".

```
node server.js
```

### Camada de rede

Instale o swift 4.2:

#### Dependencias
```
    sudo apt-get install git cmake ninja-build clang python uuid-dev libicu-dev icu-devtools libbsd-dev libedit-dev libxml2-dev libsqlite3-dev swig libpython-dev libncurses5-dev pkg-config libblocksruntime-dev libcurl4-openssl-dev autoconf libtool systemtap-sdt-dev tzdata rsync 
```

#### Ubuntu 18.04

```
   wget https://swift.org/builds/swift-4.2-branch/ubuntu1804/swift-4.2-DEVELOPMENT-SNAPSHOT-2018-10-30-a/swift-4.2-DEVELOPMENT-SNAPSHOT-2018-10-30-a-ubuntu18.04.tar.gz 
```
#### Ubuntu 16.04
```
    wget https://swift.org/builds/swift-4.2-branch/ubuntu1604/swift-4.2-DEVELOPMENT-SNAPSHOT-2018-10-30-a/swift-4.2-DEVELOPMENT-SNAPSHOT-2018-10-30-a-ubuntu16.04.tar.gz
```

#### Ubuntu 14.04
```
    wget https://swift.org/builds/swift-4.2-branch/ubuntu1404/swift-4.2-DEVELOPMENT-SNAPSHOT-2018-10-30-a/swift-4.2-DEVELOPMENT-SNAPSHOT-2018-10-30-a-ubuntu14.04.tar.gz
```

#### Caso haja algum problema tente
```
    echo "deb http://security.ubuntu.com/ubuntu xenial-security main" | sudo tee -- append /etc/apt/sources.list
    sudo apt-get update
    sudo apt-get install libicu55
```