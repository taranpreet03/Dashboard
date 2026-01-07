import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productApi";
import ProductTable from "../components/Product/ProductTable";
//import { FaSearch } from "react-icons/fa";
import filterIcon from "../assets/Images/Vector.svg";
import FilterPop from "../components/Filterpopup";
import SearchInput from "../Core/Search";
import Button from "../Core/Button";
import CategoryTable from "../components/Categories/CategoriesTable";
import { fetchCategories } from "../services/categoriesApi";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showFilter, setShowFilter] = useState(false);
const [categories, setCategories] = useState([]);
const [activeTab, setActiveTab] = useState("products");

//Product
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    size: [],
    price: 1000,
    parentId: [],
    name: [],
  });

//Fetching
 useEffect(() => {
    const getProducts = async () => setProducts(await fetchProducts());
    const getCategories = async () => setCategories(await fetchCategories());
    getProducts();
    getCategories();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = filters.category.length === 0 || filters.category.includes(item.category);
    const matchBrand = filters.brand.length === 0 || filters.brand.includes(item.brand);
    const matchSize = filters.size.length === 0 || item.size?.some((s) => filters.size.includes(s));
    const matchPrice = item.price <= filters.price;
    return matchSearch && matchCategory && matchBrand && matchSize && matchPrice;
  });

  const filteredCategories = categories.filter((cat) => {
    const matchSearch = cat.name.toLowerCase().includes(searchText.toLowerCase());
    const matchParent = filters.parentId.length === 0 || filters.parentId.includes(cat.parentId);
    const matchName = filters.name.length === 0 || filters.name.includes(cat.name);
    return matchSearch && matchParent && matchName;
  });
  

  const brands = [...new Set(products.map((p) => p.brand))];

return (
    <div className="h-screen overflow-auto text-[#3A4752]">
      <div className="flex items-center gap-3 mb-4 bg-white p-4 border border-[#F2F4F7] rounded-md">
        <div
          className="flex items-center justify-center w-10 h-10 cursor-pointer"
          onClick={() => setShowFilter(true)}
        >
          <img src={filterIcon} alt="Filter Icon" className="w-5 h-5" />
        </div>

        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={activeTab === "products" ? "Search by product..." : "Search by category..."}
          className="w-80 "
        />

        <Button
          text="Products"
          onClick={() => setActiveTab("products")}
          className={activeTab === "products" ? "bg-[#0B1843] text-white" : "bg-[#F2F4F7] text-[#3A4752]"}
        />
        <Button
          text="Categories"
          onClick={() => setActiveTab("categories")}
          className={activeTab === "categories" ? "bg-[#0B1843] text-white" : "bg-[#F2F4F7] text-[#3A4752]"}
        />
      </div>

      {/* Table */}
      {activeTab === "products" && <ProductTable products={filteredProducts} />}
      {activeTab === "categories" && <CategoryTable categories={filteredCategories} />}

      {/* FILTER POPUP */}
      <FilterPop
        show={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
        brands={brands}
        activeTab={activeTab} 
        categories={categories} 
      />
    </div>
  );
};

export default Products;
