import "./error.css"
import { Link } from "react-router-dom"

export default function Error() {
    return (
        <div className="error"> 
            <span className="ops">Oh, No!</span>
            <h1>
                Página não encontrada
            </h1>
            <div className="home">
                <Link to="/admin" >Voltar para home</Link>
            </div>

        </div>
    )
}