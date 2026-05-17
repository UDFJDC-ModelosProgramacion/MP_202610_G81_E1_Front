import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { VetSidebar } from '../features/veterinarian/components/VetSidebar';
import { VeterinaryDirectory } from '../features/veterinarian/components/VeterinaryDirectory';

export function VeterinarianDirectoryPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  return (
    <div className="flex h-screen bg-background flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <VetSidebar
          selectedSpecialty={selectedSpecialty}
          onSpecialtyChange={setSelectedSpecialty}
        />
        <VeterinaryDirectory selectedSpecialty={selectedSpecialty} />
      </div>
      <Footer />
    </div>
  );
}

export default VeterinarianDirectoryPage;
