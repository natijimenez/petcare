import pool from "../db.js"

const create = async (req, res) => {
  try {
    const { cart } = req.body
    const user_id = req.user && req.user.id

    if (!user_id) {
      return res.status(401).json({ error: "No autenticado" })
    }

    if (!cart || cart.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío" })
    }

    let total_price = 0

    for (const item of cart) {
      const productResult = await pool.query(
        "SELECT precio FROM productos WHERE id = $1",
        [item.product_id]
      )

      if (productResult.rows.length === 0) {
        return res.status(400).json({ error: `Producto con ID ${item.product_id} no encontrado` })
      }

      const product_price = productResult.rows[0].precio
      total_price += product_price * item.quantity
      item.precio = product_price
    }

    const orderResult = await pool.query(
      "INSERT INTO orders (usuario_id, total_price) VALUES ($1, $2) RETURNING id",
      [user_id, total_price]
    )

    const order_id = orderResult.rows[0].id

    for (const item of cart) {
      await pool.query(
        "INSERT INTO order_items (order_id, product_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)",
        [order_id, item.product_id, item.quantity, item.precio]
      )
    }

    return res.json({
      message: "Checkout exitoso",
      order_id: order_id,
      total_price: total_price,
      user: req.user,
    })

  } catch (error) {
    console.error("Error en checkout:", error.message)
    return res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

export const checkoutController = { create }
