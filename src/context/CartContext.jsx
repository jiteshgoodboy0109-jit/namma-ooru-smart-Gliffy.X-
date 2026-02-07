import { useState, createContext, useContext, useCallback } from 'react'
import { useToast } from './ToastContext'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const { addToast } = useToast()

    const addToCart = useCallback((product) => {
        setCart((prev) => {
            const existingIndex = prev.findIndex(item => item.id === product.id)
            if (existingIndex >= 0) {
                const updated = [...prev]
                updated[existingIndex] = { ...updated[existingIndex], quantity: (updated[existingIndex].quantity || 1) + 1 }
                return updated
            }
            return [...prev, { ...product, quantity: 1 }]
        })
        addToast(`${product.name} added to cart!`)
    }, [addToast])

    const removeFromCart = useCallback((index) => {
        setCart((prev) => {
            const next = [...prev]
            next.splice(index, 1)
            return next
        })
    }, [])

    const updateQuantity = useCallback((index, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(index)
            return
        }
        setCart((prev) => {
            const updated = [...prev]
            updated[index] = { ...updated[index], quantity: newQuantity }
            return updated
        })
    }, [removeFromCart])

    const clearCart = useCallback(() => {
        setCart([])
    }, [])

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
