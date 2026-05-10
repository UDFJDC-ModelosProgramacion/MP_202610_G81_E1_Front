import { AdminHeader } from './components/AdminHeader';
import { ShelterRegistrationForm } from './components/ShelterRegistrationForm';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />
      <ShelterRegistrationForm />
      <Footer />
    </div>
  );
}