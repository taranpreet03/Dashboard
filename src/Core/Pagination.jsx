import { useTheme } from "../context/ThemeContext";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { theme } = useTheme();

  if (totalPages <= 1) return null;

  const baseBtn =
    "px-3 h-[26px] rounded-[4px] text-xs disabled:opacity-50 border transition";

  const lightBtn = "bg-white text-[#3A4752] border-[#E5E7EB]";
    const darkBtn = "bg-[#1B211A] text-white border-white/30";

  const activeBtn =
    theme === "dark"
      ? "bg-white text-black border-transparent"
      : "bg-gray-200 text-black border-transparent ";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-2">
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
    </div>
  );
};

export default Pagination;
