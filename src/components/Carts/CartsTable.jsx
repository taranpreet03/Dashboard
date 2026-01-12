import { useState, useEffect } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";
import CartsDetailModal from "./CartsDetailModal";
import EditCartModal from "./EditCartModal";
import { FiMoreHorizontal } from "react-icons/fi";

const CartsTable = ({ carts }) => {
  
  const [cartList, setCartList] = useState([]);
  const [selectedCart, setSelectedCart] = useState(null);
  const [editCart, setEditCart] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null);


  useEffect(() => {
    setCartList(carts);
  }, [carts]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 8;
  const totalPages = Math.ceil(cartList.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;

  const paginatedCarts = cartList.slice(
    startIndex,
    startIndex + itemPerPage
  );

 
  const handleSaveCart = (updatedCart) => {
    setCartList((prev) =>
      prev.map((c) =>
        c.id === updatedCart.id ? updatedCart : c
      )
    );
  };

  const columns = [
    { header: "Cart ID", accessor: "id" },
    { header: "Total Products", accessor: "totalProducts" },
    { header: "Total Quantity", accessor: "totalQuantity" },
    { header: "Total ($)", accessor: "total" },
    { header: "Discounted ($)", accessor: "discountedTotal" },
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
    <>
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
    </>
  );
};

export default CartsTable;
