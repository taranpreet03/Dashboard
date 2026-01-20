import { useState } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";
import ProductDetailsModal from "./ProductDetailsModal";
import EditProductModal from "./EditProductModal";
import { FiMoreHorizontal } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const ProductTable = ({ products }) => {
  const { theme } = useTheme();

  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null);

  /*  PAGINATION  */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* CATEGORY  */
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

  /*  COLUMNS */
  const columns = [
    { header: "#", render: (_, i) => startIndex + i + 1 },
    { header: "Title", accessor: "title" },
    { header: "Size", render: (row) => row.size?.join(", ") },
    {
      header: "Category",
      render: (row) => renderCategoryBadge(row.category),
    },
    { header: "Price", render: (row) => `₹${row.price}` },
    { header: "Stock", accessor: "stock" },
    { header: "Brand", accessor: "brand" },
    {
      header: "Action",
      render: (row) => {
        const rowId = row._id;

        return (
          <div className="relative flex justify-center">
            <button
              onClick={() =>
                setActiveRowId(activeRowId === rowId ? null : rowId)
              }
            >
              <FiMoreHorizontal size={16} />
            </button>

            {activeRowId === rowId && (
              <div className="absolute top-6 right-0 w-44 bg-white shadow-md rounded p-2">
                <button
                  onClick={() => {
                    setViewProduct(row);
                    setActiveRowId(null);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#DCE4FF]"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    setEditProduct(row);
                    setActiveRowId(null);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#DCE4FF]"
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
      <Table columns={columns} data={paginatedProducts} />

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
        />
      )}
    </div>
  );
};

export default ProductTable;
