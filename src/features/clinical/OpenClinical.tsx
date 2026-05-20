import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { FileText, PlusCircle } from 'lucide-react';

export default function OpenClinical() {
  const [petId, setPetId] = useState('');
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (petId.trim()) {
      // Simulación de generación de ID único para la HC
      setGeneratedId(petId);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full max-w-md shadow-md border-gray-100 rounded-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-orange-100 text-orange-600 p-3 rounded-full w-fit mb-2">
            <FileText className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Apertura de Historia Clínica
          </CardTitle>
          <CardDescription className="text-gray-500">
            Crea un historial médico único y centralizado para la mascota (HU08).
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleCreate}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="petId" className="text-sm font-semibold text-gray-700">
                Identificación de la Mascota (Pet ID)
              </Label>
              <Input
                id="petId"
                placeholder="Ej: #102 o nombre de la mascota"
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
                className="rounded-xl border-gray-200 focus-visible:ring-orange-500"
                required
              />
            </div>

            {generatedId && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <p className="text-sm font-medium text-emerald-800">
                  ¡Historia Clínica Abierta con Éxito!
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  ID Historia Clínica Generado: <span className="font-bold">{generatedId}</span>
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-6 font-bold transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Confirmar Apertura de HC
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}