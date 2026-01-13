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

  // fetching
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProductList(data);
    };
    getProducts();
  }, []);

  // pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(productList.length / itemsPerPage);
  const paginatedProducts = productList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Save functionality 
  const handleSaveProduct = (updatedProduct) => {
    setProductList((prev) =>
      prev.map((item) =>
        item._id === updatedProduct._id ? updatedProduct : item
      )
    );
  };

  const columns = [
    { header: "#", render: (_, i) => startIndex + i + 1 },
    { header: "Title", accessor: "title" },
    { header: "Size", render: (row) => row.size?.join(", ") },
    { header: "Category", accessor: "category" },
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
              className="bg-transparent p-0 border-none outline-none"
            >
              <FiMoreHorizontal size={18} />
            </button>

            {activeRowId === rowId && (
              <div className="absolute top-8 right-0 w-44 bg-white rounded-lg shadow-md p-2 z-20">
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
