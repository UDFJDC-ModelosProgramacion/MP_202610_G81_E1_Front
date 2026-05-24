import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { 
  getMedicalHistoryByPetId, 
  createMedicalHistory, 
  registerMedicalEvent, 
  updateMedicalEvent,
  registerVaccinationReport,
  deleteVaccinationReport,
  getAllVaccines
} from '../../../services/veterinarianService';
import type { MedicalHistoryDetailDTO, VaccineDTO } from '../../../types/veterinarian';

interface Props {
  petId: number;
}

export const MedicalHistorySection: React.FC<Props> = ({ petId }) => {
  const [history, setHistory] = useState<MedicalHistoryDetailDTO | null>(null);
  const [vaccines, setVaccines] = useState<VaccineDTO[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [description, setDescription] = useState('');
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [selectedVaccineId, setSelectedVaccineId] = useState<number | string>('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const resHistory = await getMedicalHistoryByPetId(petId);
      setHistory(resHistory);
      const resVaccines = await getAllVaccines();
      setVaccines(resVaccines);
    } catch (err) {
      setHistory(null);
    } finally {
      setLoading(false);
    }
  }, [petId]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleApertura = async () => {
    await createMedicalHistory({ petId }); // HU08
    loadData();
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !history) return;

    if (editingEventId) {
      await updateMedicalEvent(editingEventId, { description }); // HU12
      setEditingEventId(null);
    } else {
      await registerMedicalEvent({ // HU09
        eventDate: new Date().toISOString().split('T')[0],
        description,
        medicalHistoryId: history.id
      });
    }
    setDescription('');
    loadData();
  };

  const handleApplyVaccine = async () => {
    if (!selectedVaccineId) return;
    await registerVaccinationReport({ // HU10
      applicationDate: new Date().toISOString().split('T')[0],
      petId,
      vaccineId: Number(selectedVaccineId)
    });
    setSelectedVaccineId('');
    loadData();
  };

  const handleCancelReport = async (id: number) => {
    if (window.confirm("¿Desea eliminar permanentemente este reporte de vacunación? (HU13)")) {
      await deleteVaccinationReport(id); // HU13
      loadData();
    }
  };

  if (loading) return <p className="p-4 text-sm text-gray-500">Cargando expediente clínico...</p>;

  if (!history) {
    return (
      <div className="p-8 text-center bg-gray-50 border border-dashed rounded-xl space-y-4" data-testid="empty-state">
        <p className="text-gray-600 text-sm">Esta mascota no posee un historial médico abierto.</p>
        <Button onClick={handleApertura} className="bg-green-600 hover:bg-green-700 text-white">
          Aperturar Historia Clínica (HU08)
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4" data-testid="clinical-dashboard">
      {/* HU11 & HU09/HU12: Consultas Médicas */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white p-5 border rounded-xl shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-800 border-b pb-2">Evolución y Consultas Médicas (HU11)</h3>
          
          <form onSubmit={handleEventSubmit} className="flex gap-2">
            <Input 
              placeholder={editingEventId ? "Modificar notas de la consulta..." : "Agregar síntomas y diagnóstico clínico..."}
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
            <Button type="submit" className="bg-orange-500 text-white shrink-0">
              {editingEventId ? 'Actualizar (HU12)' : 'Registrar Consulta (HU09)'}
            </Button>
          </form>

          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
            {history.events.map(ev => (
              <div key={ev.id} className="p-3 bg-gray-50 rounded-lg border-l-4 border-green-600 flex justify-between items-start text-sm">
                <div>
                  <span className="text-xs text-gray-400 font-bold">{ev.eventDate}</span>
                  <p className="text-gray-700 mt-1 font-medium">{ev.description}</p>
                </div>
                <button onClick={() => { setEditingEventId(ev.id); setDescription(ev.description); }} className="text-xs text-blue-600 hover:underline font-bold">
                  Editar (HU12)
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HU10 & HU13: Carnet de Vacunación */}
      <div className="space-y-4">
        <div className="bg-white p-5 border rounded-xl shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-800 border-b pb-2">Control de Vacunas (HU10)</h3>
          
          <div className="flex gap-2">
            <select 
              value={selectedVaccineId} 
              onChange={e => setSelectedVaccineId(e.target.value)}
              className="w-full text-sm p-2 border rounded-md bg-white focus:ring-2 focus:ring-green-600 focus:outline-none"
            >
              <option value="">-- Seleccionar Vacuna --</option>
              {vaccines.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
            <Button onClick={handleApplyVaccine} className="bg-green-700 text-white text-sm">
              Aplicar
            </Button>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {history.vaccinationReports.map(rep => (
              <div key={rep.id} className="p-3 bg-orange-50/60 border rounded-xl flex justify-between items-center text-sm">
                <div>
                  <p className="font-bold text-gray-800">{rep.vaccineName || `Vacuna #${rep.vaccineId}`}</p>
                  <span className="text-xs text-gray-400 font-medium">{rep.applicationDate}</span>
                </div>
                <button onClick={() => handleCancelReport(rep.id)} className="text-xs text-red-500 font-bold hover:underline">
                  Eliminar (HU13)
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};