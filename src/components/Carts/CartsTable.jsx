import { useState, useEffect } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";
import CartsDetailModal from "./CartsDetailModal";
import EditCartModal from "./EditCartModal";
import { FiMoreHorizontal } from "react-icons/fi";
import { fetchCarts } from "../../services/CartsApi";

const CartsTable = () => {
  const [cartList, setCartList] = useState([]);
  const [selectedCart, setSelectedCart] = useState(null);
  const [editCart, setEditCart] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null);

  // Fetch carts
  useEffect(() => {
    const getCarts = async () => {
      const data = await fetchCarts();
      setCartList(data);
    };
    getCarts();
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(cartList.length / itemsPerPage);

  const paginatedCarts = cartList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Save cart
  const handleSaveCart = (updatedCart) => {
    setCartList((prev) =>
      prev.map((cart) =>
        cart.id === updatedCart.id ? updatedCart : cart
      )
    );
  };

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
      accessor: "total",
    },
    {
      header: "Discounted ($)",
      accessor: "discountedTotal",
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
              }
              className="bg-transparent p-0 border-none outline-none"
            >
              <FiMoreHorizontal size={18} />
            </button>

            {activeRowId === rowId && (
              <div className="absolute top-8 right-0 w-44 bg-white rounded-lg shadow-md p-2 z-20">
                <button
                  onClick={() => {
                    setSelectedCart(row);
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

  return (
    <div className="ml-10 mt-5">
      <Table columns={columns} data={paginatedCarts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedCart && (
        <CartsDetailModal
          cart={selectedCart}
          onClose={() => setSelectedCart(null)}
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
