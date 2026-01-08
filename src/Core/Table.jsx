const Table = ({ columns = [], data = [] }) => {
  if (!data.length) {
    return <div className="text-center py-4 text-gray-500">No data found</div>;
  }

  return (
    <div className="max-h-[95vh] overflow-y-auto text-[#3A4752]">
      <table className="w-full border border-gray-200 text-m">
       <thead className="sticky top-0 z-20 bg-[#DCE4FF]">
  <tr>
    {columns.map((col, index) => (
      <th
        key={index}
        className="border-b border-[#F2F4F7] px-3 py-2 text-left font-normal bg-[#DCE4FF]"
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
              className=""
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`border border-[#F2F4F7] px-3 py-2 ${
                    col.header === "Action" ? "bg-white hover:bg-white" : ""
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
  );
};

export default Table;
