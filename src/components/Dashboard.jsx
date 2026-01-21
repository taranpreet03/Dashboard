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

  // Fetch carts once
  // useEffect(() => {
  //fetchProducts(searchText).then(setProducts);
  //   fetchCarts().then(setCarts);
  // }, []);

  // search (?q=)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(searchText).then(setProducts);
      fetchCarts(searchText).then(setCarts)
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <div
      className={`h-screen rounded overflow-hidden ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-[#3A4752]"
      }`}
    >
      <div className="flex items-center gap-3 p-2 mb-4">
        <button onClick={() => setShowFilter(true)} className="p-2 rounded ">
          <img src={filterIcon} className="w-4 h-4" />
        </button>

        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={`Search by ${activeTab}...`}
          className="w-80 h-10 px-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-0"
        />

        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="ml-auto px-6 py-2 rounded-md "
        >
          <option value="products">Products</option>
          <option value="carts">Carts</option>
        </select>

        <div className="flex gap-2">
          <button onClick={() => setViewType("list")}>
            <FaList />
          </button>
          <button onClick={() => setViewType("grid")}>
            <FaThLarge />
          </button>
        </div>
      </div>

      {activeTab === "products" && (
        <ProductsPage
          products={products}
          filters={filters}
          viewType={viewType}
        />
      )}

      {activeTab === "carts" && (
        <CartsPage carts={carts} filters={filters} viewType={viewType} />
      )}

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
