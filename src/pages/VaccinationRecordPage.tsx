import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import { getVaccinationRecords } from '../services/vaccinationRecordService';
import { type VaccinationRecordDTO } from '../types/vaccinationRecord';
import { VaccinationRecordList } from '../features/vaccinationRecords/components/VaccinationRecordList';
import { VaccinationRecordForm } from '../features/vaccinationRecords/components/VaccinationRecordForm';

export const VaccinationRecordPage = () => {
  const [records, setRecords] = useState<VaccinationRecordDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        setLoading(true);
        const data = await getVaccinationRecords();
        setRecords(data);
      } catch {
        setError('Error: No se pudo conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    };
    loadRecords();
  }, []);

  return (
    <div className="flex h-screen bg-background flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-semibold mb-6">Registros de Vacunación</h1>
        {loading && <p>Cargando registros...</p>}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3">{error}</div>}
        {!loading && !error && <VaccinationRecordList items={records} />}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Registrar nueva aplicación</h2>
          <VaccinationRecordForm />
        </div>
      </div>
    </div>
  );
};
