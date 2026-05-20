import React, { useEffect, useState } from 'react';
import * as API from '../../services/clinicalApi';

export default function VaccineCatalog() {
  const [list, setList] = useState<any[]>([]);
  const [detail, setDetail] = useState<any | null>(null);

  useEffect(() => {
    API.getVaccines().then(setList).catch(() => setList([]));
  }, []);

  const loadDetail = (id: string) => {
    API.getVaccineById(id).then(setDetail).catch(() => setDetail({ error: 'No encontrada' }));
  };

  return (
    <section>
      <h2>Catálogo de Vacunas (HU07 / HU14)</h2>
      <ul>
        {list.map(v => <li key={String(v.id)}>{v.name} <button onClick={() => loadDetail(String(v.id))}>Ver</button></li>)}
      </ul>
      {detail && <div><h3>{detail.name}</h3><p>{detail.description}</p></div>}
    </section>
  );
}
