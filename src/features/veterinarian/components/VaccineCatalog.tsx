import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { getAllVaccines, registerVaccine } from '../../../services/veterinarianService';
import type { VaccineDTO } from '../../../types/veterinarian';

export const VaccineCatalog: React.FC = () => {
  const [vaccines, setVaccines] = useState<VaccineDTO[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState<VaccineDTO | null>(null);

  const loadCatalog = async () => {
    try {
      const data = await getAllVaccines();
      setVaccines(data);
    } catch (err) {
      console.error("Error al cargar el catálogo de vacunas");
    }
  };

  useEffect(() => { loadCatalog(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    await registerVaccine({ name, description });
    setName('');
    setDescription('');
    setShowForm(false);
    loadCatalog();
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-green-700">Catálogo de Vacunas (HU07)</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-orange-500 hover:bg-orange-600 text-white">
          {showForm ? 'Cerrar' : '+ Registrar Nueva Vacuna'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-xl border space-y-3" data-testid="vaccine-form">
          <Input placeholder="Nombre de la vacuna (ej: Parvovirus)" value={name} onChange={e => setName(e.target.value)} required />
          <textarea 
            className="w-full text-sm p-3 border rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none"
            placeholder="Descripción, indicaciones y contraindicaciones clínicas..." 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            required 
          />
          <Button type="submit" className="bg-green-600 text-white w-full">Guardar en Sistema</Button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 border rounded-xl overflow-hidden shadow-sm bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-700 text-white text-sm">
                <th className="p-3">Vacuna Registrada</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vaccines.map((v) => (
                <tr key={v.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3 font-semibold text-gray-800">{v.name}</td>
                  <td className="p-3">
                    <button onClick={() => setSelectedVaccine(v)} className="text-green-600 font-bold hover:underline">
                      Ver Detalles (HU14)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedVaccine && (
          <div className="p-5 border rounded-xl bg-orange-50/40 space-y-3 h-fit shadow-sm" data-testid="detail-box">
            <h4 className="font-bold text-green-700 text-lg border-b pb-1">{selectedVaccine.name}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{selectedVaccine.description}</p>
            <Button onClick={() => setSelectedVaccine(null)} className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300">
              Cerrar Vista
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};