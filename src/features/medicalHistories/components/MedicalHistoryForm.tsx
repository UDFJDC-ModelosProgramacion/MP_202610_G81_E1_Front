import { useState } from 'react';
import { createMedicalHistory } from '../../../services/medicalHistoryService';

export const MedicalHistoryForm = () => {
  const [lastCheckup, setLastCheckup] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [petId, setPetId] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMedicalHistory({ lastCheckup, description, notes, petId });
    alert('Historia clínica creada correctamente');
    setLastCheckup('');
    setDescription('');
    setNotes('');
    setPetId(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={lastCheckup} onChange={e => setLastCheckup(e.target.value)} />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" />
      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notas" />
      <input type="number" value={petId} onChange={e => setPetId(Number(e.target.value))} placeholder="ID Mascota" />
      <button type="submit">Guardar</button>
    </form>
  );
};
