import { Routes, Route} from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import OrderManagement from '../pages/dashboard/OrderManagement'

export default function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/orders" element={<OrderManagement/>}/>
        </Routes>
    )
}