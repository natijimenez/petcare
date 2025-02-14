/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useCart } from '../context/CartContext'

const CardProducto = ({ producto }) => {
  const { addProducto } = useCart()
  const { img_url, nombre, marca, precio, id } = producto

  return (
    <Card style={{ width: '18rem' }} className='item'>
      <Card.Img variant="top" src={img_url} alt={nombre} />
      <ListGroup className="list-group-flush productoCard">
        <ListGroup.Item className='card-name'>{nombre}</ListGroup.Item>
        <ListGroup.Item className='card-marca'> {marca}</ListGroup.Item>
        <ListGroup.Item className="card-price">Precio: <span className="card-price">${precio.toLocaleString()}</span></ListGroup.Item>
      </ListGroup>
      <Card.Body className='card-btns-container'>
        <Link to={`/producto/${id}`} className="card-link card-btn-more">Ver más</Link>
        <a className="card-link card-btn-add" onClick={() => addProducto(producto)}>Añadir</a>
      </Card.Body>
    </Card>
  )
}

export default CardProducto
