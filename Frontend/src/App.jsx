import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { StudentProvider } from "./contexts/StudentContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  const url = "https://sas-server-0g5o.onrender.com";
  //const url = "http://localhost:3000";

  return (
    <StudentProvider url={url}>
      <Router>
        {/* Hot Toast Container */}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin url={url} />} />
        </Routes>
      </Router>
    </StudentProvider>
  );
};

export default App;
