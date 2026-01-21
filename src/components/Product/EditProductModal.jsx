import { useState, useEffect } from "react";

const EditProductModal = ({ product, onClose, onSave }) => {
  if (!product) return null;

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    brand: "",
    price: "",
    stock: "",
    size: "",
  });

  // ✅ Sync state when product changes
  useEffect(() => {
    setFormData({
      title: product.title || "",
      category: product.category || "",
      type: product.type || "",
      brand: product.brand || "",
      price: product.price || "",
      stock: product.stock || "",
      size: product.size?.join(", ") || "",
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // ✅ Defensive check
    if (typeof onSave !== "function") {
      console.error("onSave is not a function");
      return;
    }

    const updatedProduct = {
      ...product,
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      size: formData.size
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    onSave(updatedProduct);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[600px] rounded-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

        <div className="space-y-3">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-3 py-2"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full  px-3 py-2"
          />

          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Type"
            className="w-full  px-3 py-2"
          />

          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full  px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className=" px-3 py-2"
            />

            <input
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className=" px-3 py-2"
            />
          </div>

          <input
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Sizes (S, M, L)"
            className="w-full  px-3 py-2"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-black rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
