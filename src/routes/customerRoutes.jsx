import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/customer/LoginPage'
import HomePage from '../pages/customer/HomePage'
import {
    CartPage,
    OrderConfirmationPage,
    PaymentPage,
    ReviewOrderPage,
} from '../pages/customer/OrderFlowPages'

export default function CustomerRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<ReviewOrderPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
        </Routes>
    )
}