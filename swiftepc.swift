#!/usr/bin/swift

import Foundation

func preprocess(filename:String) -> String {
	let dotIndex = filename.range(of: ".", options: .backwards)?.lowerBound
	let newfilename=filename.prefix(upTo: dotIndex!)+"_pre.swift"

	let file_content = try! String(contentsOfFile: filename, encoding: .utf8) //trocar ! por throws
	var new_file_content:String=""

	for char in file_content{
		let unicodeValue=char.unicodeScalars.map { $0.value }.reduce(0, +)
		if (unicodeValue>1024){
			new_file_content+="u"+String(unicodeValue)
		}else{
			new_file_content+=String(char)
		}
	}

	try! new_file_content.write(toFile: String(newfilename), atomically: true, encoding: .utf8) //trocar ! por throws
	return String (newfilename)
}

func shell(cmd: String, args: [String] = []) -> String {
	let command = cmd+" "+args.joined(separator:" ")
    let task = Process()
    task.launchPath = "/bin/bash"
    task.arguments = ["-c", command]

    let pipe = Pipe()
    task.standardOutput = pipe
    task.launch()

    let data = pipe.fileHandleForReading.readDataToEndOfFile()
    let output: String = String(decoding: data, as: UTF8.self)

    return output
}

var filenames:[String]=[]
var newfilenames:[String]=[]
var xtrargs:[String]=[]
for (i, arg) in CommandLine.arguments.enumerated(){
	if(i>0){
		if arg.lowercased().range(of:".swift") != nil {
		    filenames.append(arg)
		}else{
			xtrargs.append(arg)
		}
	}
}

for file in filenames.reversed(){
	let nfile=preprocess(filename: file)
	newfilenames.append(nfile)
	xtrargs.insert(nfile, at: 0)
}


print ("swiftc " + xtrargs.joined(separator:" "))
let output=shell(cmd:"swiftc",args:xtrargs)

var filemanager = FileManager.default
for file in newfilenames{
	try! filemanager.removeItem(atPath: file)
}

if !output.isEmpty{
	print(output)
}