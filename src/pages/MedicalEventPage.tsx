import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header';
import { getMedicalEvents } from '../services/medicalEventService';
import { type MedicalEventDetailDTO } from '../types/medicalEvent';
import { MedicalEventList } from '../features/medicalEvents/components/MedicalEventList';
import { MedicalEventForm } from '../features/medicalEvents/components/MedicalEventForm';

export const MedicalEventPage = () => {
  const [events, setEvents] = useState<MedicalEventDetailDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await getMedicalEvents();
        setEvents(data);
      } catch {
        setError('Error: No se pudo conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  return (
    <div className="flex h-screen bg-background flex-col overflow-hidden">
      <Header />
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-semibold mb-6">Eventos Médicos</h1>
        {loading && <p>Cargando eventos...</p>}
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3">{error}</div>}
        {!loading && !error && <MedicalEventList items={events} />}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Registrar nuevo evento</h2>
          <MedicalEventForm />
        </div>
      </div>
    </div>
  );
};
