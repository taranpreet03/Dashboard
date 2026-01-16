import { useEffect, useState } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";
import { useTheme } from "../../context/ThemeContext";
import { FaList, FaThLarge } from "react-icons/fa";

const AlbumsTable = () => {
  const { theme } = useTheme();
  const [albums, setAlbums] = useState([]);
  const [viewType, setViewType] = useState("list");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewType === "list" ? 20 : 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(albums.length / itemsPerPage);
  const paginatedAlbums = albums.slice(startIndex, startIndex + itemsPerPage);

  // fetch albums
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then(setAlbums);
  }, []);

  // TABLE COLUMNS
  const columns = [
    { header: "Album ID", accessor: "id" },
    { header: "User ID", accessor: "userId" },
    { header: "Title", accessor: "title" },
  ];

  return (
    <div
      className={`h-screen rounded overflow-hidden ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-[#3A4752]"
      }`}
    >
      {/* VIEW TOGGLE */}
      <div className="flex justify-end gap-2 px-4 pt-3">
        <button
          onClick={() => setViewType("list")}
          className={`p-2 rounded ${
            viewType === "list"
              ? "bg-white text-black"
              : theme === "dark"
              ? "bg-gray-700 text-white/70"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <FaList />
        </button>

        <button
          onClick={() => setViewType("grid")}
          className={`p-2 rounded ${
            viewType === "grid"
              ? "bg-white text-black"
              : theme === "dark"
              ? "bg-gray-700 text-white/70"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <FaThLarge />
        </button>
      </div>

      <div className="mt-4 px-4">
        {/* LIST VIEW */}
        {viewType === "list" && (
          <Table columns={columns} data={paginatedAlbums} />
        )}

        {/* GRID VIEW */}
        {viewType === "grid" && (
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedAlbums.map((album) => (
              <div
                key={album.id}
                className={`border rounded-md p-4 h-[120px] ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <p className="text-xs text-gray-500">
                  Album #{album.id}
                </p>
                <p className="text-xs text-gray-500">
                  User #{album.userId}
                </p>
                <h3 className="text-sm font-semibold mt-2 line-clamp-2">
                  {album.title}
                </h3>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AlbumsTable;
