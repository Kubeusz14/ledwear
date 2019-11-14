# LED ScrollBoard Backend
The LED ScrollBoard is designed to run on a `ESP8266 AI Thinker (NodeMCU 0.9 (ESP-12 Module))` board.
The board can be programmed and managed over the Arduino IDE.

The backend (the program running on the board) opens a **Wifi network** named `LedScrollBoard` with a unique ID appended
and starts a web-server.  
Once your device is connected to the Wifi network, the **web-server** can be reached at **[http://192.168.4.1](http://192.168.4.1/)**.

The web-server serves the web-app files and provides a simple **API** to control the board (text, color, etc.).
See `API.md` for more details.

## Getting started

To setup the Arduino environment

1. install the **Arduino IDE** 
(https://www.arduino.cc/en/main/software)
2. install a the **CH34X usb-serial driver** - you can find one for MacOSX in the `res` folder
3. install the **Arduino core for ESP8266** (https://github.com/esp8266/Arduino) 
4. in the IDE go to `Sketch > Include Library > Manage Libraries` and install the **Adafruit NeoPixelBus** library 
5. The web-server serves the web-app files from a SPIFFS file system image in 
   the flash memory.
   The files are uploaded with the **Arduino ESP8266 filesystem uploader** plugin 
   (https://github.com/esp8266/arduino-esp8266fs-plugin).

## Adjust the Settings in the Firmware
There are some settings at the top of `LedScrollBoard.ino` you might need to adjust to your hardware.

## Upload the Sketch
- Make sure you selected 
  - the correct board in `Tools > Board` and
  - the correct USB serial port in `Tools > Port`
- Open the Sketch
- Upload the Sketch (backend) via `Sketch > Upload` 
- Upload the web app via `Tools > ESP8266 Sketch Data Upload`

## Open your web app
Connect to the boards Wifi network and Open [http://192.168.4.1](http://192.168.4.1/) in your browser
