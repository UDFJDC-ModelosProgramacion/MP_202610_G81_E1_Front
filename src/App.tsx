import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetHomePage } from './pages/PetHomePage';
import { LandingPage } from './pages/LandingPage'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de inicio con los 4 modulos (mirar LandingPage, es temporal solamente para el calificable) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* HU01 */}
        <Route path="/pets" element={<PetHomePage />} />
        
        {/* Placeholder para futuras rutas */}
        <Route path="*" element={<div className="p-10">404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
