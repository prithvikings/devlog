import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./Themetoggle";
import { useAuth } from "../../context/AuthContext";
import { Terminal, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const { user, loading, login } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Features", path: "#features" },
    { name: "Integration", path: "#integrations" },
    { name: "How it works", path: "#demo" },
  ];

  // --- THE "SLOW GLIDE" ENGINE ---
  const smoothScrollTo = (targetId) => {
    const target = document.querySelector(targetId);
    if (!target) return;

    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - 80; // 80px offset for Navbar
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 1500; // Duration in ms (1.5 seconds - change this to make it slower/faster)
    let start = null;

    // Easing function: easeInOutCubic (Starts slow, speeds up, ends slow)
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    }

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  };

  const handleNavigation = (e, path) => {
    e.preventDefault();
    setIsOpen(false);

    // If on home page
    if (location.pathname === "/" || location.pathname === "") {
      smoothScrollTo(path);
    } else {
      // If on another page, go home first, then scroll
      navigate("/");
      setTimeout(() => {
        smoothScrollTo(path);
      }, 100);
    }
  };

  const scrollToTop = () => {
    const startPosition = window.pageYOffset;
    const distance = -startPosition;
    const duration = 1000; // 1 second to go back top
    let start = null;

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    }

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
  };

  if (loading)
    return <div className="p-4 text-sm text-zinc-500">Loading...</div>;
  if (user) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-transparent bg-zinc-100/90 backdrop-blur-md dark:bg-zinc-950/90 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 justify-center z-50 focus:outline-none"
        >
          <Terminal className="w-6 h-6 text-zinc-900 dark:text-white" />
          <h1 className="font-poppins text-xl font-medium text-zinc-900 dark:text-white">
            DevPostGen
          </h1>
        </button>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-6 items-center justify-center text-sm font-poppins">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => handleNavigation(e, link.path)}
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200 text-xs cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 items-center">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <button
            onClick={login}
            className="
    group relative overflow-hidden rounded-md px-4 py-2 
    text-xs font-medium transition-all duration-200 ease-out
    
    /* LIGHT MODE: Deep Zinc Background + Subtle Border */
    bg-zinc-900 text-zinc-50 border border-zinc-800
    hover:bg-zinc-800 hover:border-zinc-700
    
    /* DARK MODE: White Background + Inverse Text */
    dark:bg-zinc-50 dark:text-zinc-900 dark:border-white
    dark:hover:bg-zinc-200
    
    /* THE SECRET SAUCE: Inner Highlights (The 'Linear' Look) */
    /* This adds a 1px white shine at the top inside the button */
    shadow-[0px_1px_0px_0px_rgba(255,255,255,0.15)_inset,0px_-1px_0px_0px_rgba(0,0,0,0.2)_inset]
    dark:shadow-[0px_-1px_0px_0px_rgba(0,0,0,0.1)_inset]

    /* INTERACTION: Tactile Press */
    active:scale-95 active:shadow-none
    cursor-pointer
  "
          >
            <span className="relative z-10">Get started</span>
          </button>

          {/* MOBILE TOGGLE */}
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

      {/* MOBILE MENU */}
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
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavigation(e, link.path)}
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white block cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-zinc-200 dark:border-white/10" />
              <button
                onClick={login}
                className="w-full font-medium px-4 py-3 text-sm rounded-md bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
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
