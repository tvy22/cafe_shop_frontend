import { useEffect, useState } from 'react'
import CartContext from './cartStore'
const CART_KEY = 'rupp-cafe-cart'
const ORDER_KEY = 'rupp-cafe-last-order'
const ORDERS_KEY = 'rupp-cafe-order-history'
const DETAILS_KEY = 'rupp-cafe-checkout-details'

function readStoredValue(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readStoredValue(CART_KEY, []))
  const [lastOrder, setLastOrder] = useState(() => readStoredValue(ORDER_KEY, null))
  const [orders, setOrders] = useState(() => {
    const storedOrders = readStoredValue(ORDERS_KEY, null)
    return Array.isArray(storedOrders) ? storedOrders : [readStoredValue(ORDER_KEY, null)].filter(Boolean)
  })
  const [checkoutDetails, setCheckoutDetails] = useState(() =>
    readStoredValue(DETAILS_KEY, { name: '', email: '', pickupTime: 'As soon as possible' }),
  )

  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart])
  useEffect(() => {
    if (lastOrder) localStorage.setItem(ORDER_KEY, JSON.stringify(lastOrder))
  }, [lastOrder])
  useEffect(() => localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)), [orders])
  useEffect(() => localStorage.setItem(DETAILS_KEY, JSON.stringify(checkoutDetails)), [checkoutDetails])

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = Number((subtotal * 0.1).toFixed(2))
  const total = Number((subtotal + tax).toFixed(2))

  function addToCart(product) {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id)
      if (existing) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...items, { ...product, quantity: 1 }]
    })
  }

  function setItemQuantity(productId, quantity) {
    setCart((items) =>
      quantity < 1
        ? items.filter((item) => item.id !== productId)
        : items.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
    )
  }

  function removeFromCart(productId) {
    setCart((items) => items.filter((item) => item.id !== productId))
  }

  function placeOrder(paymentMethod) {
    const order = {
      id: `RUPP-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      items: cart,
      details: checkoutDetails,
      paymentMethod,
      subtotal,
      tax,
      total,
    }
    setLastOrder(order)
    setOrders((currentOrders) => [...currentOrders, order])
    setCart([])
    return order
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        subtotal,
        tax,
        total,
        lastOrder,
        orders,
        checkoutDetails,
        setCheckoutDetails,
        addToCart,
        setItemQuantity,
        removeFromCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
