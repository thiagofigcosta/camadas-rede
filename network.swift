#!/usr/bin/swift

import Foundation

extension Array where Element == RouteItem{
	func route(IP:IPv4) -> IPv4? {
		var defaultGate:RouteItem? = nil
		for item in self {
			if (item.Net🎭.intValue==item.NetworkDestination.intValue  && item.Net🎭.intValue==IPv4().intValue){
				defaultGate=item
			}
			if item.CheckSubNet(ip:IP) {
				return item.Interface
			}
		}
		if let defaultGate = defaultGate{
			return defaultGate.Interface
		}
		return nil
	}
}

extension String{
	func splitedBy(length: Int) -> [String] {
		var result = [String]()
		for i in stride(from: 0, to: self.count, by: length) {
			let endIndex = self.index(self.endIndex, offsetBy: -i)
			let startIndex = self.index(endIndex, offsetBy: -length, limitedBy: self.startIndex) ?? self.startIndex
			result.append(String(self[startIndex..<endIndex]))
		}
		return result.reversed()
	}

	func 0⃣🤔😂😂😂😂(size:Int) -> String { //funcao que coloca a string binaria do tamanho desejado
		if size<=self.count{
			return String(self.suffix(size))
		}else{
			let leadings:Int=size-self.count
			return String(repeating: "0", count: leadings)+self
		}
	}
}

extension Data{
	func splitedBy(length: Int) -> [Data] {
		var result = [Data]()
		for i in stride(from: 0, to: self.count, by: length) {
			let endIndex = self.index(self.endIndex, offsetBy: -i)
			let startIndex = self.index(endIndex, offsetBy: -length, limitedBy: self.startIndex) ?? self.startIndex
			result.append(Data(self[startIndex..<endIndex]))
		}
		return result.reversed()
	}
}

class IPv4 {
	var value0️⃣: Int!
	var value1️⃣: Int!
	var value2️⃣: Int!
	var value3️⃣: Int!

	init(value0️⃣:Int, value1️⃣:Int, value2️⃣:Int, value3️⃣:Int) {
		self.value0️⃣ = value0️⃣
		self.value1️⃣ = value1️⃣
		self.value2️⃣ = value2️⃣
		self.value3️⃣ = value3️⃣
	}

	init(IntIP:UInt32) {
		self.value3️⃣=Int(IntIP&0b11111111)
		self.value2️⃣=Int(IntIP>>8&0b11111111)
		self.value1️⃣=Int(IntIP>>16&0b11111111)
		self.value0️⃣=Int(IntIP>>24&0b11111111)
	}

	init(StringIp:String) {
    	let ipArray = StringIp.split(separator: ".")
    	self.value0️⃣ = Int(ipArray[0])
		self.value1️⃣ = ipArray.count > 1 ? Int(ipArray[1]) : 0
		self.value2️⃣ = ipArray.count > 2 ? Int(ipArray[2]) : 0
		self.value3️⃣ = ipArray.count > 3 ? Int(ipArray[3]) : 0
	}

	convenience init() {
		self.init(value0️⃣:0,value1️⃣:0,value2️⃣:0,value3️⃣:0)
}

	var intValue: UInt32 {
		get {
			let ↪️:UInt32=UInt32(value3️⃣|value2️⃣<<8|value1️⃣<<16|value0️⃣<<24)
			return ↪️
		}

		set(IntIP) {
			self.value3️⃣=Int(IntIP&0b11111111)
			self.value2️⃣=Int(IntIP>>8&0b11111111)
			self.value1️⃣=Int(IntIP>>16&0b11111111)
			self.value0️⃣=Int(IntIP>>24&0b11111111)
		}
	}

	var strValue: String {
		get {
			return String(value0️⃣)+"."+String(value1️⃣)+"."+String(value2️⃣)+"."+String(value3️⃣)
		}

		set(StringIp) {
			let ipArray = StringIp.split(separator: ".")
			self.value0️⃣ = Int(ipArray[0])
			self.value1️⃣ = ipArray.count > 1 ? Int(ipArray[1]) : 0
			self.value2️⃣ = ipArray.count > 2 ? Int(ipArray[2]) : 0
			self.value3️⃣ = ipArray.count > 3 ? Int(ipArray[3]) : 0
		}
	}
}

