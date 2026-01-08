const Pagination = ({currentPage,totalPages,onPageChange,}) =>{
  if (totalPages <= 1) return null;

  return (
<div className="flex justify-end items-center gap-2 mt-4">
    <button
    disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2  disabled:opacity-50"
      >Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 ${
            page === currentPage? "bg-[#0B1843] text-white": "bg-white"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1  disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
