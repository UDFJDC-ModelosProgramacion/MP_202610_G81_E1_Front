
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetHomePage } from './pages/PetHomePage';
import { HomePage } from './pages/HomePage';
import { TestLandingPage } from './pages/TestLandingPage';
import { ShelterRegistrationPage } from './pages/ShelterRegistrationPage';
import OpenClinical from './features/clinical/OpenClinical';
import RegisterEvent from './features/medical-event/RegisterEvent';
import EditEvent from './features/medical-event/EditEvent';
import VaccineCatalog from './features/vaccine/VaccineCatalog';
import ApplyVaccine from './features/vaccine/ApplyVaccine';
import ConsultClinical from './features/clinical/ConsultClinical';
import DeleteRecord from './features/admin/DeleteRecord'

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
// HUxx — Consulta de Veterinarios
import { VeterinarianDirectoryPage } from './pages/VeterinarianDirectoryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/clinical/open" element={<OpenClinical />} />
        <Route path="/clinical/consult" element={<ConsultClinical />} />
        <Route path="/events/register" element={<RegisterEvent />} />
        <Route path="/events/edit" element={<EditEvent />} />
        <Route path="/vaccines" element={<VaccineCatalog />} />
        <Route path="/vaccines/apply" element={<ApplyVaccine />} />
        <Route path="/admin/delete" element={<DeleteRecord />} />
        {/* Nueva Página de inicio profesional */}
        <Route path="/" element={<HomePage />} />
        
        {/* Página de desarrollo con los módulos (antigua LandingPage) */}
        <Route path="/test" element={<TestLandingPage />} />

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
        {/* HUxx — Consulta de Veterinarios */}
        <Route path="/veterinarians" element={<VeterinarianDirectoryPage />} />

        {/* Ruta 404 */}
        <Route path="*" element={<div className="p-10">404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
