import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Calendar, Save, FileSpreadsheet } from 'lucide-react';

export default function RegisterEvent() {
  const [form, setForm] = useState({ clinicalId: '', date: '', diagnosis: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Evento Registrado:", form);
    alert("¡Evento Médico Guardado con Éxito!");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-lg shadow-md border-gray-100 rounded-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-emerald-100 text-emerald-600 p-3 rounded-full w-fit mb-2">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Registrar Nuevo Evento Médico</CardTitle>
          <CardDescription>Añade consultas, diagnósticos o chequeos a la historia clínica (HU09).</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clinicalId" className="text-sm font-semibold text-gray-700">Historia Clínica Asociada</Label>
              <Input
                id="clinicalId"
                placeholder="Seleccionar o escribir ID de Historia Clínica"
                value={form.clinicalId}
                onChange={(e) => setForm({ ...form, clinicalId: e.target.value })}
                className="rounded-xl border-gray-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-semibold text-gray-700">Fecha del Evento</Label>
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

            <div className="space-y-2">
              <Label htmlFor="diagnosis" className="text-sm font-semibold text-gray-700">Detalle del Diagnóstico / Observaciones</Label>
              <Textarea
                id="diagnosis"
                placeholder="Describe los síntomas, peso, temperatura, medicamentos recetados, etc."
                value={form.diagnosis}
                onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                className="rounded-xl border-gray-200 min-h-30 focus-visible:ring-emerald-500"
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1 rounded-xl py-5 border-gray-200 text-gray-500 hover:bg-gray-50">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-5 font-bold flex gap-2">
              <Save className="w-4 h-4" /> Guardar Evento
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}