import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OurTeam from './Components/OurTeam/OurTeam';
import Gallery from './Components/Gallery/Gallery';
import Testiminial from './Components/Testiminial/Testiminial';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OurTeam />} />
        <Route path="/OurTeam" element={<OurTeam />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Testiminial" element={<Testiminial/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;