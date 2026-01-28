import { FiEdit } from "react-icons/fi";
import Pagination from "../../Core/Pagination";

const itemsPerPage = 10;

const ProductGrid = ({
  products = [],
  onEdit,

  currentPage = 1,
  setCurrentPage,
  total = 0,
}) => {
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="flex flex-col">

      {/* GRID */}
      <div className="px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-md p-3
                flex flex-col hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {product.title}
                </h3>

                {onEdit && (
                  <button
                    onClick={() => onEdit(product)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <FiEdit size={14} />
                  </button>
                )}
              </div>

              {/* Brand */}
              <p className="text-xs text-gray-500 mt-1">
                {product.category} • {product.brand}
              </p>

              {/* Sizes */}
              <div className="flex flex-wrap gap-1 mt-2">
                {(product.sizes || ["S", "M", "L"]).map((size) => (
                  <span
                    key={size}
                    className="text-xs border border-gray-300 rounded px-2 py-[2px]
                      hover:bg-gray-100 cursor-pointer"
                  >
                    {size}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-3 mt-auto">
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

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductGrid;
