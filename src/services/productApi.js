export const fetchProducts = async (searchText = "") => {
  const url = searchText
    ? `https://dummyjson.com/products/search?q=${searchText}`
    : `https://dummyjson.com/products`;

  const response = await fetch(url);
  const data = await response.json();

  return data.products; 
};
