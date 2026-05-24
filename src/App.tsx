
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetHomePage } from './pages/PetHomePage';
import { HomePage } from './pages/HomePage';
import { TestLandingPage } from './pages/TestLandingPage';
import { ShelterRegistrationPage } from './pages/ShelterRegistrationPage';
import DeleteRecord from './features/admin/DeleteRecord'
import { VaccinePage } from './pages/VaccinePage';
import { MedicalHistoryPage } from './pages/MedicalHistoryPage';
import { MedicalEventPage } from './pages/MedicalEventPage';
import { VaccinationRecordPage } from './pages/VaccinationRecordPage';

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
import { LoginPage } from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Veterinarian & Admin Routes */}
          <Route path="/vaccines" element={<ProtectedRoute allowedRoles={['VETERINARIAN', 'ADMIN']}><VaccinePage /></ProtectedRoute>} />
          <Route path="/medical-histories" element={<ProtectedRoute allowedRoles={['VETERINARIAN', 'ADMIN']}><MedicalHistoryPage /></ProtectedRoute>} />
          <Route path="/medical-events" element={<ProtectedRoute allowedRoles={['VETERINARIAN', 'ADMIN']}><MedicalEventPage /></ProtectedRoute>} />
          <Route path="/vaccination-records" element={<ProtectedRoute allowedRoles={['VETERINARIAN', 'ADMIN']}><VaccinationRecordPage /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/delete" element={<ProtectedRoute allowedRoles={['ADMIN']}><DeleteRecord /></ProtectedRoute>} />
          <Route path="/register-shelter-event" element={<ProtectedRoute allowedRoles={['ADMIN']}><ShelterEventRegistrationPage /></ProtectedRoute>} />
          <Route path="/test" element={<ProtectedRoute allowedRoles={['ADMIN']}><TestLandingPage /></ProtectedRoute>} />

          {/* Authenticated User Routes (Adopter, Vet, Admin) */}
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/send-message" element={<ProtectedRoute><SendMessagePage /></ProtectedRoute>} />
          <Route path="/reviews" element={<ProtectedRoute><ReviewsListPage /></ProtectedRoute>} />
          <Route path="/update-trial-cohabitation" element={<ProtectedRoute><TrialCohabitationUpdatePage /></ProtectedRoute>} />

          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/pets" element={<PetHomePage />} />
          <Route path="/register-shelter" element={<ShelterRegistrationPage />} />
          <Route path="/register-adopter" element={<AdopterRegistrationPage />} />
          <Route path="/register-adoption" element={<AdoptionRegistrationPage />} />
          <Route path="/veterinarians" element={<VeterinarianDirectoryPage />} />
        {/* Ruta 404 */}
        <Route path="*" element={<div className="p-10">404 - Not Found</div>} />
      </Routes>
    </Router>
    </AuthProvider>
    );
    }
export default App;
