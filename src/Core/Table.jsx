import { useTheme } from "../context/ThemeContext";

const Table = ({ columns = [], data = [], onActionClick }) => {
  const { theme } = useTheme();

  if (!data.length) {
    return (
      <div
        className={`text-center py-4 ${
          theme === "dark" ? "text-white/60" : "text-gray-500"
        }`}
      >
        No data found
      </div>
    );
  }

  return (
    <div
      className={`border ${
        theme === "dark"
          ? "bg-[#1B211A] text-white border-white/20"
          : "bg-white text-[#3A4752] border-gray-200"
      }`}
    >
      {/* TABLE HEADER */}
      <table className="w-full border-collapse table-fixed">
        <thead className={theme === "dark" ? "bg-[#1B211A]" : "bg-[#DCE4FF]"}>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-3 py-2 text-left font-normal border-b ${
                  theme === "dark"
                    ? "border-white/20 text-white/80"
                    : "border-[#F2F4F7]"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
      </table>

      {/* TABLE BODY */}
      <div className="max-h-[80vh] overflow-y-auto">
        <table className="w-full border-collapse table-fixed">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={row._id || rowIndex}
                className={
                  theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-50"
                }
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-3 py-2 border ${
                      theme === "dark"
                        ? "border-white/20 text-white/80"
                        : "border-[#F2F4F7]"
                    } ${
                      col.header === "Action"
                        ? theme === "dark"
                          ? "bg-[#1B211A]"
                          : "bg-white"
                        : ""
                    }`}
                  >
                    {col.render ? col.render(row, rowIndex) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
