import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { useState } from 'react'

const Cart = () => {
  const { cart, addProducto, removeProducto, reduceProducto, totalQuantity, totalPrice, clearCart } = useCart()
  const { token } = useUser()
  const [successMessage, setSuccessMessage] = useState('')
  const { VITE_APIURL: APIURL } = import.meta.env

  const handleCheckout = async () => {
    try {
      const cartFormatted = cart.map(item => ({
        product_id: item.id,
        quantity: item.count
      }))

      const response = await fetch(`${APIURL}/checkouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ cart: cartFormatted })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Error al procesar el pago')
      }

      clearCart()
      setSuccessMessage('Compra realizada con éxito. ¡Gracias por tu pedido!')
    } catch (error) {
      console.error('Error en el checkout:', error.message)
      alert('Error en el checkout: ' + error.message)
    }
  }

  return (
    <div className="cart cartContainer">
      <h2 className='cartText carritoName'>Carrito de Compras</h2>
      {successMessage && <p className="cartText successMessage">{successMessage}</p>}
      {cart.length === 0 ? (
        <p className='cartText cartVacio'>El carrito está vacío</p>
      ) : (
        <div>
          <ul className='cartProductContainer'>
            {cart.map(item => (
              <li key={item.id} className="cartItem">
                <img src={item.img_url} alt={item.nombre} className="cartImg" />
                <div>
                  <h4 className='cartText'>{item.nombre}</h4>
                  <p className='cartText'>Precio: ${item.precio}</p>
                  <p className='cartText'>Cantidad: {item.count}</p>
                  <button className='cartBtnReduce' onClick={() => reduceProducto(item.id)}>-</button>
                  <button className='cartBtnAdd' onClick={() => addProducto(item)}>+</button>
                  <button className='cartBtnRemove' onClick={() => removeProducto(item.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div className='shopContainer'>
            <h3 className='cartTotal'>Total Productos: {totalQuantity()}</h3>
            <h3 className='cartTotal'>Total Precio: ${totalPrice().toLocaleString()}</h3>
            <button className='cartBtnPay' disabled={!token || cart.length === 0} onClick={handleCheckout}>
              Pagar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
