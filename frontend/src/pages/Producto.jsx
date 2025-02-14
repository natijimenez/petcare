import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCart } from '../context/CartContext'

const Producto = () => {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const { addProducto } = useCart()
  const { VITE_APIURL: APIURL } = import.meta.env

  useEffect(() => {
    fetchProductoById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchProductoById = async () => {
    try {
      const response = await fetch(`${APIURL}/productos/${id}`)
      if (!response.ok) {
        throw new Error("Error en la URL")
      }
      const data = await response.json()
      setProducto(data)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="sectionProductoDet">
      {producto && (
        <div className="contenedorProductoDet colorTextDet" key={producto.id}>
          <img className="productoDetImg colorTextDet" src={producto.img_url} alt={producto.nombre} />
          <div className="productoDetText">
            <h2 className="productoDetTitle colorTextDet">{producto.nombre}</h2>
            <p className="productoDetTitle colorTextDet">{producto.marca}</p>
            <p className="productoDetDesc colorTextDet">{producto.descripcion}</p>
            <div className="productoDetBtns">
              <span className="productoDetPrice colorTextDet">Precio: ${producto.precio}</span>
              <button className="productoDetBtnAdd" onClick={() => addProducto(producto)}>Añadir +</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Producto