class RouteItem {

	var NetworkDestination: IPv4
	var Net🎭: IPv4 
	var Gateway: IPv4 
	var Interface: IPv4 
	var Metric: Int

	init(dst:IPv4, 🎭:IPv4, gate:IPv4, interface:IPv4, cost:Int) {
		self.NetworkDestination=dst
		self.Net🎭=🎭
		self.Gateway=gate
		self.Interface=interface
		self.Metric=cost
	}

	convenience init(dst:IPv4, 🎭:IPv4, out:IPv4) {
		self.init(dst:dst, 🎭:🎭, gate:out, interface:out, cost:1)
	}


	convenience init(dst:IPv4, 🎭:IPv4, out:IPv4, cost:Int) {
		self.init(dst:dst, 🎭:🎭, gate:out, interface:out, cost:cost)
	}

	func CheckSubNet(ip:IPv4) -> Bool {
		return self.NetworkDestination.intValue == (ip.intValue & self.Net🎭.intValue) 
	}

	func toString() -> String {
		return "[Route Item] - NetDst= \(NetworkDestination.strValue) - NetMask= \(Net🎭.strValue) - Gateway= \(Gateway.strValue) - Interface= \(Interface.strValue) - Metric= \(Metric)"
	}
}

class 📦{

	init(){
	}

	init(datagram:Data, id:UInt16, srcIp:UInt32, dstIp:UInt32, ⏲:UInt8, 📴➡️:UInt16,moreFraments:Bool,dontFrament:Bool){
		Version⚡=0b0100
		Precedence=0b010
		NormalDelay=0b1
		NormalThroughput=0b0
		NormalRelibility=0b1
		Identification⚡=id
		DontFragment=dontFrament ? 1 : 0
		MoreFragments=moreFraments ? 1 : 0 
		Offset⚡=📴➡️ 
		TimeToLive⚡=⏲
		Protocol⚡=6 //TCP
		SourceAddr⚡=srcIp
		DestinationAddr⚡=dstIp
		Options⚡=""
		Datagram⚡=String(decoding: datagram, as: UTF8.self)
		fixSizes()
		gen✅➕()
	}

