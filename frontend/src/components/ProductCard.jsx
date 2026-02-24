import { useCart } from "../context/CartContext";

export default function ProductCard({ products = [] }) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 my-3">
      {products.map((p, i) => (
        <div
          key={i}
          className="border border-slate-700 rounded-lg p-4 bg-slate-800 text-white"
        >
          <h3 className="font-bold">{p.name}</h3>
          <p>₹{p.price}</p>
          <p>⭐ {p.rating}</p>

          <button
            onClick={() => addToCart(p)}
            className="mt-2 w-full bg-blue-600 text-white py-1 rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}