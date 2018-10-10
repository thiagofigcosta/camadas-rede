#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pyautogui
import time
import os
import io
import base64

FRAMESPERSECOND=30


while True:
	while True:
		try:
			file = open("message_master.txt", "r")
			data=file.read()
			file.close()
			break
		except:
			pass
	try:
		os.remove("message_master.txt")
	except:
		pass

	masterx,mastery,mousex,mousey=data.split(chr(30))
	screenx,screeny= pyautogui.size()

	img=pyautogui.screenshot()

	with io.BytesIO() as output:
		img.save(output, format="PNG")
		img_str = base64.b64encode(output.getvalue())
	data=DST_TP+chr(30)+img_str

	file = open("message_slave.txt", "wb")
	file.write(data)
	file.close()

	newmousex,newmousey=int(float(mousex)/float(masterx)*float(screenx)),int(float(mousey)/float(mastery)*float(screeny))

	print("x:"+str(newmousex)+"  y:"+str(newmousey))
	pyautogui.moveTo(newmousex, newmousey)

	time.sleep(1/FRAMESPERSECOND) # NAO DEVE SER NECESSARIO