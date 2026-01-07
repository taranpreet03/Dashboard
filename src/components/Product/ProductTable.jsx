import { useState } from "react";
import Table from "../../Core/Table";
import ProductDetailsModal from "./ProductDetailsModal";
const ProductTable = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const columns = [
    {
      header: "#",
      render: (_, index) => index + 1,
    },
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Size",
      render: (row) => row.size?.join(", "),
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Price",
      render: (row) => `₹${row.price}`,
    },
    {
      header: "Stock",
      accessor: "stock",
    },
    {
      header: "Brand",
      accessor: "brand",
    },
    {
      header: "Action",
      render: (row) => (
        <div className="flex justify-center items-center">
          <button
            onClick={() => setSelectedProduct(row)}
            className="px-4 py-2 text-sm  rounded"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
    <Table columns={columns} data={products} />
    <ProductDetailsModal product={selectedProduct}onClose={() => setSelectedProduct(null)}/>
      </>
  )
};

export default ProductTable;
