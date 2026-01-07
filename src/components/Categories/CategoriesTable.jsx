import Table from "../../Core/Table";

const CategoriesTable = ({ categories }) => {
  const columns = [
    {
      header: "#",
      render: (_, index) => index + 1,
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Description",
      accessor: "description",
    },
    {
      header: "Parent ID",
      render: (row) => row.parentId ?? "—",
    },
  ];

  return <Table columns={columns} data={categories} />;
};

export default CategoriesTable;
