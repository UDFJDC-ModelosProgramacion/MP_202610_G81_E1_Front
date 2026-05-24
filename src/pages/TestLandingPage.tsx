import { useNavigate } from 'react-router-dom';
import {
  PawPrint, Lock, Users, Heart, ClipboardList, Stethoscope,
  Bell, MessageSquare, Star, Calendar, FileText, UserPlus, Dog
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

type ModuleGroup = {
  label: string;
  color: string;
  modules: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string;
  }[];
};

export const TestLandingPage = () => {
  const navigate = useNavigate();

  const groups: ModuleGroup[] = [
    {
      label: 'Registro Público',
      color: 'border-l-green-500',
      modules: [
        {
          id: 'HU24',
          title: 'Registro de Adoptante (HU24)',
          description: 'Regístrate como adoptante para solicitar adopciones.',
          icon: <Users className="w-10 h-10 text-blue-500" />,
          path: '/register-adopter',
        },
        {
          id: 'HU-VET-REG',
          title: 'Registro de Veterinario',
          description: 'Regístrate como veterinario para acceder a funciones clínicas.',
          icon: <Stethoscope className="w-10 h-10 text-teal-500" />,
          path: '/register-veterinarian',
        },
        {
          id: 'HU03',
          title: 'Registro de Refugios (HU03)',
          description: 'Registra nuevos refugios en la red.',
          icon: <Lock className="w-10 h-10 text-purple-500" />,
          path: '/register-shelter',
        },
        {
          id: 'HU-PET-REG',
          title: 'Registro de Mascota',
          description: 'Registra una nueva mascota en el sistema.',
          icon: <Dog className="w-10 h-10 text-orange-500" />,
          path: '/register-pet',
        },
      ],
    },
    {
      label: 'Módulos Públicos',
      color: 'border-l-blue-500',
      modules: [
        {
          id: 'HU01',
          title: 'Mascotas Disponibles (HU01)',
          description: 'Visualización de mascotas disponibles para adopción.',
          icon: <PawPrint className="w-10 h-10 text-orange-500" />,
          path: '/pets',
        },
        {
          id: 'HU04',
          title: 'Directorio Veterinarios (HU04)',
          description: 'Busca veterinarios disponibles para tu mascota.',
          icon: <Stethoscope className="w-10 h-10 text-blue-600" />,
          path: '/veterinarians',
        },
      ],
    },
    {
      label: 'Módulos de Adoptante',
      color: 'border-l-blue-500',
      modules: [
        {
          id: 'HU28',
          title: 'Registrar Adopción (HU28)',
          description: 'Registra una adopción formal con fecha oficial.',
          icon: <Heart className="w-10 h-10 text-red-500" />,
          path: '/register-adoption',
        },
        {
          id: 'HU30',
          title: 'Actualizar Convivencia (HU30)',
          description: 'Actualiza el resultado de una convivencia de prueba.',
          icon: <ClipboardList className="w-10 h-10 text-green-500" />,
          path: '/update-trial-cohabitation',
        },
        {
          id: 'HU16-18',
          title: 'Notificaciones (HU16-18)',
          description: 'Visualiza, marca como leídas y elimina notificaciones.',
          icon: <Bell className="w-10 h-10 text-indigo-500" />,
          path: '/notifications',
        },
        {
          id: 'HU19',
          title: 'Mensajería (HU19)',
          description: 'Envía mensajes directos a los refugios.',
          icon: <MessageSquare className="w-10 h-10 text-emerald-500" />,
          path: '/send-message',
        },
        {
          id: 'HU20-22',
          title: 'Reseñas (HU20-22)',
          description: 'Crea, visualiza y elimina reseñas sobre mascotas.',
          icon: <Star className="w-10 h-10 text-yellow-500" />,
          path: '/reviews',
        },
      ],
    },
    {
      label: 'Módulos de Veterinario',
      color: 'border-l-teal-500',
      modules: [
        {
          id: 'HU07-10-14',
          title: 'Control de Vacunas (HU07, HU10, HU14)',
          description: 'Catálogo, registro de aplicación y eliminación de vacunas.',
          icon: <ClipboardList className="w-10 h-10 text-teal-500" />,
          path: '/vaccines',
        },
        {
          id: 'HU08-11-15',
          title: 'Historias Clínicas (HU08, HU11, HU15)',
          description: 'Apertura de HC, consulta de eventos y eliminación de reportes.',
          icon: <FileText className="w-10 h-10 text-rose-500" />,
          path: '/clinical/consult',
        },
        {
          id: 'HU09-12',
          title: 'Eventos Médicos (HU09, HU12)',
          description: 'Registra consultas sanitarias y modifica diagnósticos.',
          icon: <Calendar className="w-10 h-10 text-emerald-500" />,
          path: '/events/register',
        },
      ],
    },
    {
      label: 'Módulos de Administrador',
      color: 'border-l-red-500',
      modules: [
        {
          id: 'HU23',
          title: 'Eventos de Refugio (HU23)',
          description: 'Gestiona eventos especiales organizados por refugios.',
          icon: <Calendar className="w-10 h-10 text-pink-500" />,
          path: '/register-shelter-event',
        },
        {
          id: 'HU13',
          title: 'Admin Crítica (HU13)',
          description: 'Eliminación física de registros creados por error.',
          icon: <Lock className="w-10 h-10 text-red-600" />,
          path: '/admin/delete',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center p-6 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">Developer Test Environment</h1>
          <p className="text-neutral-600 italic">
            Panel de control para pruebas de Historias de Usuario integradas
          </p>
        </header>

        <div className="max-w-7xl w-full space-y-10">
          {groups.map((group) => (
            <section key={group.label}>
              <h2 className="text-xl font-bold text-neutral-700 mb-4 border-l-4 pl-3 border-gray-300">
                {group.label}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => navigate(module.path)}
                    className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all duration-200 flex items-center gap-4 text-left"
                  >
                    <div className="shrink-0">{module.icon}</div>
                    <div>
                      <h3 className="font-bold text-neutral-800">{module.title}</h3>
                      <p className="text-sm text-neutral-500 mt-1">{module.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
