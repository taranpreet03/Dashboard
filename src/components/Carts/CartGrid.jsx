import { FiEdit } from "react-icons/fi";

const CartsGrid = ({ carts = [], onEdit }) => {
  return (
    <div className="overflow-y-auto h-screen">
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {carts.map((cart) => (
          <div
            key={cart.id}
            className="
              ml-5 bg-white border border-gray-200 rounded-md
              p-3 h-[150px] w-[300px]
              flex flex-col hover:shadow-sm transition
            "
          >
            {/* HEADER */}
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-sm font-semibold text-gray-800">
                Cart #{cart.id}
              </h3>

              {onEdit && (
                <button
                  onClick={() => onEdit(cart)}
                  className="text-gray-400 hover:text-gray-700 shrink-0"
                  title="Edit cart"
                >
                  <FiEdit size={14} />
                </button>
              )}
            </div>

            {/* SUB INFO */}
            <p className="text-xs text-gray-500">
              User ID: {cart.userId}
            </p>

            {/* DETAILS */}
            <div className="text-xs text-gray-600 space-y-1 mt-2">
              <p>Total Products: {cart.totalProducts}</p>
              <p>Total Quantity: {cart.totalQuantity}</p>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-auto pt-2">
              <span className="text-blue-600 font-semibold">
                ${cart.total}
              </span>

              <span className="text-xs font-medium text-green-600">
                Saved ${cart.total - cart.discountedTotal}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartsGrid;
