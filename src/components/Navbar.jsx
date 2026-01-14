import { FaBolt, FaBook, FaRoute, FaSearch } from "react-icons/fa";
import Bell from "../assets/Images/bell.gif";
import Button from "../Core/Button";
const Navbar = () => {
  return (
    <nav className="pl-12 w-full px-6 py-3 bg-white text-[#3A4752] border border-[#F2F4F7] ">
      {/* RIGHT */}
      <div className="flex justify-left gap-180 ">
        <div className="flex items-center gap-3">
          <Button icon={FaBolt} text="Quick Actions" />
          <Button icon={FaBook} text="User Manual" />
          <Button icon={FaRoute} text="Usage Tour" />
        </div>
        {/* Left */}
        <div className="flex  gap-3">
          <FaSearch className="h-5 w-5 text-gray-500 cursor-pointer h" />
          <img
            src={Bell}
            alt="Notification"
            className="h-6 w-6 transition-transform duration-300 group-hover:scale-125"
          />

          <p className="text-xs text-gray-500">CREATE_USER</p>
        </div>{" "}
      </div>
    </nav>
  );
};

export default Navbar;