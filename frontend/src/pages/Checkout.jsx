import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

        {!cart.length ? (
          <div className="text-center text-slate-400 mt-20">
            🛒 Your cart is empty
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-4"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-slate-400">
                      ₹{item.price} × {item.qty}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="text-sm text-red-400 hover:text-red-300 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="flex items-center justify-between mt-8 border-t border-slate-800 pt-6">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold text-green-400">
                ₹{total}
              </span>
            </div>

            {/* ACTION */}
            <button
              onClick={() => {
                const orderId = "ORD-" + Date.now();

                navigate("/bill", {
                  state: {
                    cart,
                    total,
                    orderId,
                  },
                });

                clearCart();
              }}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-500 transition text-white py-3 rounded-lg font-medium"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}
