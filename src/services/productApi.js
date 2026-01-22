export const fetchProducts = async ({
  searchText = "",
  sortKey = "",
  sortOrder = "asc",
} = {}) => {
  let baseUrl = searchText
    ? `https://dummyjson.com/products/search?q=${searchText}`
    : `https://dummyjson.com/products`;

  const params = new URLSearchParams();

  if (sortKey) {
    params.append("sortBy", sortKey);
    params.append("order", sortOrder);
  }

  const url = params.toString()
    ? `${baseUrl}?${params.toString()}`
    : baseUrl;

  console.log("API CALL:", url);

  const response = await fetch(url);
  const data = await response.json();

  return data.products;
};
