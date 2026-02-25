const API = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};