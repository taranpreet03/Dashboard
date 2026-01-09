const EditProductModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>

        <div className="space-y-3">
          <input
            defaultValue={product.title}
            className="w-full border px-3 py-2 rounded"
            placeholder="Product Title"
          />
          <input
            defaultValue={product.price}
            className="w-full border px-3 py-2 rounded"
            placeholder="Price"
          />
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
