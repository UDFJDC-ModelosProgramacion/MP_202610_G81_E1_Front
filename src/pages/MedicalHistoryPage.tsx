import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import { getMedicalHistories } from '../services/medicalHistoryService';
import { type MedicalHistoryDTO } from '../types/medicalHistory';
import { MedicalHistoryList } from '../features/medicalHistories/components/MedicalHistoryList';
import { MedicalHistoryForm } from '../features/medicalHistories/components/MedicalHistoryForm';

export const MedicalHistoryPage = () => {
  const [histories, setHistories] = useState<MedicalHistoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistories = async () => {
      try {
        setLoading(true);
        const data = await getMedicalHistories();
        setHistories(data);
      } catch {
        setError('Error: No se pudo conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    };
    loadHistories();
  }, []);

  return (
    <div className="flex h-screen bg-background flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-semibold mb-6">Historias Clínicas</h1>
        {loading && <p>Cargando historias...</p>}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3">{error}</div>}
        {!loading && !error && <MedicalHistoryList items={histories} />}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Crear nueva historia clínica</h2>
          <MedicalHistoryForm />
        </div>
      </div>
    </div>
  );
};

