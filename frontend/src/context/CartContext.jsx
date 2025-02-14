import { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addProducto = (producto) => {
    const existingProducto = cart.find(item => item.id === producto.id)
    if (existingProducto) {
      setCart(cart.map(item =>
        item.id === producto.id ? { ...item, count: item.count + 1 } : item
      ))
    } else {
      setCart([...cart, { ...producto, count: 1 }])
    }
  }

  const removeProducto = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const reduceProducto = (id) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === id
          ? { ...item, count: Math.max(item.count - 1, 0) }
          : item
      )
      return updatedCart.filter(item => item.count > 0)
    })
  }

  const totalQuantity = () => {
    return cart.reduce((total, item) => total + item.count, 0)
  }

  const totalPrice = () => {
    return cart.reduce((total, item) => total + item.precio * item.count, 0)
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addProducto, removeProducto, reduceProducto, totalQuantity, totalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
