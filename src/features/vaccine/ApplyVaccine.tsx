import React, { useState } from 'react';
import * as API from '../../services/clinicalApi';

export default function ApplyVaccine() {
  const [petId, setPetId] = useState('');
  const [vaccineId, setVaccineId] = useState('');
  const [date, setDate] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const apply = async () => {
    try {
      await API.createVaccineApplication({ petId, vaccineId, date });
      setMsg('Aplicación registrada (inalterable)');
    } catch (e: any) {
      setMsg(String(e.message || e));
    }
  };

  return (
    <section>
      <h2>Registrar Aplicación de Vacuna (HU10)</h2>
      <input placeholder="Pet ID" value={petId} onChange={e => setPetId(e.target.value)} />
      <input placeholder="Vaccine ID" value={vaccineId} onChange={e => setVaccineId(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button onClick={apply}>Registrar Aplicación</button>
      {msg && <p role="status">{msg}</p>}
    </section>
  );
}
