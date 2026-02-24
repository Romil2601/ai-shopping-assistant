import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AssistantPage from "./pages/AssistantPage.jsx";
import Resources from "./pages/Resources.jsx";
import UseCase from "./pages/UseCase.jsx";
import Checkout from "./pages/Checkout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Bill from "./pages/Bill.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/usecase" element={<UseCase />} />

      {/* 🔒 PROTECTED ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/bill" element={<Bill />} />
      </Route>
    </Routes>
  );
}