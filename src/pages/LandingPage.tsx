import { PawPrint, Clipboard, Stethoscope, Syringe, BookOpen, Edit, Trash, Search, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const modules = [
  {
    id: 'HU07',
    title: 'Catálogo de Vacunas (HU07)',
    description: 'Registrar y actualizar vacunas en el sistema.',
    icon: <PawPrint className="w-12 h-12 text-orange-500" />,
    active: true,
    path: '/vaccines'
  },
  {
    id: 'HU08',
    title: 'Historia Clínica (HU08)',
    description: 'Crear historia clínica para cada mascota.',
    icon: <Clipboard className="w-12 h-12 text-green-500" />,
    active: true,
    path: '/medical-histories'
  },
  {
    id: 'HU09',
    title: 'Eventos Médicos (HU09)',
    description: 'Agregar consultas y diagnósticos a la historia clínica.',
    icon: <Stethoscope className="w-12 h-12 text-blue-500" />,
    active: true,
    path: '/medical-events'
  },
  {
    id: 'HU10',
    title: 'Vacunación Aplicada (HU10)',
    description: 'Registrar cada aplicación de vacuna realizada.',
    icon: <Syringe className="w-12 h-12 text-purple-500" />,
    active: true,
    path: '/vaccination-records'
  },
  {
    id: 'HU11',
    title: 'Consulta Historial Médico (HU11)',
    description: 'Visualizar todos los eventos y vacunas de una mascota.',
    icon: <BookOpen className="w-12 h-12 text-indigo-500" />,
    active: true,
    path: '/medical-histories'
  },
  {
    id: 'HU12',
    title: 'Modificar Eventos Médicos (HU12)',
    description: 'Editar descripción de un evento médico previo.',
    icon: <Edit className="w-12 h-12 text-yellow-500" />,
    active: true,
    path: '/medical-events'
  },
  {
    id: 'HU13',
    title: 'Eliminar Registros Erróneos (HU13)',
    description: 'Eliminar registros de vacunación o eventos creados por error.',
    icon: <Trash className="w-12 h-12 text-red-500" />,
    active: true,
    path: '/medical-events' // también puedes usar /vaccination-records
  },
  {
    id: 'HU14',
    title: 'Detalle de Vacunas (HU14)',
    description: 'Consultar detalles de una vacuna específica.',
    icon: <Search className="w-12 h-12 text-teal-500" />,
    active: true,
    path: '/vaccines'
  },
  {
    id: 'HU15',
    title: 'Actualizar Historia Clínica (HU15)',
    description: 'Actualizar información en una historia clínica existente.',
    icon: <RefreshCw className="w-12 h-12 text-pink-500" />,
    active: true,
    path: '/medical-histories'
  }
];

export const LandingPage = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Módulos del Sistema</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.filter(m => m.active).map(module => (
          <Link
            key={module.id}
            to={module.path}
            className="border rounded-lg p-6 shadow hover:shadow-lg transition bg-white flex flex-col items-center"
          >
            {module.icon}
            <h2 className="text-xl font-semibold mt-4">{module.title}</h2>
            <p className="text-gray-600 mt-2 text-center">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
