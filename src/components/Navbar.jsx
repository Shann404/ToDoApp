import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import Button from "./Button";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* App title */}
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
          Task Manager
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/tasks"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Tasks
          </Link>
          <Link
            to="/api"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            API
          </Link>

          {/* Theme Toggle Button */}
          <Button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:scale-110 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
