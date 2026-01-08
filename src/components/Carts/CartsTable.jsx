import { useState } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";

const CartsTable = ({ carts, onView }) => {
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 8;

  const totalPages = Math.ceil(carts.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;

  const paginatedCarts = carts.slice(
    startIndex,
    startIndex + itemPerPage
  );

  const columns = [
    {
      header: "Cart ID",
      accessor: "id",
    },
    {
      header: "Total Products",
      accessor: "totalProducts",
    },
    {
      header: "Total Quantity",
      accessor: "totalQuantity",
    },
    {
      header: "Total ($)",
      accessor: "total",
    },
    {
      header: "Discounted ($)",
      accessor: "discountedTotal",
    },
    {
      header: "Action",
      render: (row) => (
        <div className="flex justify-center">
          <button
            onClick={() => onView?.(row)}
            className="px-4 py-1 text-sm bg-gray-200 rounded hover:bg-[#DCE4FF]"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} data={paginatedCarts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default CartsTable;
