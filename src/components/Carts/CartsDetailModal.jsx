// src/components/Carts/CartsDetailModal.jsx
import Table from "../../Core/Table";

const CartsDetailModal = ({ cart, onClose }) => {
  if (!cart) return null;

  const columns = [
    { header: "#", render: (_, i) => i + 1 },
    {
      header: "Image",
      render: (row) => (
        <img
          src={row.thumbnail}
          alt={row.title}
          className="w-12 h-12 rounded object-cover"
        />
      ),
    },
    { header: "Title", accessor: "title" },
    { header: "Price ($)", accessor: "price" },
    { header: "Qty", accessor: "quantity" },
    { header: "Total ($)", accessor: "total" },
    { header: "Discounted ($)", accessor: "discountedTotal" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-4xl rounded p-5">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Cart #{cart.id} Details
          </h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <Table columns={columns} data={cart.products} />
      </div>
    </div>
  );
};

export default CartsDetailModal;
