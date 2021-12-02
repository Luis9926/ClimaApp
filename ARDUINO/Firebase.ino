#include <SPI.h>
#include <WiFiNINA.h>
#include "Firebase_Arduino_WiFiNINA.h"
#include <Arduino_MKRIoTCarrier.h>
MKRIoTCarrier carrier;

#define DATABASE_URL "climaapp-3ccea-default-rtdb.firebaseio.com"
#define DATABASE_SECRET "kaTGKT5vm1eam9oz8j682xqxTkHau3T91EADE3qr"
/*#define DATABASE_URL "weather-276a5-default-rtdb.firebaseio.com"
#define DATABASE_SECRET "HAVAQX2KvRXF3V35vgN9rrmMd3BqRWdarPANEUP4"*/
/*#define WIFI_SSID "IZZI-2102"
#define WIFI_PASSWORD "yt5z3i5z"*/
#define WIFI_SSID "vex"
#define WIFI_PASSWORD "vex12345678"
FirebaseData fbdo;
File myFile;

int status = WL_IDLE_STATUS;
double temp, hum, pres;
String tempStr, humStr, presStr;
String path = "/climaRegistro";
String jsonStr;

void setup()
{
  Serial.begin(9600);
  while (!Serial);
  CARRIER_CASE = false;
  carrier.begin();

  Serial.println("Starting weather station...");
  delay(5000);

  //Revisamos que el modulo wifi responda
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    while (true) {
      carrier.Buzzer.sound(8000);
    }
  }
}

void loop()
{
  //Se imprimen las variables en el monitor serial
  temp  = carrier.Env.readTemperature();
  hum   = carrier.Env.readHumidity();
  pres  = carrier.Pressure.readPressure();
  tempStr = temp;
  humStr = hum;
  presStr = pres;
  Serial.print("Temperatura: ");
  Serial.println(temp);
  Serial.print("Humedad: ");
  Serial.println(hum);
  Serial.print("Presion: ");
  Serial.println(pres);
  displaySensors();
  delay(2000);

  //Iniciamos la conexion a internet
  if (status != WL_CONNECTED) {
    Serial.println("Attempting to connect to wifi...");
    displayWifi();
    status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    delay(10000);
  }
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  displayWifi2();
  delay(2000);

  //Autentificamos los datos para la conexion a la bd
  Firebase.begin(DATABASE_URL, DATABASE_SECRET, WIFI_SSID, WIFI_PASSWORD);
  Firebase.reconnectWiFi(true);
  delay(2000);

  //Mandamos los valores de las variables a la base dedatos
  Serial.println("-----------------------------------");
  Serial.println("----------Begin Push JSON----------");
  Serial.println("-----------------------------------");
  Serial.println();
  jsonStr = "{\"Humedad\":" + humStr + ",\n \"Presion\":" + presStr + ", \n \"Temperatura\":" + tempStr + "}";
  displaySend();
  delay(2000);
  if (Firebase.pushJSON(fbdo, path + "/registrosClima", jsonStr))
  {
    displaySend2();
    Serial.println("----------Push result-----------");
    Serial.println("path: " + fbdo.dataPath());
    Serial.print("Push name: ");
    Serial.println(fbdo.pushName());
    Serial.println("--------------------------------");
    Serial.println();
  }
  else
  {
    Serial.println("----------Can't push data--------");
    Serial.println("error, " + fbdo.errorReason());
    Serial.println("--------------------------------");
    displaySendError();
    Serial.println();
  }
  delay(2000);
  
  //Guardamos los datos en la memoria micro SD como respaldo
  myFile = SD.open("data.txt", FILE_WRITE);
  if (myFile) {
    Serial.println("Saving data into data.txt...");
    displaySD();
    delay(2000);
    myFile.print(temp);
    myFile.print(",");
    myFile.print(hum);
    myFile.print(",");
    myFile.println(pres);
    myFile.close();
    Serial.println("Saved complete!");
    displaySD2();
    delay(2000);
  }
  else {
    Serial.println("Error txt file no found!");
    displaySDError();
    delay(2000);
  }
  // re-open the file for reading:
  myFile = SD.open("data.txt");
  if (myFile) {
    Serial.println("data.txt:");

    // read from the file until there's nothing else in it:
    while (myFile.available()) {
      Serial.write(myFile.read());
    }
    // close the file:
    myFile.close();
  } else {
    // if the file didn't open, print an error:
    Serial.println("error opening test.txt");
  }
  delay(30000);
}
/*----------------------------------------------------*/
void displaySensors() {
  carrier.display.fillScreen(ST77XX_BLACK); //oled clear()

  carrier.display.setCursor(60, 100);
  carrier.display.setTextColor(ST77XX_WHITE);
  carrier.display.print("Humidity =  ");
  carrier.display.setTextColor(ST77XX_GREEN);
  carrier.display.print(hum);
  carrier.display.print("%");

  carrier.display.setCursor(60, 115);
  carrier.display.setTextColor(ST77XX_WHITE);
  carrier.display.print("Temperature =  ");
  carrier.display.setTextColor(ST77XX_GREEN);
  carrier.display.print(temp);
  carrier.display.print("°C");

  carrier.display.setCursor(60, 130);
  carrier.display.setTextColor(ST77XX_WHITE);
  carrier.display.print("Pressure =  ");
  carrier.display.setTextColor(ST77XX_GREEN);
  carrier.display.print(pres);
  carrier.display.print("hPa");
}
/*----------------------------------------------------*/
void displayWifi() {
  carrier.display.fillScreen(ST77XX_BLACK);
  carrier.display.setCursor(40, 100);
  carrier.display.setTextColor(ST77XX_WHITE);
  carrier.display.print("Attempting to connect to wifi...");
}
void displayWifi2() {
  carrier.display.fillScreen(ST77XX_BLACK);
  carrier.display.setCursor(40, 100);
  carrier.display.setTextColor(ST77XX_WHITE);
  carrier.display.print("Connected with IP: ");
  carrier.display.print(WiFi.localIP());
}
/*----------------------------------------------------*/
void displaySend() {
  carrier.display.fillScreen(ST77XX_BLACK);
  carrier.display.setCursor(70, 100);
  carrier.display.setTextColor(ST77XX_WHITE);
  carrier.display.print("Push JSON...");
}
void displaySend2() {
  carrier.display.fillScreen(ST77XX_BLACK);
  carrier.display.setCursor(70, 100);
  carrier.display.setTextColor(ST77XX_WHITE);
  carrier.display.print("Push JSON successful");
}
void displaySendError() {
  carrier.display.fillScreen(ST77XX_BLACK);
  carrier.display.setCursor(70, 100);
  carrier.display.setTextColor(ST77XX_WHITE);
  carrier.display.print("Error pushing JSON");
}
/*----------------------------------------------------*/
void displaySD() {
  carrier.display.fillScreen(ST77XX_BLACK);
  carrier.display.setCursor(70, 100);
  carrier.display.setTextColor(ST77XX_WHITE);
  carrier.display.print("Saving data...");
}

void displaySD2() {
  carrier.display.fillScreen(ST77XX_BLACK);
  carrier.display.setCursor(70, 100);
  carrier.display.setTextColor(ST77XX_WHITE);
  carrier.display.print("Saved complete!");
}
void displaySDError() {
  carrier.display.fillScreen(ST77XX_BLACK);
  carrier.display.setCursor(70, 100);
  carrier.display.setTextColor(ST77XX_WHITE);
  carrier.display.print("SD card error");
}
