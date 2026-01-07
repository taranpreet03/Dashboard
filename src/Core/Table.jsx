const Table = ({ columns = [], data = [] }) => {
  if (!data.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        No data found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto text-[#3A4752]">
      <table className="w-full border border-gray-200 text-m">
        <thead className="bg-[#DCE4FF]  ">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="border border-[#F2F4F7] px-3 py-2 text-left font-normal"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row._id || rowIndex}
              className="hover:bg-gray-50 fornt-normal"
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-[#F2F4F7]  px-3 py-2"
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
  );
};

export default Table;
