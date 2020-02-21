# LED-Wear
FH Technikum Wien Project

The LED-Wear is a shirt, that has LEDs and an Arduino built-in. With this project you can create an Web-Application that is able to change the Seetings of the LEDs connected to the Arduino. There you can change the color of each individual LED as well as its brightness and add some animations like blinking and change its speed. 

This repo is seperated into the arduino part and the Web App part. The LedWear.ino File can be flashed on to the microcontroller. When finished the ESP opens u a WiFi Hotspot that can be connected to, for the purpose of controlling the microcontroller wirelessly. 
The src folder contains the code for the Web App.

## Hardware

The used Hardware:
ESP8266 AI ThinkerBoard mit NodeMCU 0.9 (ESP-12 Module)
WS2812B RGB LEDs

## Steps

1. First create a react App - npx create-react-app example-app
example-app is your app name

2. Copy files from this repo and replace

<--npm install --save> to install save all dependencies

3. Flash the Arduino Files onto the Arduino Board with Arduino IDE

4. Run 'npm run build' - Upload Sketch Data

5. Connect to Hotspot

6. Control the LED-Wear

## Run the Web App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.