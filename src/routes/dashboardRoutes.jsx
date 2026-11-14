import { Routes, Route} from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import OrderManagement from '../pages/dashboard/OrderManagement'
import MenuManagement from '../pages/dashboard/MenuManagement'
import CategoryManagement from '../pages/dashboard/CategoryManagement'
import StaffManagement from '../pages/dashboard/StaffManagement'
import LiveOrderQueue from '../pages/dashboard/LiveOrderQueue'
import Reports from '../pages/dashboard/Reports'
import AddEditDrink from '../pages/dashboard/AddEditDrink'
import AddEditCategory from '../pages/dashboard/AddEditCategory'

export default function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/orders" element={<OrderManagement/>}/>
            <Route path="/menu" element={<MenuManagement/>}/>
            <Route path="/categories" element={<CategoryManagement/>}/>
            <Route path="/staff" element={<StaffManagement/>}/>
            <Route path="/live-orders" element={<LiveOrderQueue/>}/>
            <Route path="/reports" element={<Reports/>}/>
            <Route path="/menu/add" element={<AddEditDrink/>}/>
            <Route path="/menu/edit/:id" element={<AddEditDrink/>}/>
            <Route path="/categories/add" element={<AddEditCategory/>}/>
            <Route path="/categories/edit/:id" element={<AddEditCategory/>}/>
        </Routes>
    )
}