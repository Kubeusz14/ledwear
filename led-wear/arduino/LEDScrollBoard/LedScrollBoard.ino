//
// LedScrollBoard V1.0
//  
// ESP8266 firmware and web inteface for scrolltext / pixel editor  
// based on the WiFi-enabled Led Workshop by Rui (Ray) Wang - thanks to Ray !!
// visit: rayshobby.net/?p=10963   watch: https://www.youtube.com/watch?v=ZKuIWDocIiM
// 
// adapted for AI-Thinker ESP12 boards + WS2812 led pixels by chris veigl / chris@shifz.org
// additional features: 
// DNS/captive portal, big scrollboard size, icon animations, brightness & scroll speed control
//
//
// select NodeMCU 0.9 (ESP12-Module) in tools->board
// connect led pixels to GPIO3 (RX-Pin ! used for DMA-supported output by NeoPixelBus lilbrary) 
// connect a potentiometer for max brightness control to A0 
// connect an led to Pin5 (D1) to indicate main loop operation
// connect a momentary switch to Pin4 (D2) - when pressed at startup/reset, captive portal/DNS is not used
//

#include <FS.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DNSServer.h>
#include <NeoPixelBus.h>
#include "font5x7.h"

#define HAS_BRIGHTNESS_CONTROL true
#define NUM_ROWS 7
#define LED_STRIPES true
#define BIG_BOARD
#define UNIQUE_AP_NAME    // uncomment this if you want to use multiple boards 

#define PIN_BUTTON  4    // marked as D2 on AI-Thinker ESP12 board !
#define PIN_LED     5    // marked as D1 on AI-Thinker ESP12 board !

#ifdef BIG_BOARD
  #define NUM_COLUMNS 41    // big board hast 41 columns 
  #define ICON_OFFSET 44
#else
  #define NUM_COLUMNS 8     // small demo board has 8 columns 
  #define ICON_OFFSET 6
#endif  

#define NUM_LEDS    NUM_COLUMNS*7   // 7 leds (rows) per column

#define MAX_ICONS 10
#define ICON_PIXELS 35   // number of LED pixels per icon (5 x 7)

#define BG_MODE_FILL    0   // background modes
#define BG_MODE_RAINBOW 1

// Neopixel object
// this uses GPIO3 (marked as RX on the AT-Thinker ESP12 board)
// this is a hardware restriction because of DMA access, see NeoPixelBus documentation!
NeoPixelBus<NeoGrbFeature, Neo800KbpsMethod> leds(NUM_LEDS);

const byte        DNS_PORT = 53;          // Capture DNS requests on port 53
IPAddress         apIP(192, 168, 4, 1);   // Private network for server

ESP8266WebServer server(80);  // create web server at HTTP port 80
DNSServer        dnsServer;   // create the DNS object
byte serve_dns_requests=1;    // shall we react (captive portal)

byte led_brightness = 30;
uint32_t led_color = 0x0000a0;

byte pixelupdate =1;
byte brightness = 80;         // default overall brightness
byte get_brightness_web = 0;  // default: set brightness from adc/potentiomenter
uint32_t pixels[NUM_LEDS];    // pixel buffer. this buffer allows you to set arbitrary

                              // brightness without destroying the original color values
// Forward declare functions
String get_ap_name();
void button_handler();
void on_status();
void on_change_color();
void on_homepage();
void show_leds();
uint32_t adjust_brightness(uint32_t, byte);

uint32_t counter=0;
byte ledstate=0;

// The variable below is modified by interrupt service routine
// so declare it as volatile
volatile boolean button_clicked = false;

