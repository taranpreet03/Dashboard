import { useState } from "react";
import { FaList, FaThLarge } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import filterIcon from "../../assets/Images/Vector.svg";
import FilterPop from "../../components/Filterpopup";
import SearchInput from "../../Core/Search";
import ProductsPage from "./Productpage";
import { useTheme } from "../../context/ThemeContext";

const Layout = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("products");
  const [viewType, setViewType] = useState("list");
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    brand: [],
    size: [],
    price: 1000,
    cartId: [],
    quantity: 0,
  });

  return (
    <div
      className={`h-screen  rounded overflow-hidden ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-[#3A4752]"
      }`}
    >
      {/* TOP BAR */}
      <div className="flex items-center gap-3 p-2 mb-4">
        {/* FILTER */}
        <div
          onClick={() => setShowFilter(true)}
          className={`p-2 rounded cursor-pointer border ${
            theme === "dark"
              ? "bg-gray-800 border-white/20"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <img src={filterIcon} className="w-4 h-4" />
        </div>

        {/* SEARCH */}
        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={`Search by ${activeTab}...`}
          className={` w-80 h-10 px-2 rounded-lg ${
            theme === "dark"
              ? "bg-gray-800 text-white border-white/10"
              : "bg-white border-gray-200"
          }`}
        />

        {/* VIEW TOGGLE */}
        <div className="flex gap-2 ml-auto">
          <button onClick={() => setViewType("list")} className="p-2">
            <FaList />
          </button>
          <button onClick={() => setViewType("grid")} className="p-2">
            <FaThLarge />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {activeTab === "products" && (
        <ProductsPage
          searchText={searchText}
          filters={filters}
          viewType={viewType}
        />
      )}

      {/* FILTER POPUP */}
      <FilterPop
        show={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
        activeTab={activeTab}
      />
    </div>
  );
};

export default Layout;
