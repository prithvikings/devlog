import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ThemeToggle } from "./Themetoggle";
import { useAuth } from "../../context/AuthContext";
import { CodeXmlIcon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const { user, loading, login } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Define links in an array to map them easily for both Desktop and Mobile views
  const navLinks = [
    { name: "Features", path: "/" },
    { name: "Integration", path: "/about" },
    { name: "DevMsg", path: "/contact" },
  ];

  if (loading) {
    return <div className="p-4 text-sm text-zinc-500">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    // Added sticky positioning and backdrop blur for a modern feel
    <nav className="sticky top-0 z-50 w-full border-b border-transparent bg-zinc-100/80 backdrop-blur-md dark:bg-zinc-950/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <div className="flex items-center gap-2 justify-center z-50">
          <CodeXmlIcon className="w-6 h-6 text-zinc-900 dark:text-white" />
          <h1 className="font-poppins text-xl font-medium text-zinc-900 dark:text-white">
            DevPostGen
          </h1>
        </div>

        {/* DESKTOP LINKS (Hidden on mobile) */}
        <div className="hidden md:flex gap-6 items-center justify-center text-sm font-poppins">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200 text-xs"
              to={link.path}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* DESKTOP ACTIONS & MOBILE TOGGLES */}
        <div className="flex gap-3 items-center">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <button
            onClick={login}
            className="
              hidden md:block
              font-medium px-4 py-2 text-xs rounded-md transition-colors
              bg-zinc-900 text-white hover:bg-zinc-800
              dark:bg-white dark:text-black dark:hover:bg-zinc-200
            "
          >
            Get started
          </button>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-zinc-800 dark:text-zinc-200"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-zinc-950 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4 font-poppins">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white block"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-zinc-200 dark:border-white/10" />
              <button
                onClick={login}
                className="
                  w-full font-medium px-4 py-3 text-sm rounded-md
                  bg-zinc-900 text-white hover:bg-zinc-800
                  dark:bg-white dark:text-black dark:hover:bg-zinc-200
                "
              >
                Get started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
