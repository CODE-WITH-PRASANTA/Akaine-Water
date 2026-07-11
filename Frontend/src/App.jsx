import { BrowserRouter, Routes, Route } from "react-router-dom";


import "./App.css";

import AkaineGalary from "./Component/AkaineGalary/AkaineGalary";

function App() {
  return (
    <BrowserRouter>
      

      <Routes>
          <Route path='/galary' element={<AkaineGalary/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;