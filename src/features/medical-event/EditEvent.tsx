import React, { useState } from 'react';
import * as API from '../../services/clinicalApi';

export default function EditEvent() {
  const [id, setId] = useState('');
  const [desc, setDesc] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const save = async () => {
    try {
      await API.updateMedicalEvent(id, { description: desc });
      setMsg('Evento actualizado');
    } catch (e: any) {
      setMsg(String(e.message || e));
    }
  };

  return (
    <section>
      <h2>Modificar Evento Médico (HU12)</h2>
      <input placeholder="Evento ID" value={id} onChange={e => setId(e.target.value)} />
      <textarea placeholder="Nueva descripción" value={desc} onChange={e => setDesc(e.target.value)} />
      <button onClick={save}>Guardar Evento</button>
      {msg && <p role="status">{msg}</p>}
    </section>
  );
}
