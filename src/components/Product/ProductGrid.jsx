import { FiEdit } from "react-icons/fi";

const ProductGrid = ({ products = [], onEdit }) => {
  return (
    <div className="overflow-y-auto h-screen">
    <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2  ">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white bordEFR border-gray-200 rounded-md p-3 h-[150px] w-[300px]
            flex flex-col hover:shadow-sm transition  ">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
              {product.title}
            </h3>

            <button
              onClick={() => onEdit(product)}
              className="text-gray-400 hover:text-gray-700 shrink-0"
              title="Edit product"
            >
              <FiEdit size={14} />
            </button>
          </div>

  
            <p className="text-xs text-gray-500">
              {product.category} • {product.brand || "Fashion"}
            </p>

            <div className="flex flex-wrap gap-1 mt-2">
              {(product.sizes || ["S", "M", "L"]).map((size) => (
                <span
                  key={size}
                  className="text-xs border border-gray-300 rounded px-2 py-[2px]
                    hover:bg-gray-100 cursor-pointer transition"
                >
                  {size}
                </span>
              ))}
            </div>
         
          <div className="flex justify-between items-center pt-2 mt-2 ">
            <span className="text-blue-600 font-semibold">
              ₹{product.price}
            </span>

            <span className="text-xs font-medium text-green-600">
              In Stock
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ProductGrid;
