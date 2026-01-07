import { FaSearch } from "react-icons/fa";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 border px-3 py-2 rounded ${className}`}>
      <FaSearch className="text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="outline-none w-full text-sm"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
