# Smart Attendance System 🚀

A modern attendance management system that uses MAC address scanning to automatically track student attendance. This system combines a React frontend with a Node.js backend to provide a seamless and efficient attendance tracking solution.

## Features ✨

- **MAC Address Based Authentication:** Automatically identifies students through their device MAC addresses
- **Real-Time Attendance Tracking:** Instant attendance updates as students connect to the network
- **Network Scanning:** Monitors and logs network connections for attendance verification
- **Student Management:** Easy-to-use interface for managing student records
- **Attendance Analytics:** View attendance statistics and reports
- **Responsive Design:** Works seamlessly on both desktop and mobile devices

## Tech Stack 🛠️

### Frontend

- **React.js** with Vite
- **Context API** for state management
- **Modern UI Components**
- **Real-time data updates**

### Backend

- **Node.js & Express.js**
- **MVC Architecture**
- **MongoDB** for data storage
- **RESTful API Design**

## Project Structure 🏗️

```
Smart Attendance System/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── App.jsx
│   └── index.html
│
└── Backend/
    ├── models/
    │   ├── Student.js
    │   ├── Attendance.js
    │   └── ScannedNetwork.js
    ├── controllers/
    │   ├── studentController.js
    │   ├── attendanceController.js
    │   └── networkController.js
    ├── routes/
    │   ├── studentRoutes.js
    │   ├── attendanceRoutes.js
    │   └── networkRoutes.js
    └── server.js
```

## API Endpoints 📡

### Student Management

- `POST /add-student` - Add a new student
- `GET /students` - Get all students
- `PUT /update-student/:id` - Update student information
- `DELETE /students/:id` - Delete a student

### Attendance

- `GET /attendance` - Get all attendance records
- `POST /attendance` - Mark attendance
- `DELETE /attendance` - Delete all attendance records

### Network Scanning

- `GET /networks` - Get all scanned networks
- `POST /scan` - Handle network scan data
- `DELETE /networks` - Delete all network records

## Prerequisites 🚀

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation and Setup 🛠️

1. Clone the repository:

   ```bash
   git clone https://github.com/sakibnjr/Attendance_system_V2.git
   cd Attendance_system_V2
   ```

2. Set up the Backend:

   ```bash
   cd Backend
   npm install
   # Create a .env file with the following variables:
   # MONGO_URI=your_mongodb_connection_string
   # PORT=your_port_number
   npm start
   ```

3. Set up the Frontend:

   ```bash
   cd Frontend
   npm install
   # Create a .env file with:
   # VITE_API_URL=http://localhost:your_backend_port
   npm run dev
   ```

4. Access the application:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:your_backend_port

## Environment Variables 🔑

### Backend (.env)

```
MONGO_URI=your_mongodb_connection_string
PORT=your_port_number
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:your_backend_port
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their invaluable tools and libraries

---
