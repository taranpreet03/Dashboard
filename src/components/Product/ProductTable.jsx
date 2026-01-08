import { useState } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";
import ProductDetailsModal from "./ProductDetailsModal";

const ProductTable = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
 // paginaton
  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 7;

  const totalPages = Math.ceil(products.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemPerPage
  );

  const columns = [
    { header: "#", render: (_, index) => startIndex + index + 1 },
    { header: "Title", accessor: "title" },
    { header: "Size", render: (row) => row.size?.join(", ") },
    { header: "Category", accessor: "category" },
    { header: "Price", render: (row) => `₹${row.price}` },
    { header: "Stock", accessor: "stock" },
    { header: "Brand", accessor: "brand" },
    {
      header: "Action",
      render: (row) => (
        <button
          onClick={() => setSelectedProduct(row)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-[#DCE4FF]"
        >
          View
        </button>
      ),
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

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default ProductTable;
