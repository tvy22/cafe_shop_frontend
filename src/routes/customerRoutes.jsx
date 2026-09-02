import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/customer/LoginPage'
import HomePage from '../pages/customer/HomePage'

export default function CustomerRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}