import { Routes, Route} from 'react-router-dom'
import Dashboard from '../pages/dashboard'

export default function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>} />
        </Routes>
    )
}