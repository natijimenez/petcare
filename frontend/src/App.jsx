/* eslint-disable react-hooks/exhaustive-deps */
// src/App.jsx
import { Route, Routes, Navigate, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useUser } from "./context/UserContext"
import { CartProvider } from "./context/CartContext"
import Navigation from "./components/Navigation"
import Producto from "./pages/Producto"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import Footer from "./components/Footer"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import Perros from "./pages/Perros"
import Gatos from "./pages/Gatos"
import Admin from "./pages/Admin"

function App() {
  const { token, email } = useUser()
  const [productos, setProductos] = useState([])
  const navigate = useNavigate()
  const { VITE_APIURL: APIURL } = import.meta.env

  useEffect(() => {
    fetchProductos()
  }, [])

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${APIURL}/productos`)
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor")
      }
      const data = await response.json()
      setProductos(data)
    } catch (error) {
      console.error("Error al obtener productos:", error)
    }
  }

  const FilteredGatos = () => {
    const { subcategoria } = useParams()
    let filtered = productos.filter((p) => p.categoria === "gato")
    if (subcategoria) {
      filtered = filtered.filter((p) => p.subcategoria === subcategoria)
    }
    return <Gatos productos={filtered} />
  }

  const FilteredPerros = () => {
    const { subcategoria } = useParams()
    let filtered = productos.filter((p) => p.categoria === "perro")
    if (subcategoria) {
      filtered = filtered.filter((p) => p.subcategoria === subcategoria)
    }
    return <Perros productos={filtered} />
  }

  return (
    <CartProvider>
      <>
        <Navigation navigate={navigate} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gatos" element={<FilteredGatos />} />
          <Route path="/gatos/:subcategoria" element={<FilteredGatos />} />
          <Route path="/perros" element={<FilteredPerros />} />
          <Route path="/perros/:subcategoria" element={<FilteredPerros />} />
          <Route
            path="/register"
            element={token ? <Navigate to="/profile" /> : <RegisterPage />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/profile" /> : <LoginPage />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={
              token && email === "admin@admin.com" ? <Admin /> : <Navigate to="/" />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </>
    </CartProvider>
  )
}

export default App


