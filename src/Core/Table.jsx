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
      className={`border rounded-lg overflow-hidden mb-2 max-w-[98%] mx-auto ${
        theme === "dark"
          ? "bg-gray-800 text-white border-white/20"
          : "bg-white text-[#3A4752] border-gray-200"
      }`}
    >
      {/* header */}
      <table className="w-full border-collapse text-xs table-fixed">
        <thead className={theme === "dark" ? "bg-gradient-to-br from-[#0B1626] to-[#1E3557] " : "bg-[#DCE4FF]"}>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-2 py-1.5 text-left font-normal border-r last:border-r-0 ${
                  theme === "dark"
                    ? " bg-gray-800 border-white/10 text-white/80"
                    : "border-[#EEF2F7] text-[#4B5563]"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
      </table>

      {/*Body */}
      <div className="max-h-[70vh] overflow-y-auto">
        <table className="w-full border-collapse text-xs table-fixed">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={row._id || rowIndex}
                className={`transition ${
                  theme === "dark"
                    ? "hover:bg-white/5"
                    : "hover:bg-gray-50"
                }`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-2 py-1.5 border-t border-r last:border-r-0 ${
                      theme === "dark"
                        ? " bg-gray-800border-white/10 text-white/80"
                        : "border-[#F1F5F9] text-[#374151]"
                    } ${
                      col.header === "Action" ? "text-center" : ""
                    }`}
                  >
                    {col.render
                      ? col.render(row, rowIndex)
                      : row[col.accessor]}
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
