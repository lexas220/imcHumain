import { Routes, Route } from 'react-router-dom'
import FirstPage from './components/FirstPage/FirstPage'
import InputImcPage from './components/InputImc/InputImcPage'
import ResultPage from './components/FinalPage/ResultPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/input-imc" element={<InputImcPage />} />
      <Route path='/result' element={<ResultPage />} />
    </Routes>
  )
}

export default App