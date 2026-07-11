import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PricingAndPlans from './Pages/PricingAndPlans/PricingAndPlans'
import OurServices from './Pages/OurServices/OurServices'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* Correctly structured route wrapping your component */}
        <Route path="/plan" element={<PricingAndPlans />} />
        <Route path="/ourservice" element={<OurServices />} />
        {/* You can add your Home page or other pages here as well, for example:
        <Route path="/" element={<Home />} /> 
        */}
      </Routes>
    </BrowserRouter>
  )
}

export default App