void setup() {
  Serial.begin(115200);
  while (!Serial); // wait for serial attach
  //  Serial.setDebugOutput(true);
  //  Serial.println("\nESP8266 hotspot ready !");

  // Set pin mode
  pinMode(PIN_BUTTON, INPUT_PULLUP);
  pinMode(PIN_LED,    OUTPUT);

  // Set WiFi SSID
  String ap_name = get_ap_name();
  WiFi.persistent(false);
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
  WiFi.softAP(ap_name.c_str());

  // WiFi.printDiag(Serial);
  // IPAddress myIP = WiFi.softAPIP();
  // Serial.print("AP IP address: ");
  // Serial.println(myIP);
  
  // Set server callback functions
  server.on("/",   on_homepage);    
  server.on("/js", on_status);
  server.on("/cc", on_change_color);
  
  //server.onNotFound(on_homepage);
  server.onNotFound([](){               // try to serve another request (file?)
    if(!handleFileRead(server.uri())) 
      on_homepage();                      // default reply: the index.html !
  });
  server.begin();


  // press button on startup if you do not want a captive portal
  if (digitalRead(PIN_BUTTON) == LOW) { 
     serve_dns_requests=0;
     bg_mode = BG_MODE_FILL;
  } else {
     dnsServer.start(DNS_PORT, "*", apIP);
     serve_dns_requests=1;
     bg_mode = BG_MODE_RAINBOW;
  }
     
  // Set button handler
  attachInterrupt(PIN_BUTTON, button_handler, FALLING);

  // Show files in FS
  Serial.printf("\n\nHi ! I have these files in my folder:\n");
  SPIFFS.begin();
  {
    Dir dir = SPIFFS.openDir("/");
    while (dir.next()) {    
      String fileName = dir.fileName();
      size_t fileSize = dir.fileSize();
      Serial.printf("FS File: %s, size: %s\n", fileName.c_str(), formatBytes(fileSize).c_str());
    }
    Serial.printf("\n");
  }

  // Initialize LEDs
  leds.Begin();
  leds.Show();
}

void loop() {
  
  if (serve_dns_requests)
    dnsServer.processNextRequest();

  server.handleClient();
  ledstate=!ledstate;
  digitalWrite(PIN_LED,ledstate);


  if (pixelupdate) {
    pixelupdate=0;
    show_leds();
  }

  if ((!(counter % 100)) && (!get_brightness_web)) {
    byte new_brightness = 0;
    if (HAS_BRIGHTNESS_CONTROL) {
      new_brightness = analogRead(A0)>>2;
    } else {
      new_brightness = 150;
    }
    if (brightness!=new_brightness) {
      Serial.print("set brightness to "); 
      Serial.println(new_brightness);
    }
    brightness=new_brightness;
  }

  counter++;   // global counter for timing activities
  delay(2);

  // maybe add later: emergency handling / sw-"watchdog"
  // see: https://github.com/esp8266/Arduino/issues/1532
  // seems not necessary as stability improved afer switching to NeopixelBus library !

  // maybe add later: 
  // store settings / scroll + animation patterns to eeprom via admin command
}


uint32_t wheel(int WheelPos) {
  WheelPos = 255 - WheelPos;
  if(WheelPos < 85) {
    return adjust_brightness(getRGBColor(255 - WheelPos * 3, 0, WheelPos * 3),led_brightness);  }
  if(WheelPos < 170) {
    WheelPos -= 85;
    return adjust_brightness(getRGBColor(0, WheelPos * 3, 255 - WheelPos * 3),led_brightness);  }
  WheelPos -= 170;
  return adjust_brightness(getRGBColor(WheelPos * 3, 255 - WheelPos * 3, 0),led_brightness);
}

void drawFontCol(char c, int i){
  int pos;
  if(i >= 0 && i < NUM_COLUMNS){
    for(int j = NUM_ROWS - 7; j < NUM_ROWS; j++){
       // reverse every second column !
        if (LED_STRIPES) {
          if (!(i%2)) pos=6-j; else pos=j;
        } else {
            if (!(i%2)) pos=j; else pos=NUM_ROWS - 1 - j;
        }
        if(c & 0x1){
            pixels[i*NUM_ROWS+pos]=adjust_brightness(scrollcolor,scroll_brightness);
        } 
        c >>= 1;
    }
    
  }
}

void drawChar(char c, int offset){
  char col;
  if (c<20) drawIcon (c-10,offset); // not a readable ASCII-character -> must be icon number!
  else {
    for(int i = 0; i < 5; i++){
      if(i - offset >= 0 && i - offset < NUM_COLUMNS){
        col = pgm_read_byte(font+(c*5)+i);
        drawFontCol(col,i - offset);
      }
    }
  }
}

/* ----------------
 *  WebServer 
 * ---------------- */

void on_homepage() {
  // String html = FPSTR(index_html);   // get string constant which contains all client-side webcode
  //server.send(200, "text/html", html);
  Serial.println("got homepage request - sending index.html");
  handleFileRead("/index.html");
}

// this returns device variables in JSON, e.g.
// {"pixels":xxxx,"blink":1}
void on_status() {
  String html = "";
  html += "{\"brightness\":";
  html += brightness; 
  html += ",\"led_brightness\":";
  html += led_brightness; 
  html += ",\"scroll_brightness\":";
  html += scroll_brightness; 
  html += "}";
  server.send(200, "text/html", html);
}

