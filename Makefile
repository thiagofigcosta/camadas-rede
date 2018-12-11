all: make run

makepre:
	swiftc swiftepc.swift -o swiftepc

make: makepre
	./swiftepc network.swift -o network

run:
	./network

gentests:
	swift tester.swift