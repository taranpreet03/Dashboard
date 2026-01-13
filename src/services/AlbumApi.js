export const fetchProducts = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/albums"
  );
  const data = await response.json();
  return data.data; 
};
