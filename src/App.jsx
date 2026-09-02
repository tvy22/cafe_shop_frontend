import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerRoutes from "./routes/customerRoutes";
import DashboardRoutes from "./routes/dashboardRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CustomerRoutes/>}/>
        <Route path="/dashboard/" element={<DashboardRoutes/>}/>
      </Routes>
    </BrowserRouter>
  )
}