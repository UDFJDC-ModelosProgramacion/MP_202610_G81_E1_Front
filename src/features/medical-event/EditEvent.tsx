import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Edit3, CheckCircle, XCircle } from 'lucide-react';

export default function EditEvent() {
  // Estado para controlar el texto del diagnóstico y que te deje editarlo libremente
  const [diagnosis, setDiagnosis] = useState(
    'El paciente presentó estado febril y decaimiento, se inició tratamiento analgésico.'
  );

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`¡Registro médico actualizado con éxito!\n\nNuevo diagnóstico: "${diagnosis}"`);
  };

  const handleCancel = () => {
    // Resetea al texto original si cancelas
    setDiagnosis('El paciente presentó estado febril y decaimiento, se inició tratamiento analgésico.');
    alert("Edición cancelada");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-lg shadow-md border-gray-100 rounded-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-amber-100 text-amber-600 p-3 rounded-full w-fit mb-2">
            <Edit3 className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Modificar Evento Médico</CardTitle>
          <CardDescription>Corrige errores o añade observaciones a un registro clínico existente (HU12).</CardDescription>
        </CardHeader>

        <form onSubmit={handleUpdate}>
          <CardContent className="space-y-5">
            {/* Cabecera Informativa Fija */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100/80 text-sm text-gray-600">
              <div>
                <span className="text-xs font-semibold text-gray-400 block">Mascota</span>
                <span className="font-bold text-gray-800">Luna (ID: #102)</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-400 block">Fecha Original</span>
                <span className="font-medium text-gray-700">27 Mar 2026</span>
              </div>
              <div className="col-span-2 border-t border-gray-200/60 pt-2">
                <span className="text-xs font-semibold text-gray-400 block">Veterinario responsable</span>
                <Badge className="mt-1 bg-orange-100 text-orange-700 shadow-none border-none font-medium">Dr. Yeremy</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-diag" className="text-sm font-semibold text-gray-700">Diagnóstico Detalle (¡Pruébalo, ya puedes borrar y escribir!)</Label>
              <Textarea
                id="edit-diag"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)} // <-- Esto es lo que permite escribir en pantalla
                className="rounded-xl border-gray-200 min-h-[120px] focus-visible:ring-amber-500"
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex gap-3">
            <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 rounded-xl py-5 text-gray-500 flex gap-2">
              <XCircle className="w-4 h-4" /> Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-5 font-bold flex gap-2">
              <CheckCircle className="w-4 h-4" /> Guardar Cambios
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}