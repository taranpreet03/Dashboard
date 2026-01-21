import { useState } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";
import CartsDetailModal from "./CartsDetailModal";
import EditCartModal from "./EditCartModal";
import { FiMoreHorizontal } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const CartsTable = ({ carts }) => {
  const { theme } = useTheme();

  const [viewCart, setViewCart] = useState(null);
  const [editCart, setEditCart] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null);

  /*  PAGINATION  */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(carts.length / itemsPerPage);

  const paginatedCarts = carts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* SAVE */
  const handleSaveCart = (updatedCart) => {
  
    setEditCart(null);
  };

  /* COLUMNS */
  const columns = [
    { header: "#", render: (_, i) => startIndex + i + 1 },
    { header: "Cart ID", accessor: "id" },
    { header: "Total Products", accessor: "totalProducts" },
    { header: "Total Quantity", accessor: "totalQuantity" },
    { header: "Total ($)", render: (row) => `$${row.total}` },
    {
      header: "Discounted ($)",
      render: (row) => `$${row.discountedTotal}`,
    },
    {
      header: "Action",
      render: (row) => {
        const rowId = row.id;

        return (
          <div className="relative flex justify-center">
            <button
              onClick={() =>
                setActiveRowId(activeRowId === rowId ? null : rowId)
              } className="bg-transparent"
            >
              <FiMoreHorizontal size={16} />
            </button>

            {activeRowId === rowId && (
              <div className="absolute top-6 right-0 w-44 bg-white shadow-md rounded p-2">
                <button
                  onClick={() => {
                    setViewCart(row);
                    setActiveRowId(null);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#DCE4FF]"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    setEditCart(row);
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
      <Table columns={columns} data={paginatedCarts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {viewCart && (
        <CartsDetailModal
          cart={viewCart}
          onClose={() => setViewCart(null)}
        />
      )}

      {editCart && (
        <EditCartModal
          cart={editCart}
          onClose={() => setEditCart(null)}
          onSave={handleSaveCart}
        />
      )}
    </div>
  );
};

export default CartsTable;
