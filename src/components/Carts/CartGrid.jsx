const CartsGrid = ({ carts = [] }) => {
  return (
    <div className="overflow-y-auto h-screen">
   
    <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {carts.map((cart) => (
        <div
          key={cart.id}
          className="bg-whit border border-gray-200 rounded-md p-3 h-[150px] w-[300px] flex flex-col hover:shadow-sm transition"
        >

          <div className="flex justify-between items-start mb-1">
            <h3 className="text-sm font-semibold text-gray-800">
              Cart ID: {cart.id}
            </h3>

            <span className="text-xs text-gray-500">
              User #{cart.userId}
            </span>
          </div>


          <div className="text-xs text-gray-600 space-y-1">
            <p>Total Products: {cart.totalProducts}</p>
            <p>Total Quantity: {cart.totalQuantity}</p>
            <p>
              Total Price:{" "}
              <span className="font-medium text-gray-800">
                ${cart.total}
              </span>
            </p>
            <p>
              Discounted Total:{" "}
              <span className="font-medium text-green-600">
                ${cart.discountedTotal}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
     </div>
  );
};

export default CartsGrid;
