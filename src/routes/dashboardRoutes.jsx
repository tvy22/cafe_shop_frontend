import { Routes, Route} from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import OrderManagement from '../pages/dashboard/OrderManagement'
import MenuManagement from '../pages/dashboard/MenuManagement'

export default function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/orders" element={<OrderManagement/>}/>
            <Route path="/menu" element={<MenuManagement/>}/>
        </Routes>
    )
}