import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import { getVaccines } from '../services/vaccineService';
import { type VaccineDTO } from '../types/vaccine';
import { VaccineList } from '../features/vaccines/components/VaccineList';
import { VaccineForm } from '../features/vaccines/components/VaccineForm';

export const VaccinePage = () => {
  const [vaccines, setVaccines] = useState<VaccineDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVaccines = async () => {
      try {
        setLoading(true);
        const data = await getVaccines();
        setVaccines(data);
      } catch {
        setError('Error: No se pudo conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    };
    loadVaccines();
  }, []);

  return (
    <div className="flex h-screen bg-background flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-semibold mb-6">Catálogo de Vacunas</h1>
        {loading && <p>Cargando vacunas...</p>}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3">{error}</div>}
        {!loading && !error && <VaccineList items={vaccines} />}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Registrar nueva vacuna</h2>
          <VaccineForm />
        </div>
      </div>
    </div>
  );
};
