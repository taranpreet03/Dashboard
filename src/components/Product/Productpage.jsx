import { useEffect, useState } from "react";
import ProductTable from "../Product/ProductTable";
import ProductGrid from "../Product/ProductGrid";

const ProductsPage = ({
  products = [],
  searchText = "",
  filters = {
    brand: [],
    size: [],
    price: 1000,
  },
  viewType = "list",
}) => {
  const filteredProducts = products.filter((item) => {
    const matchSearch =
      !searchText ||
      item.title?.toLowerCase().includes(searchText.toLowerCase());

    const matchBrand =
      filters.brand.length === 0 || filters.brand.includes(item.brand);

    const matchSize =
      filters.size.length === 0 || filters.size.includes(item.size);

    const matchPrice = item.price <= filters.price;

    return matchSearch && matchBrand && matchSize && matchPrice;
  });

  return viewType === "list" ? (
    <ProductTable products={filteredProducts} />
  ) : (
    <ProductGrid products={filteredProducts} />
  );
};

export default ProductsPage;

