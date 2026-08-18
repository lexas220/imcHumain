import { useLocation, Link, Navigate } from 'react-router-dom'
import './ResultPage.css'

function ResultPage() {
  const location = useLocation()

  if (!location.state) {
    return <Navigate to="/input-imc" replace />
  }

  const { height, weight } = location.state
  const h = height > 3 ? height / 100 : height
  const imc = parseFloat((weight / (h * h)).toFixed(1))

  let category = ''
  let color = ''
  let angle = -90

  if (imc < 18.5) {
    category = 'Maigreur'
    color = '#3b82f6'
    angle = -90 + (Math.max(imc, 10) - 10) * (36 / 8.5)
  } else if (imc < 25) {
    category = 'Normal'
    color = '#22c55e'
    angle = -54 + (imc - 18.5) * (36 / 6.5)
  } else if (imc < 30) {
    category = 'Surpoids'
    color = '#eab308'
    angle = -18 + (imc - 25) * (36 / 5)
  } else if (imc < 40) {
    category = 'Obésité modérée'
    color = '#f97316'
    angle = 18 + (imc - 30) * (36 / 10)
  } else {
    category = 'Obésité sévère'
    color = '#ef4444'
    angle = 54 + (Math.min(imc, 50) - 40) * (36 / 10)
  }

  return (
    <div className="result-page-container">
      <div className="result-card">
        <h1 className="result-title">Résultat</h1>

        {/* Jauge SVG */}
        <svg viewBox="0 0 200 120" style={{ width: '100%', maxWidth: '280px', margin: '0 auto' }}>
          <path d="M 20 100 A 80 80 0 0 1 45 43" fill="none" stroke="#3b82f6" strokeWidth="22" />
          <path d="M 45 43 A 80 80 0 0 1 85 21" fill="none" stroke="#22c55e" strokeWidth="22" />
          <path d="M 85 21 A 80 80 0 0 1 115 21" fill="none" stroke="#eab308" strokeWidth="22" />
          <path d="M 115 21 A 80 80 0 0 1 155 43" fill="none" stroke="#f97316" strokeWidth="22" />
          <path d="M 155 43 A 80 80 0 0 1 180 100" fill="none" stroke="#ef4444" strokeWidth="22" />

          <g transform={`rotate(${angle}, 100, 100)`} style={{ transition: 'transform 0.8s ease-out' }}>
            <polygon points="97,100 103,100 100,25" fill="#231F20" />
            <circle cx="100" cy="100" r="7" fill="#231F20" />
          </g>
        </svg>

        <h2 style={{ margin: '15px 0 5px', fontSize: '2rem' }}>IMC : {imc}</h2>
        <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: color, margin: '0 0 1.5rem' }}>
          {category}
        </p>

        <Link to="/input-imc" className="btn-return">
          ← Refaire un calcul
        </Link>
      </div>
    </div>
  )
}

export default ResultPage