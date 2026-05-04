import { useNavigate } from 'react-router-dom';
import { PawPrint, Lock, Settings, Users } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();

  const modules = [
    { 
      id: 'HU01', 
      title: 'Módulo de Mascotas (HU01)', 
      description: 'Gestión y visualización de mascotas disponibles para adopción.',
      icon: <PawPrint className="w-12 h-12 text-orange-500" />,
      active: true,
      path: '/pets'
    },
    { 
      id: 'HU02', 
      title: 'Módulo de xxxxx (HUxx)', 
      description: 'Próximamente',
      icon: <Users className="w-12 h-12 text-blue-500" />,
      active: false 
    },
    { 
      id: 'HU03', 
      title: 'Modulo de xxxxx (HU03)', 
      description: 'Próximamente',
      icon: <Lock className="w-12 h-12 text-purple-500" />,
      active: false 
    },
    { 
      id: 'HU04', 
      title: 'Modulo de xxxxx (HUXX)', 
      description: 'Próximamente',
      icon: <Settings className="w-12 h-12 text-gray-500" />,
      active: false 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">Pet Adoption System</h1>
        <p className="text-neutral-600 italic">Home en desarrollo - Seleccione un módulo funcional</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        {modules.map((module) => (
          <div 
            key={module.id}
            onClick={() => module.active && navigate(module.path!)}
            className={`p-8 bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 flex flex-col items-center text-center
              ${module.active 
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
          </div>
        ))}
      </div>
    </div>
  );
};
