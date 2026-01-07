const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  return (

    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}>
      <div
        className="bg-white w-[600px] max-h-[90vh] overflow-y-auto rounded-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Product Details
        </h2>

        <div className="space-y-2 text-sm text-gray-700">
            {product.image && (
            <img
              src={product.image}
              alt={product.title}
              className="mt-4 w-full h-120 object-cover rounded"
            />
          )}
          <p><b>Title:</b> {product.title}</p>
          <p><b>Category:</b> {product.category}</p>
          <p><b>Type:</b> {product.type}</p>
          <p><b>Brand:</b> {product.brand}</p>
          <p><b>Price:</b> ₹{product.price}</p>
          <p><b>Old Price:</b> ₹{product.oldPrice}</p>
          <p><b>Discounted Price:</b> ₹{product.discountedPrice}</p>
          <p><b>Stock:</b> {product.stock}</p>
          <p><b>Rating:</b>  {product.rating}⭐</p>
          <p><b>Size:</b> {product.size?.join(", ")}</p>

          <p className="mt-2">
            <b>Description:</b><br />
            {product.description}
          </p>

          
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
