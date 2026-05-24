import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Search, Calendar, ShieldCheck, HeartPulse, Trash2 } from 'lucide-react';

export default function ConsultClinical() {
  const [searchId, setSearchId] = useState('');
  const [searched, setSearched] = useState(false);

  // HU15: Colocamos los eventos médicos en un estado para poder borrarlos
  const [medicalEvents, setMedicalEvents] = useState([
    { id: 'EV-01', date: '27 Mar 2026', title: 'Control de peso - Fiebre y decaimiento', desc: 'El paciente presentó estado febril y decaimiento, se inició tratamiento analgésico.' },
    { id: 'EV-02', date: '10 Mar 2026', title: 'Control de peso', desc: 'Control anual del paciente, se encuentra sin novedades clínicas.' },
    { id: 'EV-03', date: '25 Mar 2025', title: 'Control de peso', desc: 'Control anual de paciente cachorrito, desarrollo normoevolutivo.' }
  ]);

  const vaccines = [
    { date: '27 Mar 2026', name: 'Hepatitis B', status: 'Aplicada', variant: 'success' },
    { date: '18 Mar 2026', name: 'Sida Felino', status: 'Pendiente', variant: 'warning' },
    { date: '13 Mar 2026', name: 'Rabia', status: 'Pendiente', variant: 'warning' }
  ];

  // HU15: Función para borrar un evento médico de la consulta
  const handleDeleteEvent = (id: string, title: string) => {
    const confirmDelete = window.confirm(`¿Deseas eliminar permanentemente el evento clínico "${title}" del historial de Luna?`);
    if (confirmDelete) {
      setMedicalEvents(medicalEvents.filter(ev => ev.id !== id));
      alert("Evento eliminado del historial de la mascota.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/40 p-6 max-w-5xl mx-auto space-y-6">
      <Card className="border-gray-100 shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Consulta de Historial Médico</CardTitle>
          <CardDescription>Busca y gestiona los eventos médicos de las historias clínicas de las mascotas (HU11, HU15).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 max-w-md">
            <div className="flex-1 space-y-1">
              <Label htmlFor="search" className="sr-only">ID Mascota</Label>
              <Input
                id="search"
                placeholder="Ingresa el ID de la mascota (Ej: #102)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="rounded-xl border-gray-200"
              />
            </div>
            <Button onClick={() => setSearched(true)} className="bg-orange-500 hover:bg-orange-600 rounded-xl px-5 flex gap-2">
              <Search className="w-4 h-4" /> Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      {searched && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          {/* Perfil */}
          <Card className="border-gray-100 shadow-sm rounded-2xl p-6 flex flex-col items-center text-center bg-white justify-center h-fit">
            <div className="w-24 h-24 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-3xl shadow-inner mb-4">
              L
            </div>
            <h3 className="text-xl font-bold text-gray-800">Luna</h3>
            <p className="text-gray-500 text-sm">Gato • 3 años</p>
            <Badge variant="outline" className="mt-2 border-orange-200 text-orange-600 bg-orange-50/50">ID: #102</Badge>
          </Card>

          {/* Contenido principal */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-gray-100 shadow-sm rounded-2xl">
              <CardHeader className="border-b border-gray-50 pb-4">
                <div className="flex items-center gap-2 text-gray-800 font-bold text-lg">
                  <HeartPulse className="text-rose-500 w-5 h-5" /> Línea de Tiempo de Eventos Médicos
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {medicalEvents.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">No hay eventos médicos registrados.</p>
                ) : (
                  <div className="relative border-l-2 border-gray-100 ml-4 pl-6 space-y-6">
                    {medicalEvents.map((ev) => (
                      <div key={ev.id} className="relative group">
                        <div className="absolute -left-7.75 top-0 bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-sm flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {ev.date.split(' ')[0]}
                        </div>
                        <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100/80 ml-6 flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <span className="text-xs font-semibold text-gray-400 block mb-1">{ev.date}</span>
                            <h4 className="font-bold text-gray-800 text-sm">{ev.title}</h4>
                            <p className="text-gray-600 text-xs mt-1 leading-relaxed">{ev.desc}</p>
                          </div>
                          {/* Botón de la HU15 */}
                          <Button 
                            onClick={() => handleDeleteEvent(ev.id, ev.title)}
                            size="icon" 
                            variant="ghost" 
                            className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                            title="Eliminar evento médico"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Carnet */}
            <Card className="border-gray-100 shadow-sm rounded-2xl">
              <CardHeader className="border-b border-gray-50 pb-4">
                <div className="flex items-center gap-2 text-gray-800 font-bold text-lg">
                  <ShieldCheck className="text-teal-500 w-5 h-5" /> Esquema de Vacunación (Carnet)
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 text-xs font-semibold">
                        <th className="pb-3">Fecha</th>
                        <th className="pb-3">Vacuna</th>
                        <th className="pb-3 text-right">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                      {vaccines.map((v, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 font-medium text-gray-500">{v.date}</td>
                          <td className="py-3 font-bold text-gray-800">{v.name}</td>
                          <td className="py-3 text-right">
                            <Badge className={v.variant === 'success' ? 'bg-emerald-100 text-emerald-700 font-bold border-none' : 'bg-orange-100 text-orange-700 font-bold border-none'}>
                              {v.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}