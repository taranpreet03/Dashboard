import { useEffect, useState } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";

const AlbumsTable = () => {
  const [albums, setAlbums] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(albums.length / itemsPerPage);
  const paginatedAlbums = albums.slice(startIndex, startIndex + itemsPerPage);

  // fetch albums
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then(setAlbums);
  }, []);

  const columns = [
    { header: "Album ID", accessor: "id" },
    { header: "User ID", accessor: "userId" },
    { header: "Title", accessor: "title" },
  ];

  return (
    <div className="ml-10 mt-5">
      <Table columns={columns} data={paginatedAlbums} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AlbumsTable;
