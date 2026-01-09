const CartsDetailModal = ({ cart, onClose }) => {
  if (!cart) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[600px] max-h-[90vh] overflow-y-auto rounded-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Cart Details
        </h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <b>Cart ID:</b> {cart.id}
          </p>

          <p>
            <b>Total Products:</b> {cart.totalProducts}
          </p>

          <p>
            <b>Total Quantity:</b> {cart.totalQuantity}
          </p>

          <p>
            <b>Total Price:</b> ${cart.total}
          </p>

          <p>
            <b>Discounted Total:</b> ${cart.discountedTotal}
          </p>

          <p>
            <b>User ID:</b> {cart.userId}
          </p>

          {cart.products && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">
                Products in Cart
              </h3>

              <div className="space-y-2">
                {cart.products.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 rounded text-sm"
                  >
                    <p>
                      <b>Product ID:</b> {item.id}
                    </p>
                    <p>
                      <b>Quantity:</b> {item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartsDetailModal;