byte scale_brightness(byte val) {
  if (val>10) return(10+(val-10)*(val-10)/1.8);
  return(val);
}

void on_background() {
  if(server.hasArg("mode")) {
    bg_mode = server.arg("mode").toInt();
  }
  if(server.hasArg("wait")) {
    bg_wait = scale_wait(server.arg("wait").toInt());
  }
  if(server.hasArg("color")) {
    led_color = strtol(server.arg("color").c_str(), NULL, 16);
  }
  if(server.hasArg("brightness")) {
    led_brightness = scale_brightness(server.arg("brightness").toInt());
  }
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/html", "{\"result\":1}");
  pixelupdate=1;
}

void on_change_color() {
  uint16_t i;
  if(server.hasArg("pixels")) {
       load_iconPixels(0);
  }
  if(server.hasArg("brightness")) {
    get_brightness_web=1;
    brightness = scale_brightness(server.arg("brightness").toInt());
  }
  server.send(200, "text/html", "{\"result\":1}");
  pixelupdate=1;
}

/* ----------------
 *  Helper functions 
 * ---------------- */

char dec2hex(byte dec) {
  if(dec<10) return '0'+dec;
  else return 'A'+(dec-10);
}

// AP name is ESP_ following by 
// the last 6 bytes of MAC address
String get_ap_name() {
 static String ap_name = "LedScrollBoard";

 #ifdef UNIQUE_AP_NAME 
    byte mac[6];
    WiFi.macAddress(mac);
    for(byte i=3;i<6;i++) {
      ap_name += dec2hex((mac[i]>>4)&0x0F);
      ap_name += dec2hex(mac[i]&0x0F);
    }
  #endif 
  return ap_name;
}

void button_handler() {
  button_clicked = true;
}

uint32_t adjust_brightness(uint32_t c, byte brightness) {
  uint32_t r, g, b;
    r = (c>>16)& 0xFF;
    g = (c>>8)& 0xFF;
    b = c & 0xFF;
    r = r*brightness/255;
    g = g*brightness/255;
    b = b*brightness/255;
    return ((r<<16) + (g<<8) + b);
}

void show_leds() {
  for(int i=0;i<NUM_LEDS;i++) {
    leds.SetPixelColor(i, RgbColor(HtmlColor(adjust_brightness(pixels[i],brightness))));
  }
  leds.Show();
}


//----------------------------------------------------------------------
String getContentType(String filename){
  if(server.hasArg("download")) return "application/octet-stream";
  else if(filename.endsWith(".htm")) return "text/html";
  else if(filename.endsWith(".html")) return "text/html";
  else if(filename.endsWith(".css")) return "text/css";
  else if(filename.endsWith(".js")) return "application/javascript";
  else if(filename.endsWith(".png")) return "image/png";
  else if(filename.endsWith(".gif")) return "image/gif";
  else if(filename.endsWith(".svg")) return "image/svg+xml";
  else if(filename.endsWith(".jpg")) return "image/jpeg";
  else if(filename.endsWith(".ico")) return "image/x-icon";
  else if(filename.endsWith(".xml")) return "text/xml";
  else if(filename.endsWith(".pdf")) return "application/x-pdf";
  else if(filename.endsWith(".zip")) return "application/x-zip";
  else if(filename.endsWith(".gz")) return "application/x-gzip";
  return "text/plain";
}
//----------------------------------------------------------------------
bool handleFileRead(String path){
  Serial.println("handleFileRead: " + path);
  // if(path.endsWith("/")) path += "index.htm";
  String contentType = getContentType(path);
  String pathWithGz = path + ".gz";
  if(SPIFFS.exists(path)){
    File file = SPIFFS.open(path, "r");
    size_t sent = server.streamFile(file, contentType);
    Serial.println("Sent bytes!");
    file.close();
    return true;
  }
  Serial.println("Send failed!");
  return false;
}


//format bytes
String formatBytes(size_t bytes){
  if (bytes < 1024){
    return String(bytes)+"B";
  } else if(bytes < (1024 * 1024)){
    return String(bytes/1024.0)+"KB";
  } else if(bytes < (1024 * 1024 * 1024)){
    return String(bytes/1024.0/1024.0)+"MB";
  } else {
    return String(bytes/1024.0/1024.0/1024.0)+"GB";
  }
}
