import { useTheme } from "../context/ThemeContext";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { theme } = useTheme();

  if (totalPages <= 1) return null;

  const baseBtn =
    "px-4 py-2 rounded disabled:opacity-50 border";

  const lightBtn = "bg-white text-[#3A4752] border-[#F2F4F7]";
  const darkBtn = "bg-[#1B211A] text-white border-white/30";

  const activeBtn = "bg-gray-800 text-black border-transparent";

  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      {/* PREV */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${baseBtn} ${
          theme === "dark" ? darkBtn : lightBtn
        }`}
      >
        Prev
      </button>

      {/* PAGE NUMBERS */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${baseBtn} ${
            page === currentPage
              ? activeBtn
              : theme === "dark"
              ? darkBtn
              : lightBtn
          }`}
        >
          {page}
        </button>
      ))}

      {/* NEXT */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${baseBtn} ${
          theme === "dark" ? darkBtn : lightBtn
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
