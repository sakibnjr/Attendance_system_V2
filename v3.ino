#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h> 
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Wi-Fi credentials
const char* ssid = "Bhoot 👻"; // Replace with your Wi-Fi SSID
const char* password = "Triple2six4"; // Replace with your Wi-Fi password

// Server URL
const char* serverUrl = "https://sas-server-0g5o.onrender.com/scan";

// Create a client
WiFiClientSecure client;

// Initialize LCD at address 0x27 with 16 columns and 2 rows
LiquidCrystal_I2C lcd(0x27, 16, 2); 

void setup() {
  Serial.begin(115200);

  // Initialize the LCD
  lcd.init();
  lcd.backlight();
  lcd.clear();

   // Display "Welcome" message
  lcd.setCursor(3, 0);  // Position the cursor in the center of the first row
  lcd.print("Welcome");
  delay(2000); 

   // Clear and display "Smart Attendance System" message
  lcd.clear();
  lcd.setCursor(0, 0);  // Set cursor to the first row
  lcd.print("Smart Attendance");
  lcd.setCursor(4, 1);  // Set cursor to the center of the second row
  lcd.print("System");
  delay(3000);  // Keep this message on screen for 3 seconds


  // Clear LCD and show connecting message
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connecting to WiFi");

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  // Clear LCD and show connected message
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connected to WiFi");

  Serial.println("Connected to WiFi");
  delay(2000); // Keep message on screen for 2 seconds
  lcd.clear(); // Clear LCD after message is shown

  client.setInsecure();
}

void loop() {
  int n = WiFi.scanNetworks();
  if (n == 0) {
    // Show no networks found message on LCD
    lcd.setCursor(0, 0);
    lcd.print("No networks found");
    Serial.println("No networks found");
  } else {
    for (int i = 0; i < n; ++i) {
      String ssid = WiFi.SSID(i);
      String bssid = WiFi.BSSIDstr(i);
      Serial.print("Found network: ");
      Serial.print(ssid);
      Serial.print(" (MAC: ");
      Serial.print(bssid);
      Serial.println(")");

      sendMacAddress(bssid);
      delay(10);
    }
    lcd.clear(); // Clear LCD after scanning and sending data
  }
  delay(10000); // Scan every 10 seconds
}

void sendMacAddress(String mac) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    String postData = "mac=" + mac;
    int httpResponseCode = http.POST(postData);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
}
