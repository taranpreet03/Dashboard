import { useEffect, useState, useMemo } from "react";
import ProductTable from "../Product/ProductTable";
import ProductGrid from "../Product/ProductGrid";
import { fetchProducts } from "../../services/productApi";

const itemsPerPage = 10;

const ProductsPage = ({
  viewType = "list",
  searchText,
  filters,
}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  /* FETCH ALL DATA */
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      try {
        const data = await fetchProducts({
          limit: 0, 
         });

        setAllProducts(data.products || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* APPLY FILTERS */
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // SEARCH
    if (searchText) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // BRAND
    if (filters.brand.length) {
      result = result.filter((p) =>
        filters.brand.includes(p.brand)
      );
    }

    // CATEGORY
    if (filters.category.length) {
      result = result.filter((p) =>
        filters.category.includes(p.category)
      );
    }

    // PRICE
    result = result.filter((p) => p.price <= filters.price);

    return result;
  }, [allProducts, searchText, filters]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, filters]);

  /* PAGINATION */
  const total = filteredProducts.length;

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  /* EDIT HANDLER */
  const handleSaveProduct = (updated) => {
  setAllProducts((prev) =>
    prev.map((p) =>
      p.id === updated.id
        ? { ...updated } 
        : { ...p }       
    )
  );
};


  return (
    <div className="h-full">

      {loading && (
        <p className="text-center py-4">Loading...</p>
      )}

      {!loading && (
        <>
          {/* MOBILE */}
          <div className="block lg:hidden">
            <ProductGrid
              products={paginatedProducts}
              total={total}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {/* DESKTOP */}
          <div className="hidden lg:block">
            {viewType === "list" ? (
              <ProductTable
                products={paginatedProducts}
                total={total}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onSaveProduct={handleSaveProduct}
              />
            ) : (
              <ProductGrid
                products={paginatedProducts}
                total={total}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </>
      )}

    </div>
  );
};

export default ProductsPage;
