import { useState } from "react";
import { FaList, FaThLarge } from "react-icons/fa";
import filterIcon from "../assets/Images/Vector.svg";
import FilterPop from "../components/Filterpopup";
import SearchInput from "../Core/Search";
import ProductsPage from "./Product/Productpage";
import CartsPage from "./Carts/Cartpage";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const { theme } = useTheme();

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
      className={`h-screen rounded overflow-hidden ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-[#3A4752]"
      }`}
    >
      {/* TOP BAR */}
      <div className="flex items-center gap-3 p-2 mb-4 ">

        {/* FILTER */}
        <button
          onClick={() => setShowFilter(true)}
          className={`p-2 rounded border ${
            theme === "dark"
              ? "bg-gray-800 border-white/20"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <img src={filterIcon} className="w-4 h-4" />
        </button>

        {/* SEARCH */}
        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={`Search by ${activeTab}...`}
          className={`w-80 h-10 px-2 rounded-lg ${
            theme === "dark"
              ? "bg-gray-800 text-white border-white/10"
              : "bg-white border-gray-200"
          }`}
        />

        {/* TAB SELECT */}
      <select
  value={activeTab}
  onChange={(e) => setActiveTab(e.target.value)}
  className={`
    ml-auto px-6 py-2 rounded-md text-sm
    bg-gray-50 text-[#3A4752]
    border border-gray-200
    outline-none focus:outline-none focus:ring-0
    hover:bg-gray-100
  `}
>
  <option value="products">Products</option>
  <option value="carts">Carts</option>

</select>


        {/* VIEW TOGGLE */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewType("list")}
            className={viewType === "list" ? "text-black-600" : ""}
          >
            <FaList />
          </button>

          <button
            onClick={() => setViewType("grid")}
            className={viewType === "grid" ? "text-black-600" : ""}
          >
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

      {activeTab === "carts" && (
        <CartsPage
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

export default Dashboard;
