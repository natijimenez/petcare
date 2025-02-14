import { useEffect, useState } from "react"
import CardProducto from "../components/CardProducto"
import SubcategoriasGato from "../components/SubcategoriasGato"
import { useParams } from "react-router-dom"

const Gatos = () => {
  const [productos, setProductos] = useState([])
  const { subcategoria } = useParams()
  const { VITE_APIURL: APIURL } = import.meta.env

  useEffect(() => {
    fetchProductos()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcategoria])

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${APIURL}/productos`)
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor")
      }
      let data = await response.json()
      data = data.filter(p => p.categoria === "gato")
      if (subcategoria) {
        data = data.filter(p => p.subcategoria === subcategoria)
      }
      setProductos(data)
    } catch (error) {
      console.error("Error al obtener productos:", error)
    }
  }

  return (
    <div className="gatoPage">
      <section className="contenedorGatos">
        <div className="banner-container banner-container-gato d-flex align-items-center justify-content-center">
          <div className="banner-texto">
            <h1>¡Lo mejor para tu gatito!</h1>
            <hr />
          </div>
        </div>
      </section>
      <section>
        <SubcategoriasGato />
      </section>
      <section className="cards-container">
        <div className="container-items">
          {productos.map((producto) => (
            <CardProducto key={producto.id} producto={producto} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Gatos
