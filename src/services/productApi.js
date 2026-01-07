export const fetchProducts = async () => {
  const response = await fetch(
    "https://fakestoreapiserver.reactbd.org/api/products"
  );
  const data = await response.json();
  return data.data; 
};
