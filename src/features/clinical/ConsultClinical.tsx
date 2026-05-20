import React, { useState } from 'react';

export default function ConsultClinical() {
  const [petId, setPetId] = useState('');
  const [data, setData] = useState<any | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch(`/api/clinical-history/${petId}`);
      const json = await res.json();
      setData(json);
      setErr(null);
    } catch (e: any) {
      setErr(String(e));
    }
  };

  return (
    <section>
      <h2>Consulta de Historial Médico (HU11)</h2>
      <input placeholder="Pet ID" value={petId} onChange={e => setPetId(e.target.value)} />
      <button onClick={load}>Consultar</button>
      {err && <p role="alert">{err}</p>}
      {data && (
        <div>
          <h3>Historia</h3>
          {data.clinical ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>No hay historial</p>}
        </div>
      )}
    </section>
  );
}
