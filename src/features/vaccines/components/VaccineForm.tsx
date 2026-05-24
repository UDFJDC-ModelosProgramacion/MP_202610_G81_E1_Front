import { useState } from 'react';
import { createVaccine } from '../../../services/vaccineService';

export const VaccineForm = () => {
  const [name, setName] = useState('');
  const [validityMonths, setValidityMonths] = useState<number>(0);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createVaccine({ name, validityMonths, description });
    alert('Vacuna registrada correctamente');
    setName('');
    setValidityMonths(0);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" />
      <input type="number" value={validityMonths} onChange={e => setValidityMonths(Number(e.target.value))} placeholder="Meses de validez" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" />
      <button type="submit">Guardar</button>
    </form>
  );
};
