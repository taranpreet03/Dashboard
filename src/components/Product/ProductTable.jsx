import { useState, useEffect } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";
import ProductDetailsModal from "./ProductDetailsModal";
import EditProductModal from "./EditProductModal";
import { FiMoreHorizontal } from "react-icons/fi";
import { fetchProducts } from "../../services/productApi";

const ProductTable = () => {
  const [productList, setProductList] = useState([]);
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null);

  // FETCHING
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProductList(data);
    };
    getProducts();
  }, []);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 13;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(productList.length / itemsPerPage);

  const paginatedProducts = productList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // SAVE
  const handleSaveProduct = (updatedProduct) => {
    setProductList((prev) =>
      prev.map((item) =>
        item._id === updatedProduct._id ? updatedProduct : item
      )
    );
  };

  // CATEGORY 
  const renderCategoryBadge = (category) => {
    const value = category?.toLowerCase();

    const styles = {
      men: "text-blue-600 border-blue-300 bg-blue-40",
      women: "text-pink-600 border-pink-300 bg-pink-40",
      kids: "text-green-600 border-green-300 bg-green-50",
    };

    return (
      <span
        className={`inline-block px-3 py-1 text-xs rounded-md border ${
          styles[value] || "text-gray-600 border-gray-300 bg-gray-50"
        }`}
      >
        {category}
      </span>
    );
  };

  // COLUMNS
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
          <div className="relative flex justify-center items-center">
            <button
              onClick={() =>
                setActiveRowId(activeRowId === rowId ? null : rowId)
              }
              className="bg-transparent p-0 border-none outline-none"
            >
              <FiMoreHorizontal size={16} />
            </button>

            {activeRowId === rowId && (
              <div className="absolute top-6 right-0 w-44 bg-white rounded-md shadow-md p-2 z-20">
                <button
                  onClick={() => {
                    setViewProduct(row);
                    setActiveRowId(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-[#DCE4FF]"
                >
                  View
                </button>

                <button
                  onClick={() => {
                    setEditProduct(row);
                    setActiveRowId(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-[#DCE4FF]"
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
    <>
      <Table columns={columns} data={paginatedProducts} />

      {/* PAGINATION */}
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
    </>
  );
};

export default ProductTable;
