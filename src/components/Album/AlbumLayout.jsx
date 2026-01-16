import { useState } from "react";
import { FaList, FaThLarge } from "react-icons/fa";
import FilterPop from "../../components/Filterpopup";
import AlbumsPage from "./AlbumTable";
import { useTheme } from "../../context/ThemeContext";

const AlbumsLayout = () => {
  const { theme } = useTheme();

  const [searchText, setSearchText] = useState("");
  const [viewType, setViewType] = useState("list");
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    userId: [],
  });

  return (
    <div
      className={`h-screen rounded overflow-hidden ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-[#3A4752]"
      }`}
    >
      {/* TOP BAR */}
      <div className="flex items-center gap-3 p-2 mb-4 border-b">

        {/* VIEW TOGGLE */}
        <div className="ml-auto flex gap-2">
          <button onClick={() => setViewType("list")}>
            <FaList />
          </button>
          <button onClick={() => setViewType("grid")}>
            <FaThLarge />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <AlbumsPage
        searchText={searchText}
        filters={filters}
        viewType={viewType}
      />

      {/* FILTER POPUP */}
      <FilterPop
        show={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
        activeTab="albums"
      />
    </div>
  );
};

export default AlbumsLayout;
