import { useState, useEffect } from "react";
import { FaList, FaThLarge } from "react-icons/fa";
import filterIcon from "../../assets/Images/Vector.svg";
import FilterPop from "../../components/Filterpopup";
import SearchInput from "../../Core/Search";
import ProductsPage from "./Productpage";
import { useTheme } from "../../context/ThemeContext";
import { fetchProducts } from "../../services/productApi";

const Layout = () => {
  const { theme } = useTheme();

  const [searchText, setSearchText] = useState("");
  const [viewType, setViewType] = useState("list");
  const [showFilter, setShowFilter] = useState(false);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState({
    brand: [],
    category: [],
    price: 5000,
  });

 
  useEffect(() => {
    const loadMeta = async () => {
      const data = await fetchProducts({ page: 1, limit: 100 });

      const all = data.products || [];

      const uniqueBrands = [...new Set(all.map((p) => p.brand))];
      const uniqueCategories = [...new Set(all.map((p) => p.category))];

      setBrands(uniqueBrands);
      setCategories(uniqueCategories);
    };

    loadMeta();
  }, []);

  return (
    <div
      className={`h-screen  overflow-hidden ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-[#3A4752]"
      }`}
    >
      {/* TOP BAR */}
      <div className="flex items-center gap-3 p-2 mb-4">

        <div
          onClick={() => setShowFilter(true)}
          className="p-2 border border-gray-200 rounded cursor-pointer"
        >
          <img src={filterIcon} className="w-4 h-4" />
        </div>

        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search products..."
          className="w-full sm:w-80 h-10 rounded-lg border border-gray-200"
        />

        <div className="hidden lg:flex gap-2 ml-auto">

          <button onClick={() => setViewType("list")} className="p-2 border border-gray-200 rounded cursor-pointer">
            <FaList />
          </button>

          <button onClick={() => setViewType("grid")} className="p-2 border border-gray-200 rounded cursor-pointer">
            <FaThLarge />
          </button>

        </div>
      </div>

      <ProductsPage
        viewType={viewType}
        searchText={searchText}
        filters={filters}
      />

      <FilterPop
        show={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
        brands={brands}
        categories={categories}
      />
    </div>
  );
};

export default Layout;
