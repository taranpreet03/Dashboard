import { useState } from "react";

const EditCartModal = ({ cart, onClose, onSave }) => {
  if (!cart) return null;

  const [formData, setFormData] = useState({
    totalProducts: cart.totalProducts || "",
    totalQuantity: cart.totalQuantity || "",
    total: cart.total || "",
    discountedTotal: cart.discountedTotal || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedCart = {
      ...cart,
      totalProducts: Number(formData.totalProducts),
      totalQuantity: Number(formData.totalQuantity),
      total: Number(formData.total),
      discountedTotal: Number(formData.discountedTotal),
    };

    onSave(updatedCart);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[500px] max-h-[90vh] overflow-y-auto rounded-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Cart</h2>

        <div className="space-y-3 text-sm">
          {/* Cart ID (read-only) */}
          <input
            value={cart.id || cart._id}
            disabled
            className="w-full border border-gray-200 rounded px-3 py-2 bg-gray-100 text-gray-500"
          />

          <input
            name="totalProducts"
            value={formData.totalProducts}
            onChange={handleChange}
            placeholder="Total Products"
            type="number"
            className="w-full border border-gray-200 rounded px-3 py-2"
          />

          <input
            name="totalQuantity"
            value={formData.totalQuantity}
            onChange={handleChange}
            placeholder="Total Quantity"
            type="number"
            className="w-full border border-gray-200 rounded px-3 py-2"
          />

          <input
            name="total"
            value={formData.total}
            onChange={handleChange}
            placeholder="Total Amount"
            type="number"
            className="w-full border border-gray-200 rounded px-3 py-2"
          />

          <input
            name="discountedTotal"
            value={formData.discountedTotal}
            onChange={handleChange}
            placeholder="Discounted Amount"
            type="number"
            className="w-full border border-gray-200 rounded px-3 py-2"
          />

          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-grey-200 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCartModal;
