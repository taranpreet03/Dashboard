export const fetchProducts = async ({
  page = 1,
  limit = 10,
  searchText = "",
  sortKey = "",
  sortOrder = "asc",
} = {}) => {
  const skip = (page - 1) * limit;

  let baseUrl = searchText
    ? `https://dummyjson.com/products/search?q=${searchText}`
    : `https://dummyjson.com/products`;

  const params = new URLSearchParams();

  params.append("limit", limit);
  params.append("skip", skip);

  if (sortKey) {
    params.append("sortBy", sortKey);
    params.append("order", sortOrder);
  }

  const url = `${baseUrl}?${params.toString()}`;

  // console.log("API CALL:", url);
  

  const response = await fetch(url);
  const data = await response.json();

  return {
    products: data.products,
    total: data.total,
  };
};
