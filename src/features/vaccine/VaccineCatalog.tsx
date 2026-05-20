import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Plus, Search, Trash2, Edit, Syringe, X, Save } from 'lucide-react';

interface Vaccine {
  id: string;
  name: string;
  desc: string;
}

export default function VaccineCatalog() {
  // Estado con la lista de vacunas
  const [vaccines, setVaccines] = useState<Vaccine[]>([
    { id: 'V001', name: 'Pentavalente', desc: 'Protección contra moquillo, parvovirus, hepatitis, influenza y leptospira.' },
    { id: 'V002', name: 'Rabia', desc: 'Previene enfermedades zoonóticas del sistema nervioso central.' },
    { id: 'V003', name: 'Bordetella', desc: 'Previene la tos de las perreras y afecciones respiratorias severas.' },
    { id: 'V004', name: 'Giardia', desc: 'Previene la enfermedad clínica e infecciones intestinales parasitarias.' },
    { id: 'V005', name: 'Leishmaniasis', desc: 'Protección inmunológica contra la leishmaniosis visceral canina.' }
  ]);

  // Estados para controlar el buscador
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para controlar el formulario (Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVaccine, setCurrentVaccine] = useState<Vaccine>({ id: '', name: '', desc: '' });

  // HU14: Función para eliminar
  const handleDeleteVaccine = (id: string, name: string) => {
    const confirmDelete = window.confirm(`¿Segura que deseas eliminar la vacuna "${name}" (${id}) del catálogo?`);
    if (confirmDelete) {
      setVaccines(vaccines.filter(v => v.id !== id));
      alert(`La vacuna ${id} ha sido removida del catálogo.`);
    }
  };

  // Abrir modal para Crear Nueva Vacuna
  const handleOpenCreate = () => {
    const nextId = `V00${vaccines.length + 1}`; // Auto-genera el ID siguiente
    setCurrentVaccine({ id: nextId, name: '', desc: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Abrir modal para Editar Vacuna Existente (Actualizar)
  const handleOpenEdit = (vaccine: Vaccine) => {
    setCurrentVaccine(vaccine);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Guardar datos (Tanto para registrar como para actualizar)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentVaccine.name.trim() || !currentVaccine.desc.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (isEditing) {
      // ACTUALIZAR
      setVaccines(vaccines.map(v => v.id === currentVaccine.id ? currentVaccine : v));
      alert(`¡Vacuna ${currentVaccine.id} actualizada correctamente!`);
    } else {
      // REGISTRAR NUEVA
      // Validar que el ID no exista por si acaso
      if (vaccines.some(v => v.id === currentVaccine.id)) {
        alert("Este ID de vacuna ya existe.");
        return;
      }
      setVaccines([...vaccines, currentVaccine]);
      alert("¡Nueva vacuna registrada con éxito en el catálogo!");
    }

    setIsModalOpen(false); // Cerrar ventana
  };

  // Filtrar vacunas según lo que se escriba en el buscador
  const filteredVaccines = vaccines.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/40 p-6 max-w-5xl mx-auto space-y-6 relative">
      
      {/* Encabezado Principal */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Syringe className="text-orange-500 w-8 h-8" /> Catálogo de Vacunas
          </h1>
          <p className="text-gray-500 text-sm mt-1">Registra, actualiza y elimina las vacunas globales del sistema (HU07, HU14).</p>
        </div>
        {/* BOTÓN REGISTRAR NUEVA */}
        <Button 
          onClick={handleOpenCreate}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-5 font-bold flex gap-2 py-5 shadow-sm"
        >
          <Plus className="w-5 h-5" /> Nueva Vacuna
        </Button>
      </div>

      {/* Control de Filtros (Buscador funcional) */}
      <Card className="border-gray-100 shadow-sm rounded-2xl">
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Input 
              placeholder="Buscar vacuna por ID o nombre..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl border-gray-200 pl-10" 
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Listado Principal estilo Tabla */}
      <Card className="border-gray-100 shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="p-4 pl-6">ID</th>
                  <th className="p-4">Nombre Comercial</th>
                  <th className="p-4 hidden md:table-cell">Descripción / Contraindicaciones</th>
                  <th className="p-4 text-center pr-6">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-gray-700 bg-white">
                {filteredVaccines.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-400">
                      No se encontraron vacunas coincidentes.
                    </td>
                  </tr>
                ) : (
                  filteredVaccines.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-50/60 transition-colors group">
                      <td className="p-4 pl-6 font-mono font-bold text-gray-500">
                        <Badge variant="outline" className="bg-gray-50 text-gray-600 font-mono border-gray-200">{v.id}</Badge>
                      </td>
                      <td className="p-4 font-bold text-gray-800">{v.name}</td>
                      <td className="p-4 text-gray-500 max-w-md leading-relaxed hidden md:table-cell">{v.desc}</td>
                      <td className="p-4 text-center pr-6">
                        <div className="flex justify-center gap-2">
                          {/* BOTÓN EDITAR (ACTUALIZAR) */}
                          <Button 
                            onClick={() => handleOpenEdit(v)}
                            size="icon" 
                            variant="ghost" 
                            className="h-9 w-9 rounded-xl text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {/* BOTÓN ELIMINAR */}
                          <Button 
                            onClick={() => handleDeleteVaccine(v.id, v.name)}
                            size="icon" 
                            variant="ghost" 
                            className="h-9 w-9 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* WINDOW MODAL FLOTANTE: FORMULARIO PARA REGISTRAR / ACTUALIZAR */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-2xl border-none rounded-2xl bg-white animate-scaleIn">
            <CardHeader className="relative border-b border-gray-100 pb-4">
              <CardTitle className="text-xl font-bold text-gray-800">
                {isEditing ? 'Actualizar Detalles de Vacuna' : 'Registrar Nueva Vacuna'}
              </CardTitle>
              <CardDescription>
                {isEditing ? 'Modifica los datos del lote o descripción técnica.' : 'Inserta una nueva fórmula al catálogo de PetMatch.'}
              </CardDescription>
              <Button 
                onClick={() => setIsModalOpen(false)}
                variant="ghost" 
                className="absolute right-4 top-4 rounded-full p-1 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            
            <form onSubmit={handleSave}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-gray-400 uppercase">Código Identificador (Fijo)</Label>
                  <Input 
                    value={currentVaccine.id} 
                    disabled 
                    className="bg-gray-50 border-gray-200 text-gray-500 rounded-xl font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="v-name" className="text-sm font-semibold text-gray-700">Nombre Comercial de la Vacuna</Label>
                  <Input 
                    id="v-name"
                    placeholder="Ej: Triple Felina, Parvovirus L4"
                    value={currentVaccine.name}
                    onChange={(e) => setCurrentVaccine({...currentVaccine, name: e.target.value})}
                    className="border-gray-200 rounded-xl focus-visible:ring-orange-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="v-desc" className="text-sm font-semibold text-gray-700">Descripción / Componentes Sanitarios</Label>
                  <textarea 
                    id="v-desc"
                    placeholder="Indique contraindicaciones, patógenos inmunizados, etc."
                    value={currentVaccine.desc}
                    onChange={(e) => setCurrentVaccine({...currentVaccine, desc: e.target.value})}
                    className="flex min-h-[100px] w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    required
                  />
                </div>
              </CardContent>

              <div className="p-4 bg-gray-50 rounded-b-2xl flex gap-3 border-t border-gray-100">
                <Button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  variant="outline" 
                  className="flex-1 rounded-xl py-5 text-gray-500 border-gray-200 bg-white"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-5 font-bold flex gap-2 justify-center shadow-sm"
                >
                  <Save className="w-4 h-4" /> {isEditing ? 'Guardar Cambios' : 'Registrar'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
}