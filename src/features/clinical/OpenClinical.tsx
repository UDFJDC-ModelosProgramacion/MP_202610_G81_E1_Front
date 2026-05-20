import React, { useState } from 'react';
import * as API from '../../services/clinicalApi';

export default function OpenClinical() {
  const [petId, setPetId] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const open = async () => {
    try {
      const created = await API.createClinical({ petId: petId });
      setMsg(`Historia creada ID: ${created.id}`);
    } catch (e: any) {
      setMsg(String(e.message || e));
    }
  };

  return (
    <section>
      <h2>Apertura / Actualización Historia Clínica (HU08 / HU15)</h2>
      <input placeholder="Pet ID" value={petId} onChange={e => setPetId(e.target.value)} />
      <button onClick={open}>Confirmar Apertura de HC</button>
      {msg && <p role="status">{msg}</p>}
    </section>
  );
}
