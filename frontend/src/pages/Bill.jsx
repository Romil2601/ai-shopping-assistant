import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Bill() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Header />
        <p className="text-center mt-20">No invoice found</p>
      </div>
    );
  }

  const { cart, total, orderId } = state;
  const date = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {/* 🎟️ TICKET */}
        <div className="relative w-full max-w-md bg-slate-900 rounded-2xl shadow-xl border-slate-800 overflow-hidden">

          {/* TOP */}
          <div className="p-6 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-xl font-semibold">Thank you!</h2>
            <p className="text-slate-400 text-sm">
              Your order has been placed successfully
            </p>
          </div>

          {/* PERFORATION */}
          <div className="relative my-2">
            <div className="border-t border-dashed border-slate-700 mx-6" />
            <div className="absolute -left-3 top-1/2 w-6 h-6 bg-slate-950 rounded-full -translate-y-1/2" />
            <div className="absolute -right-3 top-1/2 w-6 h-6 bg-slate-950 rounded-full -translate-y-1/2" />
          </div>

          {/* DETAILS */}
          <div className="p-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Order ID</span>
              <span className="font-medium">{orderId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Date & Time</span>
              <span>{date}</span>
            </div>
          </div>

          {/* ITEMS */}
          <div className="px-6 space-y-3">
            {cart.map((item) => (
              <div
                key={item.name}
                className="flex justify-between text-sm"
              >
                <span className="truncate">
                  {item.name} × {item.qty}
                </span>
                <span>
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}
          </div>

          {/* PERFORATION */}
          <div className="relative my-4">
            <div className="border-t border-dashed border-slate-700 mx-6" />
            <div className="absolute -left-3 top-1/2 w-6 h-6 bg-slate-950 rounded-full -translate-y-1/2" />
            <div className="absolute -right-3 top-1/2 w-6 h-6 bg-slate-950 rounded-full -translate-y-1/2" />
          </div>

          {/* TOTAL */}
          <div className="px-6 pb-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-green-400">₹{total}</span>
            </div>

            <button
              onClick={() => navigate("/assistant")}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-500 transition py-2.5 rounded-lg text-sm font-medium"
            >
              Back to Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}