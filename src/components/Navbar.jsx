import { FaBolt, FaBook, FaRoute, FaSearch, FaMoon, FaSun } from "react-icons/fa";
import Bell from "../assets/Images/bell.gif";
import Button from "../Core/Button";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`pl-12 w-full px-6 py-3 border ${
        theme === "dark"
          ? "bg-[#1B211A] text-black border-white/20"
          : "bg-white text-[#3A4752] border-[#F2F4F7]"
      }`}
    >
      <div className="flex justify-left gap-180">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <Button icon={FaBolt} text="Quick Actions" />
          <Button icon={FaBook} text="User Manual" />
          <Button icon={FaRoute} text="Usage Tour" />
        </div>

        {/* RIGHT */}
        <div className="flex gap-4 items-center mr-auto">
          <FaSearch
            className={`h-5 w-5 cursor-pointer ${
              theme === "dark" ? "text-white" : "text-gray-500"
            }`}
          />
            {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="ml-1 p-2 rounded-full hover:bg-white/10"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <img
            src={Bell}
            alt="Notification"
            className="h-6 w-6"
          />

          <p
            className={`text-xs ${
              theme === "dark" ? "text-white" : "text-gray-500"
            }`}
          >
            USER
          </p>

          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
