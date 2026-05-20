import React, { useState } from 'react';
import * as API from '../../services/clinicalApi';

export default function RegisterEvent() {
  const [clinicalId, setClinicalId] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const save = async () => {
    try {
      await API.createMedicalEvent({ clinicalId, date, description: desc });
      setMsg('Evento registrado');
    } catch (e: any) {
      setMsg(String(e.message || e));
    }
  };

  return (
    <section>
      <h2>Registrar Evento Médico (HU09)</h2>
      <input placeholder="Historia Clínica ID" value={clinicalId} onChange={e => setClinicalId(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <textarea placeholder="Descripción" value={desc} onChange={e => setDesc(e.target.value)} />
      <button onClick={save}>Guardar Evento</button>
      {msg && <p role="status">{msg}</p>}
    </section>
  );
}
