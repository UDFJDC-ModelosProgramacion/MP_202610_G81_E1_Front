import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Trash2, ShieldAlert, AlertCircle } from 'lucide-react';

export default function DeleteRecords() {
  const [records, setRecords] = useState([
    { id: 'REG-901', pet: 'Luna (#102)', date: '27 Mar 2026', type: 'Consulta', detail: 'Control de peso - Fiebre' },
    { id: 'REG-504', pet: 'Toby (#105)', date: '15 Abr 2026', type: 'Vacunación', detail: 'Aplicación errónea de Triple Felina en canino' },
    { id: 'REG-332', pet: 'Kira (#110)', date: '02 May 2026', type: 'Diagnóstico', detail: 'Duplicado de reporte clínico de otitis' },
  ]);

  const handleDelete = (id: string, pet: string) => {
    const confirmDelete = window.confirm(`¿Estás completamente segura de eliminar de forma permanente el registro ${id} de la mascota ${pet}? Esta acción no se puede deshacer.`);
    
    if (confirmDelete) {
      setRecords(records.filter(record => record.id !== id));
      alert(`El registro ${id} ha sido eliminado físicamente de la base de datos.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/40 p-6 max-w-4xl mx-auto space-y-6">
      {/* Encabezado de Advertencia */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-3 items-start">
        <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-red-800 text-sm">Zona de Administración Crítica (HU13)</h4>
          <p className="text-red-600 text-xs mt-0.5 leading-relaxed">
            Esta pantalla permite la eliminación permanente de registros clínicos creados por error humano o duplicación. Todo borrado quedará auditado.
          </p>
        </div>
      </div>

      <Card className="border-gray-100 shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-gray-500" /> Registros Médicos Recientes
          </CardTitle>
          <CardDescription>Haz clic en el botón de eliminación para retirar un registro erróneo de la historia clínica.</CardDescription>
        </CardHeader>
        <CardContent>
          {records.length === 0 ? (
            <div className="text-center py-12 text-gray-400 space-y-2">
              <AlertCircle className="w-12 h-12 mx-auto text-gray-300" />
              <p className="text-sm font-medium">No quedan registros erróneos pendientes en este módulo.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((rec) => (
                <div key={rec.id} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-red-200 transition-colors">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono bg-gray-50 text-gray-600 text-xs">{rec.id}</Badge>
                      <span className="text-sm font-bold text-gray-800">{rec.pet}</span>
                      <span className="text-xs text-gray-400">• {rec.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide">{rec.type}</p>
                    <p className="text-gray-600 text-sm">{rec.detail}</p>
                  </div>
                  
                  <Button 
                    onClick={() => handleDelete(rec.id, rec.pet)}
                    variant="ghost" 
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl px-4 py-2 self-end md:self-auto flex gap-2 font-semibold"
                  >
                    <Trash2 className="w-4 h-4" /> Eliminar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}