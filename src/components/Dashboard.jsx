import { useEffect, useState } from "react";
import { FaList, FaThLarge } from "react-icons/fa";
import filterIcon from "../assets/Images/Vector.svg";
import FilterPop from "../components/Filterpopup";
import SearchInput from "../Core/Search";
import ProductsPage from "./Product/Productpage";
import CartsPage from "./Carts/Cartpage";
import { useTheme } from "../context/ThemeContext";
import { fetchProducts } from "../services/productApi";
import { fetchCarts } from "../services/CartsApi";

const Dashboard = () => {
  const { theme } = useTheme();

  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("products");
  const [viewType, setViewType] = useState("list");
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  const [filters, setFilters] = useState({
    brand: [],
    size: [],
    price: 1000,
    cartId: [],
    quantity: 0,
  });

  // fetch once
  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchCarts().then(setCarts);
  }, []);

  // derive brands
  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <div
      className={`h-screen rounded overflow-hidden ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-[#3A4752]"
      }`}
    >
      {/* TOP BAR */}
      <div className="flex items-center gap-3 p-2 mb-4">
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

        {/* TAB */}
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className={`ml-auto px-6 py-2 rounded-md text-sm border outline-none transition-colors ${
            theme === "dark"
              ? "bg-gray-800 text-white border-white/20"
              : "bg-gray-50 text-black border-gray-200"
          }`}
        >
          <option value="products">Products</option>
          <option value="carts">Carts</option>
        </select>

        {/* VIEW TOGGLE */}
        <div className="flex gap-2">
  <button
    onClick={() => setViewType("list")}
    className={`p-2 rounded border transition-colors ${
      theme === "dark"
        ? "bg-gray-800 border-white/20"
        : "bg-gray-100 border-gray-300"
    } ${
      viewType === "list"
        ? "text-blue-600 "
        : theme === "dark"
        ? "text-white bg-black"
        : "text-black"
    }`}
  >
    <FaList />
  </button>

  <button
    onClick={() => setViewType("grid")}
    className={`p-2 rounded border transition-colors ${
      theme === "dark"
        ? "bg-gray-800 border-white/20"
        : "bg-gray-100 border-gray-300"
    } ${
      viewType === "grid"
        ? "text-blue-600"
        : theme === "dark"
        ? "text-white"
        : "text-black"
    }`}
  >
    <FaThLarge />
  </button>
</div>

      </div>

      {/* CONTENT */}
      {activeTab === "products" && (
        <ProductsPage
          products={products}
          searchText={searchText}
          filters={filters}
          viewType={viewType}
        />
      )}

      {activeTab === "carts" && (
        <CartsPage
          carts={carts}
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
        brands={brands}
        carts={carts}
        activeTab={activeTab}
      />
    </div>
  );
};

export default Dashboard;