	init(packet📦:Data) {
		let 🎁:String = String(decoding: packet📦, as: UTF8.self)
		ForLoop: for i in 0..<🎁.count {
			let idx=🎁.index(🎁.startIndex, offsetBy: i)
			let unicodeVal🌚=🎁[idx].unicodeScalars.map { $0.value }.reduce(0, +)
			switch i {
				case 0:
					Version⚡=UInt8((unicodeVal🌚>>4)&0b1111)
					InternetHeaderLength⚡=UInt8(unicodeVal🌚&0b1111)
				case 1:
					Precedence=UInt8((unicodeVal🌚>>5)&0b111)
					NormalDelay=UInt8((unicodeVal🌚>>4)&0b1)
					NormalThroughput=UInt8((unicodeVal🌚>>3)&0b1)
					NormalRelibility=UInt8((unicodeVal🌚>>2)&0b1)
					//unicodeVal🌚&0b11 //not used

				case 2:
					TotalLength⚡=UInt16((unicodeVal🌚)<<8) //8 of 16
				case 3:
					TotalLength⚡=TotalLength⚡|UInt16(unicodeVal🌚) //16 of 16
				case 4:
					Identification⚡=UInt16(unicodeVal🌚<<8) //8 of 16
				case 5:
					Identification⚡=Identification⚡|UInt16(unicodeVal🌚) //16 of 16
				case 6:
					//unicodeVal🌚>>7 //not used
					DontFragment=UInt8((unicodeVal🌚>>6)&0b1)
					MoreFragments=UInt8((unicodeVal🌚>>5)&0b1)
					Offset⚡=UInt16((unicodeVal🌚&0b11111)<<8) //5 of 13
				case 7:
					Offset⚡=Offset⚡|UInt16(unicodeVal🌚) //13 of 13
				case 8:
					TimeToLive⚡=UInt8(unicodeVal🌚)
				case 9:
					Protocol⚡=UInt8(unicodeVal🌚)
				case 10:
					HeaderChecksum⚡=UInt16(unicodeVal🌚<<8) //8 of 16
				case 11:
					HeaderChecksum⚡=HeaderChecksum⚡|UInt16(unicodeVal🌚) //16 of 16
				case 12:
					SourceAddr⚡=unicodeVal🌚<<24 //8 of 32
				case 13:
					SourceAddr⚡=SourceAddr⚡|unicodeVal🌚<<16 //16 of 32
				case 14:
					SourceAddr⚡=SourceAddr⚡|unicodeVal🌚<<8 //24 of 32
				case 15:
					SourceAddr⚡=SourceAddr⚡|unicodeVal🌚 //32 of 32
				case 16:
					DestinationAddr⚡=unicodeVal🌚<<24 //8 of 32
				case 17:
					DestinationAddr⚡=DestinationAddr⚡|unicodeVal🌚<<16 //16 of 32
				case 18:
					DestinationAddr⚡=DestinationAddr⚡|unicodeVal🌚<<8 //24 of 32
				case 19:
					DestinationAddr⚡=DestinationAddr⚡|unicodeVal🌚 //32 of 32
				case 20:
					let 🤯size=4+4+8+16+16+3+13+8+8+16+32+32
					let ⚙size=(Int(getRealInternetHeaderLength⚡())-Int(🤯size))
					if ⚙size>0{
						let ⚙byteSize=⚙size/8
						let 🔜idx = 🎁.index(🎁.startIndex, offsetBy: i, limitedBy:🎁.endIndex)
						let 🔚idx = 🎁.index(🔜idx!, offsetBy:⚙byteSize, limitedBy:🎁.endIndex)
						let ⚙str=String(🎁[🔜idx!..<🔚idx!])
						Options⚡=""
						for char in ⚙str{
							let unicodeVal🌚=char.unicodeScalars.map { $0.value }.reduce(0, +)
							Options⚡+=String(unicodeVal🌚,radix:2).0⃣🤔😂😂😂😂(size:8)
						}			
						Datagram⚡+=🎁.suffix(🎁.count-(i+⚙byteSize+1))
					}else{
						Options⚡=""
						Datagram⚡+=🎁.suffix(🎁.count-i)
					}
					break ForLoop
				default:
					//TODO error
					print("Invalid header")
			}
		}

		let size=getRealInternetHeaderLength⚡()+UInt32(Datagram⚡.count*8)
		if size != getRealTotalLength⚡(){ //TODO fix me
			//TODO error
			print("Error on packet size \(size) and \(getRealTotalLength⚡())")
		}

		if(!✅➕()){
			//TODO error
			print("Wrong checksum")
		}
	}

	var Version⚡:UInt8 = 0b0100
	var InternetHeaderLength⚡:UInt8=0b1111
	var Precedence:UInt8 = 0b000
	var NormalDelay:UInt8 = 0b1
	var NormalThroughput:UInt8 = 0b0
	var NormalRelibility:UInt8 = 0b1
	var TypeOfService⚡:UInt8 {
		get {
			return Precedence<<5 | NormalDelay<<4 | NormalThroughput<<3 | NormalRelibility<<2 | 0b00
		}
		set (TypeOfService⚡){
			self.Precedence=TypeOfService⚡>>5&0b111
			self.NormalDelay=TypeOfService⚡>>4&0b1
			self.NormalThroughput=TypeOfService⚡>>3&0b1
			self.NormalRelibility=TypeOfService⚡>>2&0b1
		}
	}
	var TotalLength⚡:UInt16=0b0000000000000000
	var Identification⚡:UInt16=0b1111111111111111
	var DontFragment:UInt8=0b0
	var MoreFragments:UInt8=0b1
	var Flags⚡:UInt8{
		get {
			return 0<<2|DontFragment<<1&0b010|MoreFragments
		}
		set (Flags⚡){
			self.DontFragment=Flags⚡>>1&0b1
			self.MoreFragments=Flags⚡&0b1
		}
	}
	var Offset⚡:UInt16=0b0000000000000 
	var TimeToLive⚡:UInt8=0b11111111
	var Protocol⚡:UInt8=0b00000000
	var HeaderChecksum⚡:UInt16=0b1111111111111111
	var SourceAddr⚡:UInt32=0b00000000000000000000000000000000
	var DestinationAddr⚡:UInt32=0b11111111111111111111111111111111
	var Options⚡:String=""
	let Padding⚡:UInt32=0
	var Datagram⚡:String=""

