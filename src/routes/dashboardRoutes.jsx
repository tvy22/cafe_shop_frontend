import { Routes, Route} from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import OrderManagement from '../pages/dashboard/OrderManagement'
import MenuManagement from '../pages/dashboard/MenuManagement'
import CategoryManagement from '../pages/dashboard/CategoryManagement'

export default function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/orders" element={<OrderManagement/>}/>
            <Route path="/menu" element={<MenuManagement/>}/>
            <Route path="/categories" element={<CategoryManagement/>}/>
        </Routes>
    )
}