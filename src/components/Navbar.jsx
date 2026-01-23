import {
  FaBolt,
  FaBook,
  FaRoute,
  FaSearch,
  FaMoon,
  FaSun,
  FaBars,
} from "react-icons/fa";

import Bell from "../assets/Images/bell.gif";
import Button from "../Core/Button";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const navBg =
    theme === "dark"
      ? "bg-gradient-to-br from-[#0B1626] to-[#1E3557] text-white border-white/20"
      : "bg-white text-[#3A4752] border-[#F2F4F7]";

  return (
    <nav className={`border-b ${navBg} w-full`}>
  <div className="flex items-center justify-between px-2 sm:px-6 py-4 w-full">

    {/* Mobile + Tablet */}
    <div className="flex items-center gap-4 w-full lg:hidden">
      <FaBars className="h-5 w-5 cursor-pointer" />
      <img src={Bell} alt="Notification" className="h-6 w-6 ml-auto" />
    </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-3 ml-auto">

          <Button icon={FaBolt} text="Quick Actions" />
          <Button icon={FaBook} text="User Manual" />
          <Button icon={FaRoute} text="Usage Tour" />

          <FaSearch className="h-5 w-5 cursor-pointer text-gray-500" />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/10 dark:bg-white dark:text-black"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <img src={Bell} alt="Notification" className="h-6 w-6" />

          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-red-500 grid place-items-center text-white text-sm font-semibold">
              T
            </div>

            <div>
              <p className="text-sm font-medium">Taranpreet Kaur</p>
              <p className="text-[10px] text-gray-500">Frontend engineer</p>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
