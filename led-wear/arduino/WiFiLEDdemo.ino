#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <Adafruit_NeoPixel.h>
#include "font5x7.h"

#define PIN_BUTTON   0
#define PIN_LED     14
#define NUM_LEDS    14
#define NUM_STEPS   4

byte devicesConnectedToAP = 0;

// Neopixel object
Adafruit_NeoPixel leds = Adafruit_NeoPixel(NUM_LEDS, PIN_LED, NEO_GRB + NEO_KHZ800);

byte brightness = 48;       // default brightness: 48
uint32_t blinkingSpeed = 1530;
uint32_t pixels[NUM_STEPS][NUM_LEDS];  // pixel buffer. this buffer allows you to set arbitrary
                            // brightness without destroying the original color values

ESP8266WebServer server(80);  // create web server at HTTP port 80

// Forward declare functions
String get_ap_name();
//void button_handler();
void on_status();
void on_change_color();
void on_get_info();
void on_homepage();
void show_leds();

void show_leds( byte shirt ) {
  uint32_t r, g, b;
  uint32_t c;
  for(byte i=0;i<NUM_LEDS;i++) {
    r = (pixels[shirt][i]>>16)&0xFF;
    g = (pixels[shirt][i]>>8)&0xFF;
    b = (pixels[shirt][i])&0xFF;
    r = r*brightness/255;
    g = g*brightness/255;
    b = b*brightness/255;
    c = (r<<16) + (g<<8) + b;
    leds.setPixelColor(i, c);
  }
  leds.show();
}

void setup() {
  Serial.begin(115200);
  
  // Set pin mode
  pinMode(PIN_BUTTON, INPUT);
  pinMode(PIN_LED,    OUTPUT);

  for(int i=0; i<NUM_STEPS; i++) {
    for(int j=0; j<NUM_LEDS; j++) {
      pixels[i][j] = 0;
    }
  }
  
  // Initialize LEDs
  leds.begin();
  leds.show();
  

  // Set WiFi SSID
  String ap_name = get_ap_name();
  WiFi.persistent(false);
  WiFi.softAP(ap_name.c_str());
  WiFi.mode(WIFI_AP);
  
  // Set server callback functions
  server.on("/",   on_homepage);    
  server.on("/js", on_status);
  server.on("/info", on_get_info);
  server.on("/cc", on_change_color);
  server.begin();
  
  // Set button handler
  attachInterrupt(PIN_BUTTON, button_handler, FALLING);
}

// The variable below is modified by interrupt service routine
// so declare it as volatile
volatile boolean button_clicked = false;

void loop() {
  if( WiFi.softAPgetStationNum() != devicesConnectedToAP )
  {
    devicesConnectedToAP = WiFi.softAPgetStationNum();
    Serial.printf("Stations connected to soft-AP = %d\n", devicesConnectedToAP);  
  }
    for(byte shirt=0; shirt<NUM_STEPS; shirt = (shirt+1) % NUM_STEPS) {
      server.handleClient();
      show_leds( shirt );
      Serial.printf("blinking delay: %d\n", (3030 - blinkingSpeed));
      delay(3030 - blinkingSpeed);
    }
}

/* ----------------
 *  WebServer
 * ---------------- */

#include "html.h"
void on_homepage() {
  Serial.println("on_homepage() executed: Homepage loaded");
  String html = FPSTR(index_html);
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/html", html);
}

// this returns device variables in JSON, e.g.
// {"pixels":xxxx,"blink":1}
void on_status() {
  Serial.println("on_status() executed: Sending status");
  String html = "";
  html += "{\"brightness\":";
  html += brightness; 
  html += "}";
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/html", html);
}

void on_get_info() {
  Serial.println("on_get_info() executed: Sending information");
  String html = "{\"clientsConnected\":";
  html += devicesConnectedToAP;
  html += "}";
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/html", html);
}

void on_change_color() {
  uint16_t shirt;
  uint16_t i;
  Serial.println("on_change_color() executed: changing leds' colors");
  if(server.hasArg("pixels")) {
    String val = server.arg("pixels");
    
    Serial.printf("sizeof(val): %d\n", val.length());
    for(shirt=0;shirt<NUM_STEPS;shirt++) {
      Serial.println("LOOP");
      for(i=0;i<NUM_LEDS;i++) {
        Serial.println(val.substring(shirt*NUM_LEDS + i*6, shirt*NUM_LEDS + i*6+6).c_str());
        pixels[shirt][i] = strtol(val.substring(shirt*NUM_LEDS*6 + i*6, shirt*NUM_LEDS*6 + i*6+6).c_str(), NULL, 16);
      }
    }
  }
  if(server.hasArg("clear")) {  
    for(shirt=0;shirt<1;shirt++) {
      for(i=0;i<NUM_LEDS;i++) {
        pixels[shirt][i] = 0;
      }
    }
  }
  if(server.hasArg("brightness")) {
    Serial.println("brightness");
    brightness = server.arg("brightness").toInt();
    Serial.println(server.arg("brightness"));
  }
  if(server.hasArg("speed")) {
    Serial.println("speed");
    blinkingSpeed = server.arg("speed").toInt();
    Serial.println(server.arg("speed"));
  }
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/html", "{\"result\":1}");
}

char dec2hex(byte dec) {
  if(dec<10) return '0'+dec;
  else return 'A'+(dec-10);
}

// AP name is ESP_ following by 
// the last 6 bytes of MAC address
String get_ap_name() {
  static String ap_name = "";
  if(!ap_name.length()) {
    byte mac[6];
    WiFi.macAddress(mac);
    ap_name = "ESP_";
    for(byte i=3;i<6;i++) {
      ap_name += dec2hex((mac[i]>>4)&0x0F);
      ap_name += dec2hex(mac[i]&0x0F);
    }
  }
  return ap_name;
}

void button_handler() {
  button_clicked = true;
}