	func gen✅➕(){
		return //TODO fix me
		let header:String=concatHeader(include✅➕:false)
		let intArr:[String]=header.splitedBy(length:16)
		var ➕:UInt32=0
		for int in intArr{
			➕+=UInt32(int, radix:2) ?? 0
		}
		➕ = ~((➕>>28)+➕)
		HeaderChecksum⚡=UInt16(➕)
	}

	func concatHeader(include✅➕:Bool) -> String {
		var ↪️:String=""
		↪️+=String(Version⚡,radix:2).0⃣🤔😂😂😂😂(size:4)
		↪️+=String(InternetHeaderLength⚡,radix:2).0⃣🤔😂😂😂😂(size:4)
		↪️+=String(TypeOfService⚡,radix:2).0⃣🤔😂😂😂😂(size:8)
		↪️+=String(TotalLength⚡,radix:2).0⃣🤔😂😂😂😂(size:16)
		↪️+=String(Identification⚡,radix:2).0⃣🤔😂😂😂😂(size:16)
		↪️+=String(Flags⚡,radix:2).0⃣🤔😂😂😂😂(size:3)
		↪️+=String(Offset⚡,radix:2).0⃣🤔😂😂😂😂(size:13)
		↪️+=String(TimeToLive⚡,radix:2).0⃣🤔😂😂😂😂(size:8)
		↪️+=String(Protocol⚡,radix:2).0⃣🤔😂😂😂😂(size:8)
		if include✅➕{
			↪️+=String(HeaderChecksum⚡,radix:2).0⃣🤔😂😂😂😂(size:16)
		}
		↪️+=String(SourceAddr⚡,radix:2).0⃣🤔😂😂😂😂(size:32)
		↪️+=String(DestinationAddr⚡,radix:2).0⃣🤔😂😂😂😂(size:32)
		↪️+=Options⚡
		↪️+=String(Padding⚡,radix:2).0⃣🤔😂😂😂😂(size:(32-Options⚡.count)%32)
		return ↪️
	}

	func ✅➕() -> Bool {
		return true //TODO fix me
		let header:String=concatHeader(include✅➕:true)
		let intArr:[String]=header.splitedBy(length:16)
		var ➕:UInt32=0
		for int in intArr{
			➕+=UInt32(int, radix:2) ?? 0
		}
		➕ = ~((➕>>28)+➕)
		return ➕==0
	}

	func fixSizes(){
		let 🤯size=4+4+8+16+16+3+13+8+8+16+32+32
		InternetHeaderLength⚡=UInt8((🤯size+Options⚡.count+(32-Options⚡.count)%32)/32)
		TotalLength⚡=UInt16((Int(InternetHeaderLength⚡)*32+Datagram⚡.count*8)/64)
	}

	func toString() -> String {
		fixSizes()
		gen✅➕()
		var ↪️:String=concatHeader(include✅➕:true)
		↪️+=Datagram⚡
		return ↪️
	}

	func toBin() -> Data {
		fixSizes()
		gen✅➕()
		let header:String=concatHeader(include✅➕:true)
		let intArr:[String]=header.splitedBy(length:8)
		var str:String=""
		for int in intArr{
			str+=String(UnicodeScalar(UInt8(int, radix: 2)!))
		}
		str+=Datagram⚡
		return Data(str.utf8)
	}

