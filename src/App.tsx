
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

// HU16 / HU17 / HU18 — Ver, Marcar y Eliminar Notificaciones
import { NotificationsPage } from './pages/NotificationsPage';

// HU19 — Enviar Mensaje
import { SendMessagePage } from './pages/SendMessagePage';

// HU20 / HU21 / HU22 — Crear, Ver y Eliminar Reseñas
import { ReviewsListPage } from './pages/ReviewsListPage';

// HU23 — Registrar Evento de Refugio
import { ShelterEventRegistrationPage } from './pages/ShelterEventRegistrationPage';

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

        {/* HU16 / HU17 / HU18 — Notificaciones */}
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* HU19 — Enviar Mensaje */}
        <Route path="/send-message" element={<SendMessagePage />} />

        {/* HU20 / HU21 / HU22 — Reseñas */}
        <Route path="/reviews" element={<ReviewsListPage />} />

        {/* HU23 — Registrar Evento de Refugio */}
        <Route path="/register-shelter-event" element={<ShelterEventRegistrationPage />} />

        {/* Ruta 404 */}
        <Route path="*" element={<div className="p-10">404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
