import { useState, useEffect } from "react";
import Button from "../Core/Button";

const FilterPop = ({
  show,
  onClose,
  filters,
  setFilters,
  brands = [],
  categories = [],
}) => {
  const [activeFilter, setActiveFilter] = useState("brand");
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    if (show) {
      setTempFilters(filters);
      setActiveFilter("brand");
    }
  }, [show, filters]);

  if (!show) return null;

  const toggleValue = (key, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const menuItems = ["brand", "category", "price"];

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

          {/* BRAND */}
          {activeFilter === "brand" && (
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

          {/* CATEGORY */}
          {activeFilter === "category" && (
            <>
              <h3 className="font-semibold mb-4">Select Category</h3>

              <div className="space-y-3 max-h-[220px] overflow-y-auto">
                {categories.map((cat) => (
                  <label key={cat} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={tempFilters.category.includes(cat)}
                      onChange={() => toggleValue("category", cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </>
          )}

          {/* PRICE */}
          {activeFilter === "price" && (
            <>
              <h3 className="font-semibold mb-4">
                Max Price: ₹{tempFilters.price}
              </h3>

              <input
                type="range"
                min="0"
                max="5000"
                value={tempFilters.price}
                onChange={(e) =>
                  setTempFilters({
                    ...tempFilters,
                    price: Number(e.target.value),
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
