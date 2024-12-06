import React from "react";
import { motion } from "framer-motion";
import { FaWifi } from "react-icons/fa";

const Header = () => {
  return (
    <nav className="navbar bg-neutral text-neutral-content px-4">
      <div className="flex-1">
        <motion.a
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-2xl font-bold text-accent hover:text-secondary flex items-center gap-2"
        >
          <FaWifi className="text-3xl" />
          CyberAttendance
        </motion.a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a href="/" className="hover:text-secondary">
              Home
            </a>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a href="/admin" className="hover:text-secondary">
              Admin
            </a>
          </motion.li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
