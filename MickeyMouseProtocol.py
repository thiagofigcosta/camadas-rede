#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pyautogui
import time
import io
import base64
import sys
import os
import signal
import socket
if sys.version_info[0] == 2:  # the tkinter library changed it's name from Python 2 to 3.
	import Tkinter
	tkinter = Tkinter #I decided to use a library reference to avoid potential naming conflicts with people's programs.
else:
	import tkinter
from PIL import Image, ImageTk


DEFAULT_PORT=7878
FRAMESPERSECOND=30
SCREENRATIO=0.9

def findDetectIp():
	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	s.connect(("8.8.8.8", 80))
	ip=s.getsockname()[0]
	s.close()
	return ip

def controlled(ip,port):
	# file=open("device_socket.zap", "w")
	# file.write(ip.strip())
	# file.close()
	print ("Running on: "+ip+":"+str(port))
	print ("Waiting connection...")
	while True:
		try:
			file = open("message_in.pdu", "r")
			data=file.read()
			file.close()
			print ("Connected!")
			break
		except:
			pass
	try:
		os.remove("message_in.pdu")
	except:
		pass

	masterx,mastery,mousex,mousey=data.split(chr(30))
	screenx,screeny= pyautogui.size()

	img=pyautogui.screenshot()

	with io.BytesIO() as output:
		img.save(output, format="PNG")
		img_str = base64.b64encode(output.getvalue())
	data=img_str

	file = open("message_out.pdu", "wb")
	file.write(data)
	file.close()

	newmousex,newmousey=int(float(mousex)/float(masterx)*float(screenx)),int(float(mousey)/float(mastery)*float(screeny))

	print("x:"+str(newmousex)+"  y:"+str(newmousey))
	pyautogui.moveTo(newmousex, newmousey)

	time.sleep(1/FRAMESPERSECOND) # NAO DEVE SER NECESSARIO

def getScreenSize(screenx,screeny):
	return screenx*SCREENRATIO, screeny*SCREENRATIO

def showPIL(pilImage):
	root = tkinter.Tk()
	screenx, screeny = root.winfo_screenwidth(), root.winfo_screenheight()
	sizex, sizey = getScreenSize(screenx, screeny)
	posx, posy = ((screenx-sizex)/2), ((screeny-sizey)/2)

	root.overrideredirect(1)
	root.geometry("%dx%d+%d+%d" % (sizex, sizey,posx,posy))
	root.focus_set()    
	root.bind("<Escape>", lambda e: (e.widget.withdraw(), e.widget.quit()))
	canvas = tkinter.Canvas(root,width=screenx,height=screeny)
	canvas.pack()
	canvas.configure(background='black')
	imgWidth, imgHeight = pilImage.size
	if imgWidth > screenx or imgHeight > screeny:
		ratio = min(screenx/imgWidth, screeny/imgHeight)
		imgWidth = int(imgWidth*ratio)
		imgHeight = int(imgHeight*ratio)
		pilImage = pilImage.resize((imgWidth,imgHeight), Image.ANTIALIAS)
	image = ImageTk.PhotoImage(pilImage)
	imagesprite = canvas.create_image(screenx/2,screeny/2,image=image)
	root.mainloop()


def shutdown(signal,frame):
	print("\nbye\n")
	exit()


def controller(myip,ip,port):
	# file=open("device_socket.zap", "w")
	# file.write(myip.strip())
	# file.close()
	signal.signal(signal.SIGINT, shutdown)
	print ("Connecting to: "+ip+":"+str(port)+"...")
	while True:
		screenx,screeny= pyautogui.size()
		sizex, sizey = getScreenSize(screenx, screeny)
		mousex,mousey= pyautogui.position()

		data=str(sizex)+chr(30)+str(sizey)+chr(30)+str(mousex)+chr(30)+str(mousey)
		data=str.encode(data)
		
		file = open("message_out.pdu", "wb")
		file.write(data)
		file.close()

		file = open("application_ips.zap", "wb")
		file.write(myip+":"+str(port)+"-"+ip+":"+str(port))
		file.close()

		while True:
			try:
				file = open("message_in.pdu", "r")
				img_str=file.read()
				file.close()
				print ("Connected!")
				break
			except:
				pass
		try:
			os.remove("message_in.pdu")
		except:
			pass

		print("img_str : "+img_str)
		img_str=img_str.decode('base64')
		img=Image.open(io.BytesIO(img_str))
		showPIL(img)
		time.sleep(1/FRAMESPERSECOND)


if __name__ == "__main__":
	choice='?'
	print (u"-------------------------------------")
	print (u"-Bem vindo ao Protocolo Mickey Mouse-")
	print (u"-------------------------------------")
	while True:
		print (u"\nEscolha uma das opções abaixo:")
		print (u"C - Controlar um computador remoto")
		print (u"S - Ter o computador controlado")
		print (u"E - Sair")

		try:
			choice = raw_input()
			choice = choice[0].upper()
			if choice=="E" or choice=="C" or choice=="S":
				break
			else:
				raise Exception()
		except:
			
				print (u"Escolha inválida ("+choice+")...")

	if choice == "C":
		while True:
			print(u"Digite o ip e porta do computador que deseja controlar (ip:port):")
			try:
				userin=raw_input()
				ip,port=userin.split(':')
				port=int(port)
				break
			except:
				pass
		controller(myip=findDetectIp().strip(),ip=ip.strip(),port=port)
	elif choice == "S":
		controlled(ip=findDetectIp().strip(),port=DEFAULT_PORT)
	elif choice == "E":
		exit()