import {FaBolt,FaBook,FaRoute,FaSearch,FaMoon,FaSun,} from "react-icons/fa";
import Bell from "../assets/Images/bell.gif";
import Button from "../Core/Button";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`w-full px-6 py-3 border-b ${
        theme === "dark"
          ? "bg-gradient-to-br from-[#0B1626] to-[#1E3557]  text-white border-white/20"
          : "bg-white text-[#3A4752] border-[#F2F4F7]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3"></div>

        <div className="flex items-center gap-3">
          {/* ACTION BUTTONS  */}
          <Button icon={FaBolt} text="Quick Actions" />
          <Button icon={FaBook} text="User Manual" />
          <Button icon={FaRoute} text="Usage Tour" />

          {/* SEARCH */}
          <FaSearch className="h-5 w-5 cursor-pointer text-gray-500" />

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition ${
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "text-gray-800 hover:bg-black/10"
            }`}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* NOTIFICATION */}
          <img src={Bell} alt="Notification" className="h-6 w-6 " />

          {/* USER (moved left) */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-semibold">
              T
            </div>
            <div className="leading-tight">
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
