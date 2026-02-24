export default function ProductPanel({ products = [] }) {
  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  return (
    <div className="w-1/3 p-4 border-l overflow-y-auto">
      {products.map((p, i) => (
        <div key={i} className="mb-4 border p-3 rounded text-white">
          <h3 className="font-bold">{p.name}</h3>
          <p>₹{p.price}</p>
          <p>⭐ {p.rating}</p>
        </div>
      ))}
    </div>
  );
}