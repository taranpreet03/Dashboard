import { useEffect, useState } from "react";
import CartsTable from "../Carts/CartsTable";
import CartsGrid from "../Carts/CartGrid";
import { fetchCarts } from "../../services/CartsApi";

const CartsPage = ({
  carts: cartsProp,
  searchText = "",
  filters = {
    cartId: [],
    quantity: 0,
  },
  viewType = "list",
}) => {
  const [carts, setCarts] = useState(cartsProp || []);

  // fetch ONLY if carts not provided
  useEffect(() => {
    if (!cartsProp) {
      fetchCarts().then(setCarts);
    }
  }, [cartsProp]);

  const filteredCarts = carts.filter((cart) => {
    const matchSearch =
      !searchText || cart.id.toString().includes(searchText);

    const matchCartId =
      filters.cartId.length === 0 || filters.cartId.includes(cart.id);

    const matchQty =
      filters.quantity === 0 || cart.totalQuantity >= filters.quantity;

    return matchSearch && matchCartId && matchQty;
  });

  return viewType === "list" ? (
    <CartsTable carts={filteredCarts} />
  ) : (
    <CartsGrid carts={filteredCarts} />
  );
};

export default CartsPage;
