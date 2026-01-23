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

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { theme } = useTheme();

  return (
    <aside
      className={` group fixed top-0 left-0 z-50 h-screen
  flex flex-col
  w-60 transition-all duration-300

  ${isOpen ? "translate-x-0" : "-translate-x-full"}

  lg:translate-x-0
  lg:w-20 lg:hover:w-60

 

  ${
    theme === "dark"
      ? "bg-gradient-to-b from-[#10225F] via-[#172E7A] to-[#0B1843]"
      : "bg-[#0B1843]"
  }
`}
    >
      {/* LOGO + Close Button */}
      <div className="h-20 flex items-center justify-between px-3">
        <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-white text-xl"
        >
          ✕
        </button>
      </div>

      <nav className="flex-1 px-2 py-6 flex flex-col gap-2">
  {/* HOME */}
  <NavLink
    to="/"
    onClick={() => setIsOpen(false)}
    className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 cursor-pointer group"
  >
    <img src={homeIcon} alt="Home" className="h-6 w-6" />

    <span className="md:inline lg:hidden lg:group-hover:inline text-white whitespace-nowrap">
      Home
    </span>
  </NavLink>

  {/* PRODUCTS */}
  <NavLink
    to="/products"
    onClick={() => setIsOpen(false)}
    className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 cursor-pointer group"
  >
    <FaBoxOpen className="text-white text-xl" />

    <span className="md:inline lg:hidden lg:group-hover:inline text-white whitespace-nowrap">
      Products
    </span>
  </NavLink>

  {/* CART */}
  <NavLink
    to="/carts"
    onClick={() => setIsOpen(false)}
    className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 cursor-pointer group"
  >
    <FaShoppingCart className="text-white text-xl" />

    <span className="md:inline lg:hidden lg:group-hover:inline text-white whitespace-nowrap">
      Cart
    </span>
  </NavLink>

  {/* POSTS */}
  <NavLink
    to="/posts"
    onClick={() => setIsOpen(false)}
    className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 cursor-pointer group"
  >
    <FaRegFileAlt className="text-white text-xl" />

    <span className="md:inline lg:hidden lg:group-hover:inline text-white whitespace-nowrap">
      Posts
    </span>
  </NavLink>

  {/* ALBUMS */}
  <NavLink
    to="/album"
    onClick={() => setIsOpen(false)}
    className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 cursor-pointer group"
  >
    <FaImages className="text-white text-xl" />

    <span className="md:inline lg:hidden lg:group-hover:inline text-white whitespace-nowrap">
      Albums
    </span>
  </NavLink>
</nav>

    </aside>
  );
};

export default Sidebar;
