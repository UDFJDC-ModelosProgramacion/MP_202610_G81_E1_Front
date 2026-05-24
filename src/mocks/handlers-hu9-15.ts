import { rest, RestRequest, RestContext, ResponseComposition } from 'msw';
import type * as T from '../types/clinical';

const now = new Date().toISOString();

/* Datos mínimos de ejemplo */
const pets: { id: number; name: string }[] = [{ id: 1, name: 'Luna' }];
const clinicals: T.ClinicalRecord[] = [{ id: 102, petId: 1, createdAt: now, lastUpdated: now }];
const medicalEvents: T.MedicalEvent[] = [
  { id: 201, clinicalId: 102, date: '2026-03-27', description: 'Control de peso - Fiebre y decaimiento' }
];
const vaccines: T.Vaccine[] = [
  { id: 'V001', code: 'V001', name: 'Moquillo', description: 'Previene moquillo' },
  { id: 'V002', code: 'V002', name: 'Rabia', description: 'Previene rabia' }
];

export const handlers = [
  // Crear historia clínica (HU08 / HU15)
  rest.post('/api/clinical-records', async (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const body = (await req.json()) as Partial<T.ClinicalRecord> | undefined;
    if (!body || body.petId === undefined) {
      return res(ctx.status(400), ctx.json({ message: 'petId is required' }));
    }
    const petExists = pets.some(p => String(p.id) === String(body.petId));
    if (!petExists) return res(ctx.status(400), ctx.json({ message: 'Pet must exist' }));
    if (clinicals.some(c => String(c.petId) === String(body.petId))) {
      return res(ctx.status(409), ctx.json({ message: 'Clinical already exists for pet' }));
    }
    const newC: T.ClinicalRecord = { id: Date.now(), petId: body.petId!, createdAt: now, lastUpdated: now };
    clinicals.push(newC);
    return res(ctx.status(201), ctx.json(newC));
  }),

  // Consultar historias clínicas por petId (HU11)
  rest.get('/api/clinical-records', (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const petId = req.url.searchParams.get('petId');
    if (petId) {
      const list = clinicals.filter(c => String(c.petId) === petId);
      return res(ctx.status(200), ctx.json(list));
    }
    return res(ctx.status(200), ctx.json(clinicals));
  }),

  // Registrar evento médico (HU09)
  rest.post('/api/medical-events', async (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const body = (await req.json()) as Partial<T.MedicalEvent> | undefined;
    if (!body || !body.description) return res(ctx.status(400), ctx.json({ message: 'Description required' }));
    if (!body.date) return res(ctx.status(400), ctx.json({ message: 'Date required' }));
    if (new Date(body.date) > new Date()) return res(ctx.status(400), ctx.json({ message: 'Date cannot be in the future' }));
    if (!body.clinicalId || !clinicals.some(c => String(c.id) === String(body.clinicalId))) {
      return res(ctx.status(400), ctx.json({ message: 'Clinical not found' }));
    }
    const newE: T.MedicalEvent = { id: Date.now(), clinicalId: body.clinicalId!, date: body.date!, description: body.description! };
    medicalEvents.push(newE);
    return res(ctx.status(201), ctx.json(newE));
  }),

  // Modificar evento médico (solo description) (HU12)
  rest.patch('/api/medical-events/:id', async (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const id = Number(req.params.id);
    const ev = medicalEvents.find(e => Number(e.id) === id);
    if (!ev) return res(ctx.status(404), ctx.json({ message: 'Event not found' }));
    const body = (await req.json()) as Partial<T.MedicalEvent> | undefined;
    if (!body || body.description === undefined) {
      return res(ctx.status(400), ctx.json({ message: 'Description required for update' }));
    }
    ev.description = body.description;
    ev.date = body.date ?? ev.date;
    return res(ctx.status(200), ctx.json(ev));
  }),

  // Catálogo de vacunas y detalle (HU07 / HU14)
  rest.get('/api/vaccines', (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    return res(ctx.status(200), ctx.json(vaccines));
  }),
  rest.get('/api/vaccines/:id', (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const id = String(req.params.id);
    const v = vaccines.find(x => String(x.id) === id || x.code === id || x.name.toLowerCase() === id.toLowerCase());
    return v ? res(ctx.status(200), ctx.json(v)) : res(ctx.status(404), ctx.json({ message: 'Vaccine not found' }));
  }),

  // Aplicación de vacuna (HU10)
  rest.post('/api/vaccine-applications', async (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const body = (await req.json()) as Partial<T.VaccineApplication> | undefined;
    if (!body || !body.petId || !body.vaccineId || !body.date) {
      return res(ctx.status(400), ctx.json({ message: 'petId, vaccineId and date are required' }));
    }
    if (!pets.some(p => String(p.id) === String(body.petId))) return res(ctx.status(400), ctx.json({ message: 'Pet not found' }));
    if (!vaccines.some(v => String(v.id) === String(body.vaccineId) || v.code === body.vaccineId)) return res(ctx.status(400), ctx.json({ message: 'Vaccine not found' }));
    const newA: T.VaccineApplication = { id: Date.now(), petId: body.petId!, vaccineId: body.vaccineId!, date: body.date!, immutable: true };
    return res(ctx.status(201), ctx.json(newA));
  }),

  // Consulta de historial combinado (HU11) - eventos + vacunas
  rest.get('/api/clinical-history/:petId', (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const petId = req.params.petId;
    const c = clinicals.find(x => String(x.petId) === String(petId));
    if (!c) return res(ctx.status(200), ctx.json({ clinical: null, events: [], vaccines: [] }));
    const events = medicalEvents.filter(e => String(e.clinicalId) === String(c.id));
    const applied: T.VaccineApplication[] = []; // minimal mock
    return res(ctx.status(200), ctx.json({ clinical: c, events, vaccines: applied }));
  }),

  // Eliminación admin simulada (HU13)
  rest.delete('/api/admin/:path', (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const isAdmin = req.headers.get('x-admin') === 'true';
    if (!isAdmin) return res(ctx.status(403), ctx.json({ message: 'Forbidden' }));
    return res(ctx.status(204));
  }),

  // Fallback para endpoints no implementados en el mock
  rest.get('/api/*', (_req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    return res(ctx.status(404), ctx.json({ message: 'Not implemented in mock' }));
  })
];