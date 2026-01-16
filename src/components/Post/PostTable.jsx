import { useEffect, useState } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";
import { useTheme } from "../../context/ThemeContext";
import { FaList, FaThLarge } from "react-icons/fa";

const PostsPage = () => {
  const { theme } = useTheme();
  const [posts, setPosts] = useState([]);
  const [viewType, setViewType] = useState("list");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewType === "list" ? 10 : 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const paginatedPosts = posts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const columns = [
    { header: "#", render: (_, i) => startIndex + i + 1 },
    { header: "User ID", accessor: "userId" },
    { header: "Title", accessor: "title" },
    {
      header: "Body",
      render: (row) => <span className="line-clamp-2">{row.body}</span>,
    },
  ];

  return (
    <div
      className={`h-screen rounded overflow-hidden ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-[#3A4752]"
      }`}
    >
      {/* VIEW TOGGLE */}
      <div className="flex justify-end gap-2 p-3">
        <button
          onClick={() => setViewType("list")}
          className={`p-2 rounded ${
            viewType === "list"
              ? "bg-white text-black"
              : theme === "dark"
              ? "bg-gray-700"
              : "bg-gray-100"
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
              ? "bg-gray-700"
              : "bg-gray-100"
          }`}
        >
          <FaThLarge />
        </button>
      </div>

      <div className="px-4">
        {viewType === "list" ? (
          <Table columns={columns} data={paginatedPosts} />
        ) : (
          <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedPosts.map((post) => (
              <div
                key={post.id}
                className={`border rounded-md p-4 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600"
                    : "bg-white border-gray-200"
                }`}
              >
                <p className="text-xs text-gray-500">User #{post.userId}</p>
                <h3 className="text-sm font-semibold mt-1 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs mt-2 line-clamp-3">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PostsPage;
