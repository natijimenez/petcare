/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
import Slider from "react-slick"

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#5756562d" }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#5756562d" }}
      onClick={onClick}
    />
  )
}

const DestacadosHome = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (

    <div className="destacadosSection">
      <h2>Productos destacados</h2>
      <div style={{ width: "70%", margin: "auto", padding: "20px" }}>
        <Slider {...settings}>
          <NavLink to="/gatos/alimento" className="boxSubCat">
            <img src="/001-destacado.png" className="imgSubCat" style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              cursor: "pointer",
            }} alt="destacado" />
          </NavLink>

          <NavLink to="/perros/juguetes" className="boxSubCat">
            <img src="/002-destacado.png" className="imgSubCat" style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              cursor: "pointer",
            }} alt="destacado" />
          </NavLink>

          <NavLink to="/perros/alimento" className="boxSubCat">
            <img src="/003-destacado.png" className="imgSubCat" style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              cursor: "pointer",
            }} alt="destacado" />
          </NavLink>

          <NavLink to="/gatos/higiene" className="boxSubCat">
            <img src="/004-destacado.png" className="imgSubCat" style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              cursor: "pointer",
            }} alt="destacado" />
          </NavLink>

          <NavLink to="gatos/accesorios" className="boxSubCat">
            <img src="/005-destacado.png" className="imgSubCat" style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              cursor: "pointer",
            }} alt="destacado" />
          </NavLink>

          <NavLink to="gatos/juguetes" className="boxSubCat">
            <img src="/006-destacado.png" className="imgSubCat" style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              cursor: "pointer",
            }} alt="destacado" />
          </NavLink>

          <NavLink to="perros/accesorios" className="boxSubCat">
            <img src="/007-destacado.png" className="imgSubCat" style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              cursor: "pointer",
            }} alt="destacado" />
          </NavLink>

          <NavLink to="perros/higiene" className="boxSubCat">
            <img src="/008-destacado.png" className="imgSubCat" style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              cursor: "pointer",
            }} alt="destacado" />
          </NavLink>
        </Slider>
      </div>

    </div>
  )
}

export default DestacadosHome