import { useState } from 'react';
import { createVaccinationRecord } from '../../../services/vaccinationRecordService';

export const VaccinationRecordForm = () => {
  const [applicationDate, setApplicationDate] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');
  const [vaccinationDate, setVaccinationDate] = useState('');
  const [notes, setNotes] = useState('');
  const [petId, setPetId] = useState<number>(0);
  const [vaccineId, setVaccineId] = useState<number>(0);
  const [medicalHistoryId, setMedicalHistoryId] = useState<number>(0);
  const [veterinarianId, setVeterinarianId] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createVaccinationRecord({ applicationDate, nextDueDate, vaccinationDate, notes, petId, vaccineId, medicalHistoryId, veterinarianId });
    alert('Registro de vacunación creado correctamente');
    setApplicationDate('');
    setNextDueDate('');
    setVaccinationDate('');
    setNotes('');
    setPetId(0);
    setVaccineId(0);
    setMedicalHistoryId(0);
    setVeterinarianId(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={applicationDate} onChange={e => setApplicationDate(e.target.value)} />
      <input type="date" value={nextDueDate} onChange={e => setNextDueDate(e.target.value)} />
      <input type="date" value={vaccinationDate} onChange={e => setVaccinationDate(e.target.value)} />
      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notas" />
      <input type="number" value={petId} onChange={e => setPetId(Number(e.target.value))} placeholder="ID Mascota" />
      <input type="number" value={vaccineId} onChange={e => setVaccineId(Number(e.target.value))} placeholder="ID Vacuna" />
      <input type="number" value={medicalHistoryId} onChange={e => setMedicalHistoryId(Number(e.target.value))} placeholder="ID Historia clínica" />
      <input type="number" value={veterinarianId} onChange={e => setVeterinarianId(Number(e.target.value))} placeholder="ID Veterinario" />
      <button type="submit">Guardar</button>
    </form>
  );
};
