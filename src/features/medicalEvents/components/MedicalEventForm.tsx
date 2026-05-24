import { useState } from 'react';
import { createMedicalEvent } from '../../../services/medicalEventService';

export const MedicalEventForm = () => {
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [medicalHistoryId, setMedicalHistoryId] = useState<number>(0);
  const [veterinarianId, setVeterinarianId] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMedicalEvent({ eventDate, eventType, diagnosis, treatment, medicalHistoryId, veterinarianId });
    alert('Evento médico registrado correctamente');
    setEventDate('');
    setEventType('');
    setDiagnosis('');
    setTreatment('');
    setMedicalHistoryId(0);
    setVeterinarianId(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} />
      <input value={eventType} onChange={e => setEventType(e.target.value)} placeholder="Tipo de evento" />
      <input value={diagnosis} onChange={e => setDiagnosis(e.target.value)} placeholder="Diagnóstico" />
      <textarea value={treatment} onChange={e => setTreatment(e.target.value)} placeholder="Tratamiento" />
      <input type="number" value={medicalHistoryId} onChange={e => setMedicalHistoryId(Number(e.target.value))} placeholder="ID Historia clínica" />
      <input type="number" value={veterinarianId} onChange={e => setVeterinarianId(Number(e.target.value))} placeholder="ID Veterinario" />
      <button type="submit">Guardar</button>
    </form>
  );
};
