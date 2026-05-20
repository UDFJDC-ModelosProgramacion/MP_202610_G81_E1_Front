import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Syringe, Calendar, CheckSquare } from 'lucide-react';

export default function ApplyVaccine() {
  const [form, setForm] = useState({ petId: '', vaccineId: '', date: '' });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Vacuna Aplicada:", form);
    alert("¡Aplicación de vacuna registrada correctamente en el sistema!");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-md shadow-md border-gray-100 rounded-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-orange-100 text-orange-600 p-3 rounded-full w-fit mb-2">
            <Syringe className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Registrar Aplicación de Vacuna</CardTitle>
          <CardDescription>Inserta un evento de inoculación al esquema sanitario de la mascota (HU10).</CardDescription>
        </CardHeader>

        <form onSubmit={handleApply}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="petId" className="text-sm font-semibold text-gray-700">Identificación de Mascota</Label>
              <Input
                id="petId"
                placeholder="Seleccione o escriba el ID de la Mascota"
                value={form.petId}
                onChange={(e) => setForm({ ...form, petId: e.target.value })}
                className="rounded-xl border-gray-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vaccineId" className="text-sm font-semibold text-gray-700">Vacuna Solicitada</Label>
              <Input
                id="vaccineId"
                placeholder="Seleccione Vacuna del Catálogo (Ej: V001)"
                value={form.vaccineId}
                onChange={(e) => setForm({ ...form, vaccineId: e.target.value })}
                className="rounded-xl border-gray-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-semibold text-gray-700">Fecha de Aplicación</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="rounded-xl border-gray-200 pl-10"
                  required
                />
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-6 font-bold flex gap-2 justify-center shadow-sm">
              <CheckSquare className="w-5 h-5" /> Fecha de Aplicación
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}