import { useEffect, useState, useMemo } from "react";
import { FaList, FaThLarge } from "react-icons/fa";
import filterIcon from "../../assets/Images/Vector.svg";
import FilterPop from "../../components/Filterpopup";
import SearchInput from "../../Core/Search";
import ProductsPage from "./Productpage";
import { useTheme } from "../../context/ThemeContext";
// import { fetchProducts } from "../../services/productApi";

const Layout = () => {
  const { theme } = useTheme();

  const [searchText, setSearchText] = useState("");
  const [viewType, setViewType] = useState("list");
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState({
    key: "",
    order: "asc",
  });

    // Fetch carts once
  // useEffect(() => {
  //fetchProducts(searchText).then(setProducts);
  //   fetchCarts().then(setCarts);
  // }, []);

  

  const [filters, setFilters] = useState({
    brand: [],
    size: [],
    price: 1000,
    cartId: [],
    quantity: 0,
  });

  // search (?q=) SORT
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts({
        searchText,
        sortKey: sort.key,
        sortOrder: sort.order,
      }).then(setProducts);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, sort]);

  // CLIENT FILTER 
  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.price <= filters.price);
  }, [products, filters.price]);

  return (
    <div
      className={`h-screen rounded overflow-hidden ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-[#3A4752]"
      }`}
    >
      {/* TOP BAR */}
      <div className="flex items-center gap-3 p-2 mb-4">
        <div
          onClick={() => setShowFilter(true)}
          className="p-2 rounded cursor-pointer border border-gray-200"
        >
          <img src={filterIcon} className="w-4 h-4" />
        </div>

        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search products..."
          className="w-80 h-10 px-2 rounded-lg border border-gray-300 focus:ring-0 focus:outline-none"
        />

        <div className="flex gap-2 ml-auto">
          <button onClick={() => setViewType("list")} className="p-2">
            <FaList />
          </button>
          <button onClick={() => setViewType("grid")} className="p-2">
            <FaThLarge />
          </button>
        </div>
      </div>

      <ProductsPage
        products={filteredProducts}
        filters={filters}
        viewType={viewType}
        sort={sort}
        setSort={setSort}
      />

      <FilterPop
        show={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default Layout;
