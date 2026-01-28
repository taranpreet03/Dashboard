import { useTheme } from "../context/ThemeContext";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { theme } = useTheme();

  if (totalPages <= 1) return null;

  const baseBtn =
    "px-4 h-[30px] rounded-md text-sm disabled:opacity-50 border transition";

  const lightBtn = "bg-white text-[#3A4752] border-[#E5E7EB]";
  const darkBtn = "bg-[#1B211A] text-white border-white/30";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-3">

        {/* PREV */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`${baseBtn} ${
            theme === "dark" ? darkBtn : lightBtn
          }`}
        >
          ← Prev
        </button>

        

        {/* NEXT */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`${baseBtn} ${
            theme === "dark" ? darkBtn : lightBtn
          }`}
        >
          Next →
        </button>

      </div>
    </div>
  );
};

export default Pagination;
