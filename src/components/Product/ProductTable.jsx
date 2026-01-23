import { useState, useEffect, useCallback } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";
import ProductDetailsModal from "./ProductDetailsModal";
import EditProductModal from "./EditProductModal";
import { FiMoreHorizontal, FiChevronDown } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { fetchProducts } from "../../services/ProductAPI";

const ProductTable = ({ onSaveProduct }) => {
  const { theme } = useTheme();

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // ✅ NEW
  const [loading, setLoading] = useState(false);

  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null);

  const [sort, setSort] = useState({ key: "", direction: "asc" });
  const [openSortKey, setOpenSortKey] = useState(null);

  /* PAGINATION */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  /* FETCH PRODUCTS */
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      try {
        const data = await fetchProducts({
          page: currentPage,
          limit: itemsPerPage,
          sortKey: sort.key,
          sortOrder: sort.direction,
        });

        setProducts(data.products);
        setTotalCount(data.total);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [sort, currentPage]);

  /* SORT */
  const applySort = (key, direction) => {
    setSort({ key, direction });
    setOpenSortKey(null);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  /* SORT DROPDOWN */
  const SortDropdown = ({ sortKey, type }) => (
    <div className="relative ml-auto">
      <button
        onClick={() =>
          setOpenSortKey(openSortKey === sortKey ? null : sortKey)
        }
      >
        <FiChevronDown size={14} />
      </button>

      {openSortKey === sortKey && (
        <div className="absolute z-20 mt-1 w-36 bg-[#DCE4FF]">
          <button
            className="w-full px-3 py-2 text-left hover:bg-[#cbd6ff]"
            onClick={() => applySort(sortKey, "asc")}
          >
            {type === "string" ? "A → Z" : "Low → High"}
          </button>

          <button
            className="w-full px-3 py-2 text-left hover:bg-[#cbd6ff]"
            onClick={() => applySort(sortKey, "desc")}
          >
            {type === "string" ? "Z → A" : "High → Low"}
          </button>
        </div>
      )}
    </div>
  );

  /* SAVE HANDLER */
  const handleSaveProduct = useCallback(
    (updatedProduct) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );

      if (typeof onSaveProduct === "function") {
        onSaveProduct(updatedProduct);
      }

      setEditProduct(null);
    },
    [onSaveProduct]
  );

  /* CATEGORY BADGE */
  const renderCategoryBadge = (category) => {
    const styles = {
      men: "text-blue-600 border-blue-300 bg-blue-50",
      women: "text-pink-600 border-pink-300 bg-pink-50",
      kids: "text-green-600 border-green-300 bg-green-50",
    };

    return (
      <span
        className={`px-3 py-1 text-xs rounded border ${
          styles[category?.toLowerCase()] || "border-gray-300"
        }`}
      >
        {category}
      </span>
    );
  };

  /* COLUMNS */
  const columns = [
    {
      header: "#",
      render: (_, i) => (currentPage - 1) * itemsPerPage + i + 1,
    },

    {
      header: (
        <div className="flex items-center gap-1">
          Title <SortDropdown sortKey="title" type="string" />
        </div>
      ),
      accessor: "title",
    },

    { header: "Size", render: (row) => row.size?.join(", ") },

    {
      header: "Category",
      render: (row) => renderCategoryBadge(row.category),
    },

    {
      header: (
        <div className="flex items-center gap-1">
          Price <SortDropdown sortKey="price" type="number" />
        </div>
      ),
      render: (row) => `₹${row.price}`,
    },

    {
      header: (
        <div className="flex items-center gap-1">
          Stock <SortDropdown sortKey="stock" type="number" />
        </div>
      ),
      accessor: "stock",
    },

    { header: "Brand", accessor: "brand" },

    {
      header: "Action",
      render: (row) => {
        const rowId = row.id;

        return (
          <div className="relative flex justify-center">
            <button
              onClick={() =>
                setActiveRowId(activeRowId === rowId ? null : rowId)
              }
              className="bg-transparent"
            >
              <FiMoreHorizontal size={16} />
            </button>

            {activeRowId === rowId && (
              <div className="absolute top-6 right-0 z-50 w-44 bg-white rounded p-2 shadow-lg">
                <button
                  onClick={() => {
                    setViewProduct(row);
                    setActiveRowId(null);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-[#DCE4FF]"
                >
                  View
                </button>

                <button
                  onClick={() => {
                    setEditProduct(row);
                    setActiveRowId(null);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-[#DCE4FF]"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div
      className={`h-screen rounded overflow-hidden ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-[#3A4752]"
      }`}
    >
      <Table columns={columns} data={products} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {viewProduct && (
        <ProductDetailsModal
          product={viewProduct}
          onClose={() => setViewProduct(null)}
        />
      )}

      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default ProductTable;
