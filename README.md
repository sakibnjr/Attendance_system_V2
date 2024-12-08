# Biometric and IoT-Based Attendance System 🚀

This project is an innovative and efficient biometric attendance system integrated with IoT technology, designed to streamline attendance management and enhance security. By leveraging biometric authentication, IoT hardware, and real-time data processing, this system ensures accuracy and convenience for users and administrators.

## Features ✨

- **Biometric Authentication:** Ensures secure and accurate identity verification.
- **Real-Time Attendance Tracking:** Updates attendance instantly via IoT devices.
- **User-Friendly Interface:** Modern UI for managing students, attendance, and networks.
- **Data Visualization:** Presents insightful statistics on attendance records.
- **Customizable Hardware Enclosure:** Professionally designed enclosure for IoT components.

## Project Structure 🏗️

### Frontend
- **React.js**: For building a dynamic and interactive user interface.
- **Key Components**:
  - **LoginForm.jsx:** User authentication with biometric verification.
  - **RegisterPage.jsx:** User registration with biometric setup.
  - **Dashboard.jsx:** Overview of attendance, statistics, and user details.

### Backend
- **Node.js & Express.js**: Backend APIs for managing data.
- **MongoDB**: Database for storing users, attendance, and scanned networks.
- **Endpoints**:
  - `/students`: Add, update, and manage student records.
  - `/attendance`: Record and fetch attendance details.
  - `/scan`: Handle biometric authentication and IoT device inputs.

### IoT Integration
- **NodeMCU & Sensors:** Collect MAC addresses and biometric data.
- **Real-Time Sync:** Communicates with the backend for seamless updates.

## Hardware Setup ⚙️
- **Components**:
  - NodeMCU
  - Fingerprint Sensor
  - OLED/LED Display
  - Breadboard and Jump Wires
- **Enclosure Design**: Neatly organized hardware in a custom 3D-printed box.

## Prerequisites 🛠️
- **Software**:
  - Node.js
  - MongoDB
  - React.js
- **Hardware**:
  - IoT components listed above.

## How to Run 🚀
1. Clone the repository:
   ```bash
   git clone https://github.com/sakibnjr/Attendance_system_V2.git
   ```
2. Install dependencies:
   ```bash
   cd biometric-attendance-system
   npm install
   ```
3. Start the backend server:
   ```bash
   cd server
   node index.js
   ```
4. Start the frontend:
   ```bash
   cd client
   npm start
   ```
5. Deploy IoT hardware and connect it to the backend.

## Acknowledgements 🙏
Special thanks to:
- **Instructor:** [N/A] for guidance and mentorship.
- **Contributors:** Team members and collaborators for their hard work.

## License 📄
This project is licensed under the MIT License.

---
