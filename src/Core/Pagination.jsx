import { useTheme } from "../context/ThemeContext";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { theme } = useTheme();

  if (totalPages <= 1) return null;

  const baseBtn =
    "px-3 h-[26px] rounded-[4px] text-xs disabled:opacity-50 border";

  const lightBtn = "bg-blue-600 text-[#3A4752] border-[#F2F4F7]";
  const darkBtn = "bg-[#1B211A] text-white border-white/30";

  const activeBtn = "bg-blue-800 text-black border-transparent";

  return (
    <div className="flex justify-end mt-2">
   
      <div className=" flexd items-center gap-2 ml-auto w-[220px] h-[30px]">
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
    </div>
  );
};

export default Pagination;
