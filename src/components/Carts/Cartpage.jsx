import { useEffect, useState } from "react";
import CartsTable from "../Carts/CartsTable";
import CartsGrid from "../Carts/CartGrid";; 
import { fetchCarts } from "../../services/CartsApi";

const CartsPage = ({ searchText, filters, viewType }) => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetchCarts().then(setCarts);
  }, []);

  const filteredCarts = carts.filter((cart) => {
    const matchSearch = cart.id.toString().includes(searchText);
    const matchQty =
      filters.quantity === 0 || cart.totalQuantity >= filters.quantity;

    return matchSearch && matchQty;
  });

  return viewType === "list" ? (
    <CartsTable carts={filteredCarts} />
  ) : (
    <CartsGrid carts={filteredCarts} />
  );
};

export default CartsPage;
