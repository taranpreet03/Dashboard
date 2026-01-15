import homeIcon from "../assets/Images/Home1.svg";
import logo from "../assets/Images/OM1_Logo.svg";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import {
  FaBoxOpen,
  FaRegFileAlt,
  FaImages,
  FaShoppingCart,
} from "react-icons/fa";

const Sidebar = () => {
  const { theme } = useTheme();

  return (
    <aside
  className={`group fixed top-0 left-0 h-screen w-20 hover:w-60 transition-all duration-300 flex flex-col
    ${
      theme === "dark"
        ? "bg-gray-700"
        : "bg-[#0B1843]"
    }
  `}
>

      {/* LOGO */}
      <div className="h-20 flex items-center pl-2">
        <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
      </div>

      <nav className="flex-1 px-2 py-6 flex flex-col gap-2">
        <NavLink
          to="/"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 cursor-pointer"
        >
          <img src={homeIcon} alt="Home" className="h-6 w-6" />
          <span className="hidden group-hover:inline text-white">Home</span>
        </NavLink>

        <NavLink
          to="/products"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 cursor-pointer"
        >
          <FaBoxOpen className="text-white text-xl" />
          <span className="hidden group-hover:inline text-white">Products</span>
        </NavLink>

        <NavLink
          to="/posts"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 cursor-pointer"
        >
          <FaRegFileAlt className="text-white text-xl" />
          <span className="hidden group-hover:inline text-white">Posts</span>
        </NavLink>

        <NavLink
          to="/album"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 cursor-pointer"
        >
          <FaImages className="text-white text-xl" />
          <span className="hidden group-hover:inline text-white">Albums</span>
        </NavLink>

        <NavLink
          to="/carts"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 cursor-pointer"
        >
          <FaShoppingCart className="text-white text-xl" />
          <span className="hidden group-hover:inline text-white">Cart</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
