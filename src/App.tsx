
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetHomePage } from './pages/PetHomePage';
import { LandingPage } from './pages/LandingPage';
import { ShelterRegistrationPage } from './pages/ShelterRegistrationPage';

// HU24 — Registro de Adoptante
import { AdopterRegistrationPage } from './pages/AdopterRegistrationPage';

// HU28 — Registro de Adopción Formal
import { AdoptionRegistrationPage } from './pages/AdoptionRegistrationPage';

// HU30 — Actualizar Resultado de Convivencia
import { TrialCohabitationUpdatePage } from './pages/TrialCohabitationUpdatePage';

// HUxx — Consulta de Veterinarios
import { VeterinarianDirectoryPage } from './pages/VeterinarianDirectoryPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de inicio con los módulos */}
        <Route path="/" element={<LandingPage />} />

        {/* HU01 — Inventario de mascotas */}
        <Route path="/pets" element={<PetHomePage />} />

        {/* HU03 — Registro de Refugios */}
        <Route path="/register-shelter" element={<ShelterRegistrationPage />} />

        {/* HU24 — Registro de Adoptante */}
        <Route path="/register-adopter" element={<AdopterRegistrationPage />} />

        {/* HU28 — Registro de Adopción Formal */}
        <Route path="/register-adoption" element={<AdoptionRegistrationPage />} />

        {/* HU30 — Actualizar Resultado de Convivencia de Prueba */}
        <Route path="/update-trial-cohabitation" element={<TrialCohabitationUpdatePage />} />

        {/* HUxx — Consulta de Veterinarios */}
        <Route path="/veterinarians" element={<VeterinarianDirectoryPage />} />

        {/* Ruta 404 */}
        <Route path="*" element={<div className="p-10">404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
