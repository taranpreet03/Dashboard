import { useState } from "react";
import Table from "../../Core/Table";
import Pagination from "../../Core/Pagination";
import ProductDetailsModal from "./ProductDetailsModal";
import EditProductModal from "./EditProductModal";
import { FiMoreHorizontal, FiChevronDown } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const itemsPerPage = 10;

const ProductTable = ({
  products = [],
  total = 0,
  currentPage,        // ✅ FROM PARENT
  setCurrentPage,     // ✅ FROM PARENT
  onSaveProduct,
}) => {
  const { theme } = useTheme();

  /* SORT */
  const [sort, setSort] = useState({
    key: "",
    direction: "asc",
  });

  const [openSortKey, setOpenSortKey] = useState(null);

  /* ACTION MENU */
  const [openMenuId, setOpenMenuId] = useState(null);

  /* MODALS */
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  /* SORT (UI ONLY) */
  const applySort = (key, direction) => {
    setSort({ key, direction });
    setOpenSortKey(null);
    setCurrentPage(1); // reset page
  };

  const totalPages = Math.ceil(total / itemsPerPage);

  /* SAVE */
  const handleSaveProduct = (updated) => {
    onSaveProduct(updated);
  };

  /* SORT DROPDOWN */
  const SortDropdown = ({ sortKey, type }) => (
    <div className="relative ml-auto">
      <button
        onClick={() =>
          setOpenSortKey(openSortKey === sortKey ? null : sortKey)
        }
      >
        <FiChevronDown size={14} />
      </button>

      {openSortKey === sortKey && (
        <div className="absolute z-20 mt-1 w-36 bg-[#DCE4FF] rounded shadow">

          <button
            className="w-full px-3 py-2 text-left hover:bg-[#cbd6ff]"
            onClick={() => applySort(sortKey, "asc")}
          >
            {type === "string" ? "A → Z" : "Low → High"}
          </button>

          <button
            className="w-full px-3 py-2 text-left hover:bg-[#cbd6ff]"
            onClick={() => applySort(sortKey, "desc")}
          >
            {type === "string" ? "Z → A" : "High → Low"}
          </button>

        </div>
      )}
    </div>
  );

  /* ACTION MENU */
  const ActionMenu = ({ product }) => (
    <div className="relative">

      <button
        onClick={() =>
          setOpenMenuId(
            openMenuId === product.id ? null : product.id
          )
        }
      >
        <FiMoreHorizontal size={16} />
      </button>

      {openMenuId === product.id && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow z-30">

          {/* VIEW */}
          <button
            onClick={() => {
              setSelectedProduct(product);
              setShowDetails(true);
              setOpenMenuId(null);
            }}
            className="w-full px-3 py-2 text-left hover:bg-[#E7ECFF] "
          >
            View
          </button>

          {/* EDIT */}
          <button
            onClick={() => {
              setSelectedProduct(product);
              setShowEdit(true);
              setOpenMenuId(null);
            }}
            className="w-full px-3 py-2 text-left hover:bg-[#E7ECFF] "
          >
            Edit
          </button>

        </div>
      )}
    </div>
  );

  /* COLUMNS */
  const columns = [
    {
      header: "#",
      render: (_, i) =>
        (currentPage - 1) * itemsPerPage + i + 1,
    },

    {
      header: (
        <div className="flex gap-1">
          Title <SortDropdown sortKey="title" type="string" />
        </div>
      ),
      accessor: "title",
    },

    {
      header: (
        <div className="flex gap-1">
          Price <SortDropdown sortKey="price" type="number" />
        </div>
      ),
      render: (row) => `₹${row.price}`,
    },

    {
      header: (
        <div className="flex gap-1">
          Stock <SortDropdown sortKey="stock" type="number" />
        </div>
      ),
      accessor: "stock",
    },

    { header: "Brand", accessor: "brand" },

    {
      header: "Action",
      render: (row) => <ActionMenu product={row} />,
    },
  ];

  return (
    <div
      className={`h-full ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-white text-[#3A4752]"
      }`}
    >

      <Table columns={columns} data={products} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* VIEW MODAL */}
      {showDetails && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setShowDetails(false)}
        />
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setShowEdit(false)}
          onSave={handleSaveProduct}
        />
      )}

    </div>
  );
};

export default ProductTable;
