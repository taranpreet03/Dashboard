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
      !filters?.brand?.length || filters.brand.includes(item.brand);

    const matchSize =
      !filters?.size?.length || filters.size.includes(item.size);

    const matchPrice = item.price <= (filters?.price ?? 1000);

    return matchSearch && matchBrand && matchSize && matchPrice;
  });

  return viewType === "list" ? (
    <ProductTable products={filteredProducts} />
  ) : (
    <ProductGrid products={filteredProducts} />
  );
};

export default ProductsPage;