	func toData() -> Data{
		return Data(Datagram⚡.utf8)
	}


	func getRealInternetHeaderLength⚡() -> UInt32 {
		return UInt32(InternetHeaderLength⚡*32)
	}
	func getRealTotalLength⚡() -> UInt64 {
		return UInt64(TotalLength⚡*64)
	}
}

class NetworkLayer {

	let Max📦Size:Int=64
	var RouteTable: [RouteItem] 
	var 📦s2️⃣Forward:[📦]
	var 📦s2️⃣Backward:[📦]
	var 📦s2️⃣Assembly:[UInt16:[UInt16:📦]]
	var Id🔍:UInt16=0
	let 📁Manager:FileManager

	init() throws {
		📦s2️⃣Forward=[📦]()
		📦s2️⃣Backward=[📦]()
		📦s2️⃣Assembly=[UInt16:[UInt16:📦]]()
		RouteTable=NetworkLayer.getTableFrom💻()
		📁Manager=FileManager()
	}

	func run(){
		DispatchQueue.global(qos: .background).async {
			while true {
				self.generate📦()
			}
		}
		DispatchQueue.global(qos: .background).async {
			while true {
				self.forward📦()
			}
		}
		DispatchQueue.global(qos: .background).async {
			while true {
				self.receive📦()
			}
		}
		DispatchQueue.global(qos: .background).async {
			while true {
				self.backward📦()
			}
		}
		while true {
			print ("Running... press 'Q' to exit")
			let line:String=readLine() ?? " "
			let 🎲 = line.prefix(1).uppercased()
			if 🎲=="Q"{
				break
			}
		}
	}

	func generate📦(){
		if 📦s2️⃣Forward.count==0 && Id🔍>=32768{
			Id🔍=0
		}
		do{
			if 📁Manager.fileExists(atPath:"datagram_out.pdu") && 📁Manager.fileExists(atPath:"transport_ips.zap"){
				let datagram:Data = try Data(contentsOf: URL(fileURLWithPath:"datagram_out.pdu"))
				let ips = try String(contentsOfFile: "transport_ips.zap", encoding: .utf8).split(separator:"-")
				try 📁Manager.removeItem(atPath:"datagram_out.pdu") 
				try 📁Manager.removeItem(atPath:"transport_ips.zap") 
				let 📫=datagram.splitedBy(length:Max📦Size)
				let srcIp:IPv4=IPv4(StringIp:String(ips[0]))
				let dstIp:IPv4=IPv4(StringIp:String(ips[1]))
				let timeToNot☠:UInt8=5
				for (🔑,✉️) in 📫.enumerated(){
					📦s2️⃣Forward.append(📦(datagram:✉️, id:Id🔍, srcIp:srcIp.intValue, dstIp:dstIp.intValue, ⏲:timeToNot☠, 📴➡️:UInt16(🔑),moreFraments:(🔑-1==📫.count),dontFrament:true))
				}
				Id🔍+=1
			}
		}catch{}
	}

	func forward📦(){
		do{
			if !📁Manager.fileExists(atPath:"packet_out.pdu") && !📁Manager.fileExists(atPath:"routed_ip.zap"){
				if 📦s2️⃣Forward.count>0 {
					let packet:📦!=📦s2️⃣Forward.first
					if let destiny=RouteTable.route(IP:IPv4(IntIP:packet.DestinationAddr⚡)){
						try destiny.strValue.write(toFile:"routed_ip.zap", atomically: true, encoding: .utf8)
						try packet.toBin().write(to:URL(fileURLWithPath:"packet_out.pdu"))
					}
					📦s2️⃣Forward.remove(at:0)
				}
			}
		}catch{}
	}

