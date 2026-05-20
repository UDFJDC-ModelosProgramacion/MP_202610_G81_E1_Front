import React, { useState } from 'react';
import * as API from '../../services/clinicalApi';

export default function DeleteRecord() {
  const [path, setPath] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const del = async () => {
    try {
      await API.adminDelete(path, isAdmin);
      setMsg('Registro eliminado');
    } catch (e: any) {
      setMsg(String(e.message || e));
    }
  };

  return (
    <section>
      <h2>Eliminar Registro Erróneo (HU13)</h2>
      <input placeholder="path a eliminar (ej: vaccine/123)" value={path} onChange={e => setPath(e.target.value)} />
      <label><input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} /> Simular Admin</label>
      <button onClick={del}>Eliminar</button>
      {msg && <p role="status">{msg}</p>}
    </section>
  );
}
