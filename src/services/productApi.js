export const fetchProducts = async ({
  page = 1,
  limit = 10,
  searchText = "",
  sortKey = "",
  sortOrder = "asc",
  filters = {},
} = {}) => {
  const skip = (page - 1) * limit;

  let url = "https://dummyjson.com/products";
  const params = new URLSearchParams();

  /* SEARCH */
  if (searchText) {
    url = "https://dummyjson.com/products/search";
    params.append("q", searchText);
  }

  /* PAGINATION */
  params.append("limit", limit);
  params.append("skip", skip);

  /* SORT */
  if (sortKey) {
    params.append("sortBy", sortKey);
    params.append("order", sortOrder);
  }

  const finalUrl = `${url}?${params.toString()}`;

  // console.log("FETCHING:", finalUrl);

  const response = await fetch(finalUrl);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();

  let products = data.products || [];
// filteirng

  if (filters.price) {
    products = products.filter(
      (p) => p.price <= filters.price
    );
  }
  if (filters.brand?.length) {
    products = products.filter((p) =>
      filters.brand.includes(p.brand)
    );
  }
  if (filters.category?.length) {
    products = products.filter((p) =>
      filters.category.includes(p.category)
    );
  }
  if (filters.title) {
    products = products.filter((p) =>
      p.title.toLowerCase().includes(filters.title.toLowerCase())
    );
  }



  return {
    products,
    total: products.length,
  };
};
