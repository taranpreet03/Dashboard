export const fetchCategories = async () => {
  const response = await fetch(
    "https://fakestoreapiserver.reactbd.org/api/categories"
  );
  const data = await response.json();
  return data.data; 
};
