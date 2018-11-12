#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pyautogui
import time
import io
import base64
import sys
import os
import signal
if sys.version_info[0] == 2:  # the tkinter library changed it's name from Python 2 to 3.
	import Tkinter
	tkinter = Tkinter #I decided to use a library reference to avoid potential naming conflicts with people's programs.
else:
	import tkinter
from PIL import Image, ImageTk


FRAMESPERSECOND=30
DESIRED_IP="192.168.254.70"
DEFAULTAPP_PORT="7878"


def getScreenSize(screenx,screeny):
	return screenx*0.9, screeny*0.9

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


signal.signal(signal.SIGINT, shutdown)

while True:
	screenx,screeny= pyautogui.size()
	sizex, sizey = getScreenSize(screenx, screeny)
	mousex,mousey= pyautogui.position()

	data=DESIRED_IP+':'+DEFAULTAPP_PORT+chr(30)+str(sizex)+chr(30)+str(sizey)+chr(30)+str(mousex)+chr(30)+str(mousey)
	data=str.encode(data)
	
	file = open("message_master.txt", "wb")
	file.write(data)
	file.close()

	while True:
		try:
			file = open("message_slave.txt", "r")
			img_str=file.read()
			
			file.close()
			break
		except:
			pass
	try:
		os.remove("message_master.txt")
	except:
		pass

	print("img_str : "+img_str)
	img_str=img_str.decode('base64')
	img=Image.open(io.BytesIO(img_str))
	showPIL(img)
	time.sleep(1/FRAMESPERSECOND)
