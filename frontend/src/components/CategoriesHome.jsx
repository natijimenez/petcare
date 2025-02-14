import { NavLink } from "react-router-dom"

const CategoriesHome = () => {
    return (
        <div className="categorySection">
            <h2>Categorías</h2>
            <div className="boxSection">
                <div className="boxCategory">
                    <NavLink to="/perros" className="imgCategory">
                        <img src="/002-dog.png" alt="Perros" />
                        <span className="txtCategory">Perros</span>
                    </NavLink>
                </div>
                <div className="boxCategory">
                    <NavLink to="/gatos" className="imgCategory">
                        <img src="/001-cat.png" alt="Gatos" />
                        <span className="txtCategory">Gatos</span>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default CategoriesHome
