import { useState, useEffect } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";
import CartsDetailModal from "./CartsDetailModal";
import EditCartModal from "./EditCartModal";
import { FiMoreHorizontal } from "react-icons/fi";
import { fetchCarts } from "../../services/CartsApi";
import { useTheme } from "../../context/ThemeContext";

const CartsTable = () => {
  const { theme } = useTheme();

  const [cartList, setCartList] = useState([]);
  const [viewCart, setViewCart] = useState(null);
  const [editCart, setEditCart] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    const getCarts = async () => {
      const data = await fetchCarts();
      setCartList(data);
    };
    getCarts();
  }, []);

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(cartList.length / itemsPerPage);

  const paginatedCarts = cartList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* ================= SAVE ================= */
  const handleSaveCart = (updatedCart) => {
    setCartList((prev) =>
      prev.map((cart) =>
        cart.id === updatedCart.id ? updatedCart : cart
      )
    );
  };

  /* ================= COLUMNS ================= */
  const columns = [
    {
      header: "#",
      render: (_, i) => startIndex + i + 1,
    },
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
      render: (row) => `$${row.total}`,
    },
    {
      header: "Discounted ($)",
      render: (row) => `$${row.discountedTotal}`,
    },
    {
      header: "Action",
      render: (row) => {
        const rowId = row.id;

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
                    setViewCart(row);
                    setActiveRowId(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-[#DCE4FF]"
                >
                  View
                </button>

                <button
                  onClick={() => {
                    setEditCart(row);
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

  /* ================= RENDER ================= */
  return (
    <div
      className={`h-screen rounded overflow-hidden ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-[#3A4752]"
      }`}
    >
      <Table columns={columns} data={paginatedCarts} />

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* VIEW CART */}
      {viewCart && (
        <CartsDetailModal
          cart={viewCart}
          onClose={() => setViewCart(null)}
        />
      )}

      {/* EDIT CART */}
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
