export const fetchProducts = async () => {
  const res = await fetch("http://localhost:8000/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};