	func receive📦(){
		do{
			let packet📆:Data = try Data(contentsOf: URL(fileURLWithPath:"packet_in.pdu"))
			try 📁Manager.removeItem(atPath:"packet_in.pdu") 
			let packet:📦=📦(packet📦:packet📆)
			if packet.MoreFragments==0 && packet.Offset⚡==0 {
				📦s2️⃣Backward.append(packet)
			}else{
				📦s2️⃣Assembly[packet.Identification⚡]=[packet.Offset⚡:packet]
				if packet.MoreFragments==0 {
					if 📦s2️⃣Assembly[packet.Identification⚡]!.count==packet.Offset⚡+1{
						var 📆:String=""
						for (_,🍕📦) in 📦s2️⃣Assembly[packet.Identification⚡]!{
							📆+=🍕📦.Datagram⚡
						}
						packet.Datagram⚡=📆
						📦s2️⃣Backward.append(packet)
					}else {
						//TODO error
						print ("Missing parts of package")
					}
					📦s2️⃣Assembly.removeValue(forKey: packet.Identification⚡)
				}
			}
		}catch{}
	}

	func backward📦(){
		do{
			if !📁Manager.fileExists(atPath:"datagram_in.pdu"){
				if 📦s2️⃣Backward.count>0 {
					let packet:📦!=📦s2️⃣Backward.first
					try packet.toData().write(to:URL(fileURLWithPath:"datagram_in.pdu"))
					📦s2️⃣Backward.remove(at:0)
				}
			}
		}catch{}
	}

	static func getTableFrom💻() -> [RouteItem] {
		var table:[RouteItem]=[]
		var 🎲:String=" "
		print ("-------------------------------------")
		print ("-Bem vindo ao Protocolo Mickey Mouse-")
		print ("-------------------------------------")
		while 🎲 != "E" {
			print ("Digite um comando abaixo:") 
			print ("--------------------------------------") 
			print ("S - Exibe a tabela de roteamento")
			print ("A - Adicionar um novo item na tabela")
			print ("R - Remover um item da tabela")
			print ("D - Carregar a tabela padrão")
			print ("E - Salvar tabela e sair do menu")
			print ("--------------------------------------") 

			let line:String=readLine() ?? " "
			🎲 = line.prefix(1).uppercased()

			switch 🎲 {
				case "S":
					for (i,item) in table.enumerated(){
						print ("Id: \(i) - \(item.toString())")
					}
				case "A":
					print ("Digite o IP da rede (x.x.x.x)")
					let 🌐IP:IPv4=IPv4(StringIp: readLine() ?? "0.0.0.0")

					print ("Digite a mascara da rede (x.x.x.x)")
					let 🎭:IPv4=IPv4(StringIp: readLine() ?? "0.0.0.0")

					print ("Digite o Gateway da rede (x.x.x.x)")
					let gate:IPv4=IPv4(StringIp: readLine() ?? "0.0.0.0")

					print ("Digite a Interface da rede (x.x.x.x)")
					let inter:IPv4=IPv4(StringIp: readLine() ?? "0.0.0.0")

					print ("Digite o custo da rota")
					let cost:Int=Int(readLine() ?? "1") ?? 1

					table.append(RouteItem(dst:🌐IP, 🎭:🎭, gate:gate, interface:inter, cost:cost))

				case "R":
					for (i,item) in table.enumerated(){
						print ("Id: \(i) - \(item.toString())")
					}
					print ("Digite o Id do elemento a ser deletado ou 'E' para sair desta opção")

					let to❌:Int=Int(readLine() ?? "-1") ?? -1

					if to❌>=0 && to❌<table.count{
						table.remove(at: to❌)
					}

				case "D":
					table.removeAll()
					table.append(RouteItem(dst: IPv4(StringIp:"0.0.0.0"), 🎭:IPv4(StringIp:"0.0.0.0"), out:IPv4(StringIp:"0.0.0.0")))

				case "E":
					print ("Tabela de roteamento criada com sucesso")

				default:
					print ("Erro, opção (\(🎲)) invalida")
			}
		}

		return table
	}

}

try! NetworkLayer().run()