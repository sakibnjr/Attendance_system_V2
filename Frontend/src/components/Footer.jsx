import React from "react";
import { motion } from "framer-motion";
import { FaWifi } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      {/* Main Footer Content */}
      <div className="footer p-10">
        <motion.div
          className="flex flex-col md:flex-row justify-between w-full items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold text-accent flex items-center gap-2">
              <FaWifi className="text-3xl" />
              CyberAttendance
            </h2>
            <p className="text-sm text-center md:text-left">
              Smart and futuristic attendance management system powered by
              device scanning technology.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-lg font-semibold text-secondary">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="/" className="hover:text-accent">
                  Home
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-accent">
                  Admin
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-accent">
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-lg font-semibold text-secondary">Contact Us</h3>
            <p className="text-sm">
              <span className="font-bold">Email:</span> sakibnjr@proton.me
            </p>
            <p className="text-sm">
              <span className="font-bold">Phone:</span> +88 (018) 7616-6546
            </p>
          </div>
        </motion.div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-neutral-focus py-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CyberAttendance. All Rights
            Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
