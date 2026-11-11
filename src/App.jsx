import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerRoutes from "./routes/customerRoutes";
import DashboardRoutes from "./routes/dashboardRoutes";
import CartProvider from "./context/CartContext";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/dashboard/*" element={<DashboardRoutes/>}/>
          <Route path="/*" element={<CustomerRoutes/>}/>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}