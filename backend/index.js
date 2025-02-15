
import express from "express"
import cors from "cors"
import "dotenv/config"

import authRoute from "./src/routes/auth.route.js"
import checkoutRoute from "./src/routes/checkout.route.js"
import productoRoute from "./src/routes/producto.route.js"

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use("/auth", authRoute)
app.use("/productos", productoRoute)
app.use("/checkouts", checkoutRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
})