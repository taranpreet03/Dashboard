export const fetchCarts = async () => {
  const response = await fetch("https://dummyjson.com/carts");
  const data = await response.json();
  return data.carts; 
};
