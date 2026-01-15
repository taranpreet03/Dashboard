import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productApi";
import ProductTable from "../../components/Product/ProductTable";
import ProductGrid from "../../components/Product/ProductGrid";
import CartsGrid from "../../components/Carts/CartGrid";
import filterIcon from "../../assets/Images/Vector.svg";
import FilterPop from "../../components/Filterpopup";
import SearchInput from "../../Core/Search";
import Button from "../../Core/Button";
import CartsTable from "../../components/Carts/CartsTable";
import { fetchCarts } from "../../services/CartsApi";
import { FaList, FaThLarge } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";



const Products = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [viewType, setViewType] = useState("list");

  const [filters, setFilters] = useState({
    brand: [],
    size: [],
    price: 1000,
    cartId: [],
    quantity: 0,
  });

const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setProducts(await fetchProducts());
      setCarts(await fetchCarts());
    };
    getData();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchBrand =
      filters.brand.length === 0 || filters.brand.includes(item.brand);
    const matchSize =
      filters.size.length === 0 ||
      item.size?.some((s) => filters.size.includes(s));
    const matchPrice = item.price <= filters.price;

    return matchSearch && matchBrand && matchSize && matchPrice;
  });

  const filteredCarts = carts.filter((cart) => {
    const matchSearch = cart.id.toString().includes(searchText.toLowerCase());
    const matchCartId =
      filters.cartId.length === 0 || filters.cartId.includes(cart.id);
    const matchQuantity = cart.totalQuantity >= filters.quantity;

    return matchSearch && matchCartId && matchQuantity;
  });

  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <div
      className={`h-screen overflow-hidden ml-9  rounded  ${
        theme === "dark" ? "bg-[#1B211A] text-white" : "bg-white text-[#3A4752]"
      }`}
    >
      {/* TOP BAR */}
      <div
        className={`flex items-center gap-3  mt-1 mb-4 p-2    ${
          theme === "dark"
            ? "bg-[#1B211A] border-white/20"
            : "bg-white border-[#F2F4F7]"
        }`}
      >
        {/* Filter */}
       <div
  onClick={() => setShowFilter(true)}
  className={`p-2 rounded ml-1 cursor-pointer flex border border-gray-300 bg-gray-100 items-center justify-center ${
    showFilter
      ? theme === "dark"
        ? "bg-white text-black"
        : "bg-gray-200 text-black"
      : theme === "dark"
      ? "bg-[#1B211A] text-white/80 border border-white/20"
      : "text-gray-800"
  }`}
>
  <img src={filterIcon} alt="Filter Icon" className="w-4 h-4" />
</div>


        {/* Search */}
    <SearchInput
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  placeholder={
    activeTab === "products"
      ? "Search by product..."
      : "Search by cart..."
  }
  className={`w-80 h-10 px-2 rounded-lg text-sm ${
    theme === "dark"
      ? "bg-[#1B211A] text-white/80 border border-white/10 placeholder-white/40"
      : "bg-white text-[#3A4752] border border-[#E5E7EB] placeholder-gray-400"
  }`}
/>



        {/* Tabs dropdown */}
        
<select
  value={activeTab}
  onChange={(e) => {
    const value = e.target.value;
    setActiveTab(value);
    navigate(`/${value}`);
  }}
  className={`ml-210 mr-2 pl-2 pr-8 py-1 rounded text-sm cursor-pointer outline-none ${
    theme === "dark"
      ? "bg-[#1B211A] text-white border border-white/10"
      : "bg-white text-[#3A4752] border border-gray-200"
  }`}
>
  <option value="products">Products</option>
  <option value="carts">Carts</option>
  <option value="posts">Posts</option>
  <option value="album">Albums</option>
</select>



        {/* View Toggle */}
        <div className="flex  gap-2 ml-auto  rounded-md p-1">
          <button
            onClick={() => setViewType("list")}
            className={`p-2 rounded ${
              viewType === "list"
                ? theme === "dark"
                  ? "bg-[#1B211A] text-white/80 border border-white/20"
                  : "bg-gray-200 text-black"
                : theme === "dark"
                ? "bg-[#1B211A] text-white/60"
                : "text-gray-500"
            }`}
          >
            <FaList />
          </button>

          <button
            onClick={() => setViewType("grid")}
            className={`p-2 rounded ${
              viewType === "grid"
                ? theme === "dark"
                  ? "bg-white text-black"
                  : "bg-gray-200 text-black"
                : theme === "dark"
                ? "bg-[#1B211A] text-white/80 border border-white/20"
                : "text-gray-500"
            }`}
          >
            <FaThLarge />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {activeTab === "products" &&
        (viewType === "list" ? (
          <ProductTable products={filteredProducts} />
        ) : (
          <ProductGrid products={filteredProducts} />
        ))}

      {activeTab === "carts" &&
        (viewType === "list" ? (
          <CartsTable carts={filteredCarts} />
        ) : (
          <CartsGrid carts={filteredCarts} />
        ))}

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

export default Products;
