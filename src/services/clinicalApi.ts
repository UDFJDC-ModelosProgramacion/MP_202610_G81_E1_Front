import type * as T from '../types/clinical';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

async function req<TRes>(path: string, opts?: RequestInit): Promise<TRes> {
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) {
    const txt = await res.text().catch(() => res.statusText);
    throw new Error(txt || 'API error');
  }
  return res.json();
}

/* Clinical records */
export const createClinical = (body: Partial<T.ClinicalRecord>) =>
  req<T.ClinicalRecord>('/clinical-records', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });

export const getClinicalByPet = (petId: T.ID) =>
  req<T.ClinicalRecord[]>(`/clinical-records?petId=${petId}`);

/* Medical events */
export const createMedicalEvent = (body: Partial<T.MedicalEvent>) =>
  req<T.MedicalEvent>('/medical-events', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });

export const updateMedicalEvent = (id: T.ID, body: Partial<T.MedicalEvent>) =>
  req<T.MedicalEvent>(`/medical-events/${id}`, { method: 'PATCH', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });

/* Vaccines */
export const getVaccines = () => req<T.Vaccine[]>('/vaccines');
export const getVaccineById = (id: T.ID) => req<T.Vaccine>(`/vaccines/${id}`);
export const createVaccine = (body: Partial<T.Vaccine>) =>
  req<T.Vaccine>('/vaccines', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });

/* Vaccine applications */
export const createVaccineApplication = (body: Partial<T.VaccineApplication>) =>
  req<T.VaccineApplication>('/vaccine-applications', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });

/* Admin delete */
export const adminDelete = (path: string, isAdmin = false) =>
  fetch(`${API_BASE}/admin/${path}`, { method: 'DELETE', headers: { 'x-admin': isAdmin ? 'true' : 'false' } })
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res;
    });
