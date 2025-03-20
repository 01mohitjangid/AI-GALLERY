"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <motion.h3
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              AI Prompt Gallery
            </motion.h3>
            <p className="text-purple-200">
              Unleash your creativity with AI-powered prompts
            </p>
          </div>
          <div>
            <motion.h4
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Quick Links
            </motion.h4>
            <ul className="space-y-2">
              {[
                { name: "Home", link: "/" },
                { name: "Gallery", link: "/gallery" },
                { name: "details", link: "/EnterDetails" },
                // { name: "About", link: "/about" },
                { name: "Images", link: "/upload-image" }, // Add your custom link here
              ].map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link
                    href={item.link}
                    className="hover:text-purple-200 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <motion.h4
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Connect With Us
            </motion.h4>
            <div className="flex space-x-4">
              {[
                { Icon: Github, link: "https://github.com/01mohitjangid" },
                { Icon: Twitter, link: "https://twitter.com/your-profile" },
                {
                  Icon: Linkedin,
                  link: "https://linkedin.com/in/01mohitjangid",
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <item.Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <motion.div
          className="mt-8 pt-8 border-t border-purple-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-purple-200">
            © {new Date().getFullYear()} AI Prompt Gallery. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
