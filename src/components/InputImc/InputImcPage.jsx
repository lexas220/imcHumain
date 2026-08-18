import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './InputImcPage.css'

function InputImcPage() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleKeyDown = (e) => {
    if (['-', 'e', 'E', '+'].includes(e.key)) {
      e.preventDefault()
    }
  }

  const handleHeightChange = (e) => {
    const val = e.target.value
    if (val === '') {
      setHeight('')
      return
    }

    if (val.includes('.') && val.split('.')[1].length > 2) return

    const num = parseFloat(val)
    if (isNaN(num) || num < 0) return
    if (num > 272) return
    if (num <= 3 && num > 2.72) return

    setHeight(val)
  }

  const handleWeightChange = (e) => {
    const val = e.target.value
    if (val === '') {
      setWeight('')
      return
    }

    if (val.includes('.') && val.split('.')[1].length > 1) return

    const num = parseFloat(val)
    if (isNaN(num) || num < 0 || num > 500) return

    setWeight(val)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const numHeight = parseFloat(height)
    const numWeight = parseFloat(weight)

    if (!numHeight || !numWeight || numHeight <= 0 || numWeight <= 0) {
      setError('Veuillez entrer une taille et un poids valides.')
      return
    }

    if (numHeight < 0.5 || (numHeight > 3 && numHeight < 50)) {
      setError('Veuillez entrer une taille minimale valide (ex: 175 cm ou 1.75 m).')
      return
    }

    navigate('/result', {
      state: {
        height: numHeight,
        weight: numWeight
      }
    })
  }

  return (
    <div className="input-page-container">
      <div className="imc-card">
        <h1 className="imc-title">Insérez vos données</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="height" className="form-label">
              Taille (max 2.72 m ou 272 cm)
            </label>
            <input
              id="height"
              className="form-input"
              type="number"
              step="0.01"
              min="0.5"
              placeholder="Ex: 1.75 ou 175"
              value={height}
              onKeyDown={handleKeyDown}
              onChange={handleHeightChange}
              required
            />
          </div>

          <div>
            <label htmlFor="weight" className="form-label">
              Poids (max 350 kg)
            </label>
            <input
              id="weight"
              className="form-input"
              type="number"
              step="0.1"
              min="1"
              max="350"
              placeholder="Ex: 70"
              value={weight}
              onKeyDown={handleKeyDown}
              onChange={handleWeightChange}
              required
            />
          </div>

          {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', margin: 0 }}>{error}</p>}

          <button type="submit" className="btn-submit">
            Calculer mon IMC
          </button>
        </form>
      </div>
    </div>
  )
}

export default InputImcPage