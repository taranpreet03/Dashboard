import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productApi";
import ProductTable from "../components/Product/ProductTable";
import ProductGrid from "../components/Product/ProductGrid";
import CartsGrid from "../components/Carts/CartGrid";
import filterIcon from "../assets/Images/Vector.svg";
import FilterPop from "../components/Filterpopup";
import SearchInput from "../Core/Search";
import Button from "../Core/Button";
import CartsTable from "../components/Carts/CartsTable";

import { fetchCarts } from "../services/CartsApi";
import { FaList, FaThLarge } from "react-icons/fa";

const Products = () => {
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
    <div className="h-screen overflow-hidden text-[#3A4752] mr-5">
      <div className="flex items-center gap-3 mb-4 bg-white p-4 border border-[#F2F4F7] rounded-md">
        {/* Filter */}
        <div
          className="flex items-center justify-center w-10 h-10 cursor-pointer"
          onClick={() => setShowFilter(true)}
        >
          <img src={filterIcon} alt="Filter Icon" className="w-5 h-5" />
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
          className="w-80"
        />

        {/* Tabs */}
        <Button
          text="Products"
          onClick={() => setActiveTab("products")}
          className={
            activeTab === "products"
              ? "bg-[#0B1843] text-white"
              : "bg-[#F2F4F7]"
          }
        />
        <Button
          text="Carts"
          onClick={() => setActiveTab("carts")}
          className={
            activeTab === "carts" ? "bg-[#0B1843] text-white" : "bg-[#F2F4F7]"
          }
        />

        <div className="flex gap-1 ml-auto rounded-md p-1">
          <button
            onClick={() => setViewType("list")}
            className={`p-2 rounded ${
              viewType === "list" ? "bg-gray-200 text-black" : "text-gray-500"
            }`}
          >
            <FaList />
          </button>

          <button
            onClick={() => setViewType("grid")}
            className={`p-2 rounded ${
              viewType === "grid" ? "bg-gray-200 text-black" : "text-gray-500"
            }`}
          >
            <FaThLarge />
          </button>
        </div>
      </div>

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
