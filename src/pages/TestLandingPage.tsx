import { useNavigate } from 'react-router-dom';
import { 
  PawPrint, Lock, Users, Heart, ClipboardList, Stethoscope, 
  Bell, MessageSquare, Star, Calendar, FileText
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const TestLandingPage = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'HU01',
      title: 'Módulo de Mascotas (HU01)',
      description: 'Gestión y visualización de mascotas disponibles para adopción.',
      icon: <PawPrint className="w-12 h-12 text-orange-500" />,
      active: true,
      path: '/pets',
    },
    {
      id: 'HU03',
      title: 'Registro de Refugios (HU03)',
      description: 'Permite registrar nuevos refugios en la red.',
      icon: <Lock className="w-12 h-12 text-purple-500" />,
      active: true,
      path: '/register-shelter',
    },
    {
      id: 'HU24',
      title: 'Registro de Adoptante (HU24)',
      description: 'Regístrate como adoptante para solicitar la adopción de mascotas.',
      icon: <Users className="w-12 h-12 text-blue-500" />,
      active: true,
      path: '/register-adopter',
    },
    {
      id: 'HU28',
      title: 'Registrar Adopción (HU28)',
      description: 'Registra una adopción formal con su fecha para dejar constancia oficial.',
      icon: <Heart className="w-12 h-12 text-red-500" />,
      active: true,
      path: '/register-adoption',
    },
    {
      id: 'HU30',
      title: 'Actualizar Convivencia (HU30)',
      description: 'Actualiza el resultado de una convivencia de prueba.',
      icon: <ClipboardList className="w-12 h-12 text-green-500" />,
      active: true,
      path: '/update-trial-cohabitation',
    },
    {
      id: 'HU04',
      title: 'Consulta de Veterinarios (HU04)',
      description: 'Busca veterinarios disponibles para asegurar el bienestar de tu mascota.',
      icon: <Stethoscope className="w-12 h-12 text-blue-600" />,
      active: true,
      path: '/veterinarians',
    },
    {
      id: 'HU16-18',
      title: 'Centro de Notificaciones (HU16-18)',
      description: 'Visualiza, marca como leídas y elimina tus notificaciones.',
      icon: <Bell className="w-12 h-12 text-indigo-500" />,
      active: true,
      path: '/notifications',
    },
    {
      id: 'HU19',
      title: 'Mensajería (HU19)',
      description: 'Envía mensajes directos a los encargados de los refugios.',
      icon: <MessageSquare className="w-12 h-12 text-emerald-500" />,
      active: true,
      path: '/send-message',
    },
    {
      id: 'HU20-22',
      title: 'Gestión de Reseñas (HU20-22)',
      description: 'Crea, visualiza y elimina reseñas sobre mascotas y procesos.',
      icon: <Star className="w-12 h-12 text-yellow-500" />,
      active: true,
      path: '/reviews',
    },
    {
      id: 'HU23',
      title: 'Eventos de Refugio (HU23)',
      description: 'Registra y gestiona eventos especiales organizados por refugios.',
      icon: <Calendar className="w-12 h-12 text-pink-500" />,
      active: true,
      path: '/register-shelter-event',
    },
    {
      id: 'HU07-10-14',
      title: 'Catálogo y Control de Vacunas (HU07, HU10, HU14)',
      description: 'Gestión del catálogo, registro de aplicaciones y eliminación de vacunas (HU14).',
      icon: <ClipboardList className="w-12 h-12 text-teal-500" />,
      active: true,
      path: '/vaccines',
    },
    {
      id: 'HU08-11-15',
      title: 'Historias Clínicas e Historial (HU08, HU11, HU15)',
      description: 'Apertura de HC, consulta cronológica de eventos y eliminación de reportes (HU15).',
      icon: <FileText className="w-12 h-12 text-rose-500" />,
      active: true,
      path: '/clinical/consult',
    },
    {
      id: 'HU09-12',
      title: 'Eventos Médicos (HU09, HU12)',
      description: 'Registrar nuevas consultas sanitarias y modificar diagnósticos existentes.',
      icon: <Calendar className="w-12 h-12 text-emerald-500" />,
      active: true,
      path: '/events/register',
    },
    {
      id: 'HU13',
      title: 'Administración Crítica (HU13)',
      description: 'Panel de control para la eliminación física completa de registros creados por error masivo.',
      icon: <Lock className="w-12 h-12 text-red-600" />,
      active: true,
      path: '/admin/delete',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">Developer Test Environment</h1>
          <p className="text-neutral-600 italic">
            Panel de control para pruebas de Historias de Usuario integradas
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => module.active && navigate(module.path)}
              disabled={!module.active}
              className={`p-8 bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 flex flex-col items-center text-center
                ${
                  module.active
                    ? 'border-orange-200 hover:border-orange-500 cursor-pointer hover:shadow-lg'
                    : 'border-gray-100 opacity-60 grayscale cursor-not-allowed'
                }`}
            >
              <div className="mb-4">{module.icon}</div>
              <h2 className="text-xl font-bold mb-2 text-neutral-800">{module.title}</h2>
              <p className="text-sm text-neutral-500">{module.description}</p>
              {module.active && (
                <span className="mt-4 px-4 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  Disponible
                </span>
              )}
            </button>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
