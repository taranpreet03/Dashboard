import { useState } from "react";
import { FaList, FaThLarge } from "react-icons/fa";
import FilterPop from "../../components/Filterpopup";
import PostsPage from "./PostTable";
import { useTheme } from "../../context/ThemeContext";
import SearchInput from "../../Core/Search";

const PostsLayout = () => {
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

          {/* SEARCH */}
        <SearchInput
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={`Search by ${activeTab}...`}
          className={` w-80 h-10 px-2 rounded-lg ${
            theme === "dark"
              ? "bg-gray-800 text-white border-white/10"
              : "bg-white border-gray-200"
          }`}
        />
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
      <PostsPage
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
        activeTab="posts"
      />
    </div>
  );
};

export default PostsLayout;
