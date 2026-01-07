import { useState, useEffect } from "react";
import Button from "../Core/Button";

const FilterPop = ({ show, onClose, filters, setFilters, brands, activeTab, categories }) => {
  const [activeFilter, setActiveFilter] = useState("");
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    if (show) {
      setTempFilters(filters);
      setActiveFilter(activeTab === "products" ? "size" : "parentId");
    }
  }, [show, filters, activeTab]);

  if (!show) return null;

  const toggleValue = (key, value) => {
    setTempFilters({
      ...tempFilters,
      [key]: tempFilters[key].includes(value)
        ? tempFilters[key].filter((v) => v !== value)
        : [...tempFilters[key], value],
    });
  };

  // Filters menu
  const menuItems = activeTab === "products" ? ["size", "brand", "price", "category"] : ["parentId", "name"];

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
          {/* PRODUCTS FILTER */}
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
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
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
              <h3 className="font-semibold mb-4">Price up to ₹{tempFilters.price}</h3>
              <input
                type="range"
                min="0"
                max="2000"
                value={tempFilters.price}
                onChange={(e) => setTempFilters({ ...tempFilters, price: +e.target.value })}
                className="w-full"
              />
            </>
          )}

          {activeTab === "products" && activeFilter === "category" && (
            <>
              <h3 className="font-semibold mb-4">Select Category</h3>
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
                {[...new Set(categories.map((cat) => cat.name))].map((catName) => (
                  <label key={catName} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={tempFilters.category.includes(catName)}
                      onChange={() => toggleValue("category", catName)}
                    />
                    {catName}
                  </label>
                ))}
              </div>
            </>
          )}

          {/* CATEGORIES FILTER */}
          {activeTab === "categories" && activeFilter === "parentId" && (
            <>
              <h3 className="font-semibold mb-4">Select Parent ID</h3>
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
                {[...new Set(categories.map((cat) => cat.parentId))].map((id) => (
                  <label key={id} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={tempFilters.parentId.includes(id)}
                      onChange={() => toggleValue("parentId", id)}
                    />
                    {id}
                  </label>
                ))}
              </div>
            </>
          )}

          {activeTab === "categories" && activeFilter === "name" && (
            <>
              <h3 className="font-semibold mb-4">Select Name</h3>
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2">
                {[...new Set(categories.map((cat) => cat.name))].map((name) => (
                  <label key={name} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={tempFilters.name.includes(name)}
                      onChange={() => toggleValue("name", name)}
                    />
                    {name}
                  </label>
                ))}
              </div>
            </>
          )}

          {/* ACTIONS */}
          <div className="absolute bottom-6 right-6 flex gap-3">
            <Button text="Cancel" onClick={onClose} className="px-4 py-2 hover:bg-[#DCE4FF]" />
            <Button
              text="Apply"
              onClick={() => {
                setFilters(tempFilters);
                onClose();
              }}
              className="px-4 py-2 hover:bg-[#DCE4FF]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPop;
