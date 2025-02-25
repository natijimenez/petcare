import { useUser } from "../context/UserContext"
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react"
import { Button, Table, Modal, Form, Card } from "react-bootstrap"

const Admin = () => {
  const { logout } = useUser()
  const [products, setProducts] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [addFormData, setAddFormData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    img_url: "",
    marca: "",
    precio: "",
    sku: "",
    categoria: "",
    subcategoria: "",
    cantidad: ""
  })
  const [editFormData, setEditFormData] = useState({})
  const { VITE_APIURL: APIURL } = import.meta.env

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${APIURL}/productos`)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleAddInputChange = (e) => {
    setAddFormData({ ...addFormData, [e.target.name]: e.target.value })
  }

  const handleEditInputChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value })
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${APIURL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addFormData),
      })

      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor")
      }

      await fetchProducts()
      setAddFormData({
        id: "",
        nombre: "",
        descripcion: "",
        img_url: "",
        marca: "",
        precio: "",
        sku: "",
        categoria: "",
        subcategoria: "",
        cantidad: ""
      })
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  const handleEdit = (product) => {
    setEditProduct(product)
    setEditFormData({ ...product })
    setModalOpen(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${APIURL}/productos/${editProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      })

      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor")
      }

      await fetchProducts()
      setModalOpen(false)
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${APIURL}/productos/${id}`, { method: "DELETE" })

      if (!response.ok) {
        throw new Error("Error eliminando el producto")
      }

      fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <div className="contenedorAdmin p-4">
      <h2>Administrador</h2>
      <div className="profileAdmin">
        <img src="/foto-admin.png" className="imagenPerfil" alt="Perfil" />
        <div className="profileDetAdmin">
          <button className="btnCloseSesion" onClick={logout}>Cerrar sesión</button>
        </div>
      </div>
      <Card className="addProduct p-3">
        <h3 className="mb-3">Agregar Producto</h3>
        <Form onSubmit={handleAddProduct}>
          {Object.keys(addFormData).map((key) => (
            <Form.Group className="mb-3" key={key}>
              <Form.Label className="addProductForm">{key.toUpperCase()}</Form.Label>
              <Form.Control name={key} value={addFormData[key]} onChange={handleAddInputChange} required />
            </Form.Group>
          ))}
          <Button type="submit" className="btnAddProduct">Agregar Producto</Button>
        </Form>
      </Card>
      <Card className="mt-4 p-3 tablaProductos">
        <h2 className="mb-3">Lista de Productos</h2>
        <div className="table-responsive">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {Object.keys(addFormData).map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  {Object.keys(addFormData).map((key) => (
                    <td key={key}>{product[key] || "N/A"}</td>
                  ))}
                  <td>
                    <Button className="btnEdit me-2" onClick={() => handleEdit(product)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button className="btnDelete" onClick={() => handleDelete(product.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            {Object.keys(editFormData).map((key) => (
              <Form.Group className="mb-3" key={key}>
                <Form.Label className="modalEdit mb-3">{key.toUpperCase()}</Form.Label>
                <Form.Control name={key} value={editFormData[key] || ""} onChange={handleEditInputChange} required />
              </Form.Group>
            ))}
            <Button type="submit" className="btnModalEdit">Guardar Cambios</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Admin
