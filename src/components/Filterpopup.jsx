import { useState, useEffect } from "react";
import Button from "../Core/Button";

const FilterPop = ({
  show,
  onClose,
  filters,
  setFilters,
  brands,
  carts = [],
  activeTab,
}) => {
  const [activeFilter, setActiveFilter] = useState("");
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    if (show) {
      setTempFilters(filters);
      setActiveFilter(activeTab === "products" ? "size" : "cartId");
    }
  }, [show, filters, activeTab]);

  if (!show) return null;

  const toggleValue = (key, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const menuItems =
    activeTab === "products"
      ? ["size", "brand", "price"]
      : ["cartId", "quantity"];

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white w-[750px] h-[400px] rounded-lg flex overflow-hidden">
        {/* LEFT MENU */}
        <div className="w-1/3 border-r bg-gray-50">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveFilter(item)}
              className={`w-full text-left px-6 py-4 capitalize ${
                activeFilter === item ? "bg-white font-semibold" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-2/3 p-6 relative">
          {/* PRODUCT FILTERS */}
          {activeTab === "products" && activeFilter === "size" && (
            <>
              <h3 className="font-semibold mb-4">Select Size</h3>
              <div className="flex gap-6">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <label key={size} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={tempFilters.size.includes(size)}
                      onChange={() => toggleValue("size", size)}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </>
          )}

          {activeTab === "products" && activeFilter === "brand" && (
            <>
              <h3 className="font-semibold mb-4">Select Brand</h3>
              <div className="space-y-3 max-h-[220px] overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={tempFilters.brand.includes(brand)}
                      onChange={() => toggleValue("brand", brand)}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </>
          )}

          {activeTab === "products" && activeFilter === "price" && (
            <>
              <h3 className="font-semibold mb-4">
                Price up to ₹{tempFilters.price}
              </h3>
              <input
                type="range"
                min="0"
                max="2000"
                value={tempFilters.price}
                onChange={(e) =>
                  setTempFilters({
                    ...tempFilters,
                    price: +e.target.value,
                  })
                }
                className="w-full"
              />
            </>
          )}

          {/* CART FILTERS */}
          {activeTab === "carts" && activeFilter === "cartId" && (
            <>
              <h3 className="font-semibold mb-4">Select Cart ID</h3>
              <div className="space-y-3 max-h-[220px] overflow-y-auto">
                {carts.map((cart) => (
                  <label key={cart.id} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={tempFilters.cartId.includes(cart.id)}
                      onChange={() => toggleValue("cartId", cart.id)}
                    />
                    Cart #{cart.id}
                  </label>
                ))}
              </div>
            </>
          )}

          {activeTab === "carts" && activeFilter === "quantity" && (
            <>
              <h3 className="font-semibold mb-4">
                Minimum Quantity: {tempFilters.quantity}
              </h3>
              <input
                type="range"
                min="0"
                max="50"
                value={tempFilters.quantity}
                onChange={(e) =>
                  setTempFilters({
                    ...tempFilters,
                    quantity: +e.target.value,
                  })
                }
                className="w-full"
              />
            </>
          )}

          {/* ACTIONS */}
          <div className="absolute bottom-6 right-6 flex gap-3">
            <Button text="Cancel" onClick={onClose} />
            <Button
              text="Apply"
              onClick={() => {
                setFilters(tempFilters);
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPop;
