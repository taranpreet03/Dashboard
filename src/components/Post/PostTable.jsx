import { useEffect, useState } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";

const PostsTable = () => {
  const [posts, setPosts] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const paginatedPosts = posts.slice(startIndex, startIndex + itemsPerPage);

  // fetch posts
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
      render: (row) => (
        <span className="line-clamp-2">{row.body}</span>
      ),
    },
  ];

  return (
    <div className="ml-10 mt-5">

      <Table columns={columns} data={paginatedPosts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PostsTable;
