import { Link } from 'react-router-dom'
import './FirstPage.css'

function FirstPage() {
  return (
    <div className="first-page-container">
      <h1 className="first-page-title">Calculez votre IMC en quelques secondes</h1>
      <h3 className="first-page-subtitle">
        Obtenez un aperçu clair et précis de votre corpulence pour suivre votre forme en toute simplicité.
      </h3>
      <Link to="/input-imc" className="first-page-btn">
        Let's GO
      </Link>
    </div>
  )
}

export default FirstPage