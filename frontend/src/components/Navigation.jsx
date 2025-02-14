import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'

const Navigation = () => {
  const { totalPrice } = useCart()
  const { token, logout } = useUser()
  const navigate = useNavigate()
  const setActiveClass = ({ isActive }) => (isActive ? 'active' : 'nav-btn')

  return (
    <Navbar expand="lg" className="navigation-bar sticky-top custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/">
          <img className="logoNav" src="/logo-pet.png" alt="PetCare logo" />
          PetCare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavLink to="/" className={setActiveClass}>Home</NavLink>
            <NavLink to="/perros" className={setActiveClass} onClick={() => navigate('/perros')}>
              Perros
            </NavLink>
            <NavLink to="/gatos" className={setActiveClass} onClick={() => navigate('/gatos')}>
              Gatos
            </NavLink>
            {token ? (
              <>
                <NavLink to="/profile" className={setActiveClass}>Profile</NavLink>
                <a className="nav-btn" onClick={logout} style={{ cursor: 'pointer' }}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <NavLink to="/login" className={setActiveClass}>Login</NavLink>
                <NavLink to="/register" className={setActiveClass}>Register</NavLink>
              </>
            )}
          </Nav>
          <Form className="d-flex">
            <NavLink to="/cart" className="nav-btn-total">
              🛒 Total: ${totalPrice().toLocaleString()}
            </NavLink>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation

