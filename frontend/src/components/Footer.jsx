import { NavLink } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer-section">

      <div className="contenedorLogos">
        <div className="contenedorRedes">
          <NavLink to="https://www.instagram.com/" target="_blank">
            <img src="./logo-insta.png" alt="" className="logoFooter" />
          </NavLink>
          <NavLink to="https://www.whatsapp.com/" target="_blank">
            <img src="./logo-wapp.png" alt="" className="logoFooter" />
          </NavLink>
          <NavLink to="https://www.gmail.com/" target="_blank">
            <img src="./logo-correo.png" alt="" className="logoFooter" />
          </NavLink>
        </div>

        <div>
          <img src="./logo-webpay.png" alt="" className="logoWebpay" />
        </div>
      </div>

      <p className="footerTexto">© 2025 - PetCare - Todos los derechos reservados</p>
    </footer>
  )
}

export default Footer