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

const SubcategoriasPerro = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
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
                    slidesToShow: 2,
                },
            },
        ],
    }

    return (
        <div className="SubCatSection">
            <div className="SlideSubCat" style={{ margin: "auto", padding: "20px" }}>
                <Slider {...settings}>
                    <NavLink to="/perros/" className="boxSubCat">
                        <img src="/002-btn-todo-perro.png" className="imgSubCat" style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "10px",
                            cursor: "pointer",
                        }} alt="Todo Perro" />
                        <p>Ver todo</p>
                    </NavLink>
                    <NavLink to="/perros/alimento" className="boxSubCat">
                        <img src="/002-btn-alimento.png" className="imgSubCat" style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "10px",
                            cursor: "pointer",
                        }} alt="Alimento Perro" />
                        <p>Alimento</p>
                    </NavLink>
                    <NavLink to="/perros/higiene" className="boxSubCat">
                        <img src="/002-btn-higiene.png" className="imgSubCat" style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "10px",
                            cursor: "pointer",
                        }} alt="Higiene Perro" />
                        <p>Cuidado</p>
                    </NavLink>
                    <NavLink to="/perros/juguetes" className="boxSubCat">
                        <img src="/002-btn-juguetes.png" className="imgSubCat" style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "10px",
                            cursor: "pointer",
                        }} alt="Juguetes Perro" />
                        <p>Juguetes</p>
                    </NavLink>
                    <NavLink to="/perros/accesorios" className="boxSubCat">
                        <img src="/002-btn-accesorios.png" className="imgSubCat" style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "10px",
                            cursor: "pointer",
                        }} alt="Accesorios Perro" />
                        <p>Accesorios</p>
                    </NavLink>
                </Slider>
            </div>
        </div>
    )
}

export default SubcategoriasPerro
