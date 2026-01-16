import { useEffect, useState } from "react";
import ProductTable from "../Product/ProductTable";
import ProductGrid from "../Product/ProductGrid";
import { fetchProducts } from "../../services/productApi";

const ProductsPage = ({ searchText, filters, viewType }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchBrand =
      filters.brand.length === 0 || filters.brand.includes(item.brand);
    const matchPrice = item.price <= filters.price;

    return matchSearch && matchBrand && matchPrice;
  });

  return viewType === "list" ? (
    <ProductTable products={filteredProducts} />
  ) : (
    <ProductGrid products={filteredProducts} />
  );
};

export default ProductsPage;
