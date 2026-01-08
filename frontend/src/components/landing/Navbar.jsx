import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ThemeToggle } from "./Themetoggle";

import { CodeXmlIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="max-w-6xl mx-auto  px-4 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2 justify-center">
        <CodeXmlIcon className="w-6 h-6" />
        <h1 className="font-poppins text-xl font-medium">DevPostGen</h1>
      </div>
      <div className="flex gap-4 items-center justify-center text-xs font-poppins">
        <Link
          className="hover:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300"
          to="/"
        >
          Features
        </Link>
        <Link
          className="hover:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300"
          to="/about"
        >
          Integration
        </Link>
        <Link
          className="hover:text-zinc-400 dark:hover:text-zinc-300 transition-all duration-300"
          to="/contact"
        >
          DevMsg
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <button
          className="
  font-medium px-2 py-1.5 text-xs rounded-sm
  bg-zinc-900 text-white
  dark:bg-zinc-200 dark:text-black
"
        >
          Get started
        </button>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
