import homeIcon from "../assets/Images/Home1.svg";
import logo from "../assets/Images/OM1_Logo.svg";

const Sidebar = () => {
  return (
    <aside className="group fixed top-0 left-0 h-screen w-20 bg-[#0B1843] flex flex-col 
                     w-16 hover:w-60 transition-all duration-300 ">
      <div className="h-20 flex items-center pl-2  ">
        <img src={logo} alt=" Logo" className="h-12 w-auto object-contain" />
      </div>

      {/* MENU */}
      <nav className="flex-1 px-2 py-6 flex flex-col gap-2">
        <div className="group flex items-center  gap-3 p-3  ">
          <img src={homeIcon} alt="Home" className="h-6 w-6" />
          <span className="hidden group-hover:inline text-white">Home</span>
        </div>
        {/* Add more menu items the same way */}
      </nav>
    </aside>
  );
};

export default Sidebar;
