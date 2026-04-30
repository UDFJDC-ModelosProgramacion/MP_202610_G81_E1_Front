import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { PetCard } from '../components/PetCard';
import { getAvailablePets } from '../services/petService';
import { type PetDTO } from '../types/pet';

export const PetHomePage = () => {
  const [pets, setPets] = useState<PetDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPets = async () => {
      try {
        setLoading(true);
        const data = await getAvailablePets();
        setPets(data);
        setError(null);
      } catch (err) {
        console.error("Error al conectar con Spring Boot:", err);
        setError("Could not connect to the server. Check if Spring is running.");
      } finally {
        setLoading(false);
      }
    };
    loadPets();
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-neutral-800 mb-2">
                Available Pets
              </h1>
              <p className="text-neutral-600">Find your perfect companion</p>
            </div>

            {/* Manejo de estados: Cargando, Error o Lista vacía */}
            {loading && (
              <div className="text-center py-10">
                <p className="text-orange-500 animate-pulse font-medium">Loading amazing pets...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {!loading && !error && pets.length === 0 && (
              <div className="text-center py-10">
                <p className="text-neutral-500">No pets available at the moment. Check back later!</p>
              </div>
            )}

            {/* El Grid de Mascotas */}
            {/* El Grid de Mascotas */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			  {pets.map((pet) => (
				<PetCard
				  key={pet.id}
				  name={pet.name}
				  breed={pet.breed}
				  age={pet.age}
				  photos={pet.photos} // Usamos la propiedad photos como definimos en el DTO de Java
				  // Accedemos al nombre dentro del objeto shelter
				  shelterName={pet.shelter?.name || "Refugio Local"} 
				/>
			  ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};;
