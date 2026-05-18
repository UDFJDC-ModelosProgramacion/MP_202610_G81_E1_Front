# Documentacion Completa - Pet Adoption System Frontend

Esta es la documentacion tecnica completa del proyecto frontend para el sistema de adopcion de mascotas. Esta guia esta dirigida a todos los miembros del equipo y cualquier persona que quiera entender, mantener o expandir el proyecto.

## Tabla de Contenidos

1. [Descripcion del Proyecto](#descripcion-del-proyecto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Guia para Agregar Historias de Usuario](#guia-para-agregar-historias-de-usuario)
5. [Configuracion y Despliegue](#configuracion-y-despliegue)
6. [Conexion con el Backend](#conexion-con-el-backend)
7. [Interfaz de Usuario (UI)](#interfaz-de-usuario-ui)
8. [Experiencia de Usuario (UX)](#experiencia-de-usuario-ux)
9. [Convenciones de Codigo](#convenciones-de-codigo)
10. [Pruebas](#pruebas)
11. [Metricas y Calidad](#metricas-y-calidad)
12. [Recomendaciones de Diseno (Figma)](#recomendaciones-de-diseno-figma)
13. [Pendientes](#pendientes)
14. [Resolucion de Problemas](#resolucion-de-problemas)

---

## Descripcion del Proyecto

El **Pet Adoption System Frontend** es una aplicacion web de una sola pagina (SPA) que permite a los usuarios visualizar y gestionar mascotas disponibles para adopcion. El proyecto fue construido como parte del curso de Modelos de Procesos de Software, siguiendo las directrices del ciclo 1 y preparandose para el ciclo 2.

La aplicacion consume datos de un API RESTful construido en Spring Boot (Backend) y presenta la informacion de manera organizada, permitiendo filtrar mascotas por especie y tamano, visualizar detalles y navegar por diferentes modulos correspondientes a las Historias de Usuario (HU).

**Caracteristicas principales:**
- SPA (Single Page Application) con React
- Consumo de API RESTful
- Manejo de estados de carga y error
- Filtros de busqueda
- Diseno responsive
- Componentes reutilizables

---

## Tecnologias Utilizadas

### Lenguajes Base
- **TypeScript**: Lenguaje principal, proporciona tipado estatico para evitar errores comunes en JavaScript.
- **HTML5 / CSS3**: Estructura y estilos base.

### Frameworks y Librerias
- **React 19.2.5**: Libreria para construir interfaces de usuario basada en componentes.
- **React Router DOM 7.14.2**: Manejo de enrutamiento del lado del cliente (SPA).
- **Vite 8.0.10**: Herramienta de construccion ultra-rapida que reemplaza a Create React App.

### Frameworks CSS
- **Tailwind CSS 4.2.4**: Framework de utilidades para estilos rapidos y consistentes.
- **shadcn/ui (Radix UI)**: Conjunto de componentes preconstruidos y accesibles (botones, inputs, dialogos, etc.).

### Cliente HTTP
- **Axios 1.15.2**: Cliente HTTP para realizar peticiones al backend.

### Herramientas de Desarrollo
- **ESLint**: Linter para mantener la calidad del codigo.
- **TypeScript Compiler**: Para verificacion de tipos.
- **Docker / Docker Compose**: Para contenerizacion y despliegue consistente.

---

## Estructura del Proyecto

¡Buenas noticias! Hemos organizado el proyecto siguiendo una arquitectura basada en **features**. Esto nos ayuda a que el código sea más escalable y que cada uno pueda trabajar en su parte de forma más independiente.

### Vista General (Simplificada)

```
/
├── src/
│   ├── components/
│   │   ├── layout/       # Piezas globales (Header, Sidebar)
│   │   └── ui/           # Componentes base (shadcn/ui)
│   ├── features/         # Lógica por funcionalidad (módulos)
│   ├── pages/            # Vistas principales de la app
│   ├── services/         # Conexión central con la API
│   ├── styles/           # Estilos globales, fuentes y temas
│   ├── types/            # Interfaces y DTOs
│   └── App.tsx           # Orquestador de rutas
├── Dockerfile            # Receta para crear la imagen Docker
├── docker-compose.yml    # Orquestación y variables (puertos, API URL)
└── package.json          # Listado de dependencias y scripts
```

### Explicación de Carpetas

| Carpeta | ¿Qué guardamos aquí? |
|---------|----------------------|
| `src/components/layout` | Componentes que se ven en casi todas las páginas (Header, Footer). |
| `src/features` | El corazón de cada módulo. Agrupamos componentes y lógica por funcionalidad. |
| `src/pages` | Las páginas completas que combinan features y componentes. |
| `src/services` | Todas las funciones que hablan con el Backend. |
| `src/styles` | Archivos CSS, configuración de temas y fuentes. |
| `src/types` | Las "plantillas" de nuestros datos para que TypeScript nos ayude. |

---

## Guia para Agregar Historias de Usuario

Esta es la guia paso a paso para agregar una nueva Historia de Usuario (HU) al proyecto siguiendo nuestra nueva arquitectura. Supondremos que vamos a agregar la **HU02: Modulo de Adopciones** como ejemplo.

### Paso 1: Definir los Tipos de Datos (DTOs)

Crea un nuevo archivo en `src/types/` con la interfaz que coincida con el DTO del backend. Esto nos asegura que todos hablemos el mismo idioma que el servidor.

**Archivo:** `src/types/adoption.ts`

```typescript
// DTO para Adopciones
export interface AdoptionDTO {
  id: number;
  petId: number;
  petName: string;
  adopterName: string;
  adopterEmail: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestDate: string;
  notes?: string;
}

// DTO para crear una nueva adopcion
export interface CreateAdoptionDTO {
  petId: number;
  adopterName: string;
  adopterEmail: string;
  notes?: string;
}
```

**Nota:** Los nombres de las propiedades deben coincidir exactamente con los que envia el backend de Spring Boot.

### Paso 2: Crear el Servicio (Conexion API)

Crea un archivo en `src/services/` para manejar todas las peticiones HTTP. Centralizamos esto aquí para que sea fácil de mantener.

**Archivo:** `src/services/adoptionService.ts`

```typescript
import axios from 'axios';
import { type AdoptionDTO } from '../types/adoption';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const API_URL = `${BASE_URL}/adoptions`;

export interface AdoptionFilters {
  status?: string;
  petId?: number;
}

// Ejemplo: Obtener adopciones con filtros (ej. solo las que están en PROGRESS)
export const getAdoptions = async (filters?: AdoptionFilters): Promise<AdoptionDTO[]> => {
  const response = await axios.get<AdoptionDTO[]>(API_URL, {
    params: {
      ...filters
    }
  });
  return response.data;
};
```

### Paso 3: Crear el Módulo (Feature)

Aquí es donde ocurre la magia. Crea una carpeta dentro de `src/features/` para tu HU. Aquí pondrás los componentes específicos y la lógica de negocio de ese módulo.

**Carpeta sugerida:** `src/features/adoptions/components/`

Crea tus componentes (ej. `AdoptionList.tsx`, `AdoptionForm.tsx`) dentro de esa carpeta. Esto mantiene el proyecto ordenado y evita que `src/components` se llene de cosas que solo se usan en un lugar.

### Paso 4: Crear la Pagina (Vista)

Ahora, crea un archivo en `src/pages/` que use los componentes de tu **feature**. Esta será la "pantalla" completa que verá el usuario.

**Archivo:** `src/pages/AdoptionPage.tsx`

```typescript
import { useEffect, useState } from 'react';
import { Header } from '../components/layout/Header'; // ¡Ahora está en layout!
import { getAdoptions } from '../services/adoptionService';
import { type AdoptionDTO } from '../types/adoption';
import { AdoptionList } from '../features/adoptions/components/AdoptionList';

export const AdoptionPage = () => {
  const [adoptions, setAdoptions] = useState<AdoptionDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAdoptions = async () => {
      try {
        setLoading(true);
        // Podemos pasar filtros, por ejemplo para ver solo las que están en progreso
        const data = await getAdoptions({ status: 'PROGRESS' });
        setAdoptions(data);
        setError(null);
      } catch (err) {
        setError("No se pudo conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };
    loadAdoptions();
  }, []);

  return (
    <div className="flex h-screen bg-background flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-neutral-800 mb-6">
            Gestion de Adopciones
          </h1>

          {loading && (
            <div className="text-center py-10">
              <p className="text-orange-500 animate-pulse">Cargando adopciones...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {!loading && !error && (
            <AdoptionList items={adoptions} />
          )}
        </div>
      </main>
    </div>
  );
};
```

### Paso 5: Registrar la Ruta en App.tsx

Edita `src/App.tsx` para que React sepa cómo llegar a tu nueva página.

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetHomePage } from './pages/PetHomePage';
import { LandingPage } from './pages/LandingPage';
import { AdoptionPage } from './pages/AdoptionPage'; // Nueva importacion

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pets" element={<PetHomePage />} />
        {/* Nueva ruta para HU02 */}
        <Route path="/adoptions" element={<AdoptionPage />} />
        <Route path="*" element={<div className="p-10">404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
```

### Paso 6: Actualizar el LandingPage (Opcional pero Recomendado)

Edita `src/pages/LandingPage.tsx` para que el modulo de tu HU aparezca como disponible. Cambia `active: false` a `active: true` y pon el `path` correcto.

```typescript
const modules = [
  { 
    id: 'HU01', 
    title: 'Modulo de Mascotas (HU01)', 
    description: 'Gestion y visualizacion de mascotas.',
    icon: <PawPrint className="w-12 h-12 text-orange-500" />,
    active: true,
    path: '/pets'
  },
  { 
    id: 'HU02', 
    title: 'Modulo de Adopciones (HU02)', 
    description: 'Gestion de solicitudes de adopcion.',
    icon: <Users className="w-12 h-12 text-blue-500" />,
    active: true, // Actívalo aquí
    path: '/adoptions' // Y pon la ruta
  },
  // ... resto de modulos
];
```

### Resumen de Archivos a Modificar/Crear

| Accion | Archivo / Carpeta | Descripcion |
|--------|-------------------|-------------|
| Crear | `src/types/nombre.ts` | Definir interfaces de datos |
| Crear | `src/services/nombreService.ts` | Funciones de API centralizadas |
| Crear | `src/features/nombre/` | Componentes y lógica específica del módulo |
| Crear | `src/pages/NombrePage.tsx` | Vista principal de la HU |
| Editar | `src/App.tsx` | Agregar la ruta |
| Editar | `src/pages/LandingPage.tsx` | Mostrar modulo como disponible |

---

## Configuracion y Despliegue

### Requisitos Previos

Antes de ejecutar el proyecto, asegurate de tener:

1. **Git** instalado para clonar el repositorio.
2. **Node.js v20 o superior** si vas a trabajar sin Docker.
3. **Docker Desktop** (Windows/Mac) o **Docker Engine + Docker Compose** (Linux) para despliegue con contenedores.
4. **Backend de Spring Boot** ejecutandose (el API debe estar disponible).

### Opcion 1: Ejecucion con Docker (Recomendado)

El proyecto incluye un `Dockerfile` y `docker-compose.yml` configurados para crear un entorno consistente.

#### Paso 1: Configura tu conexión con el Backend

Ya no tienes que buscar por todo el código. Ahora puedes ajustar el puerto del Backend directamente en el archivo ***docker-compose.yml*** usando la variable ***VITE_API_BASE_URL***:

```yaml
environment:
  - VITE_API_BASE_URL=http://localhost:8999/api
```

**Súper Importante:** Si cambias el puerto o cualquier variable de entorno, recuerda siempre ejecutar:
```bash
docker compose up --build -d
```
El flag `--build` es la clave para que el Frontend tome los nuevos cambios de configuración. ¡No lo olvides!

#### Paso 2: Construir y ejecutar

Abre una terminal en la raiz del proyecto y ejecuta:

**Windows (PowerShell/CMD):**
```bash
docker compose up --build -d
```

**Linux (Arch/Ubuntu):**
```bash
sudo docker-compose up --build -d
```

- `--build`: Fuerza la reconstruccion de la imagen si hubo cambios.
- `-d`: Ejecuta los contenedores en segundo plano (detached mode).

#### Paso 3: Acceder a la aplicacion

Una vez que termine, abre tu navegador y visita:
```
http://localhost:3000
```

#### Comandos utiles de Docker

```bash
# Ver contenedores en ejecucion
docker ps

# Ver logs de la aplicacion
docker logs <nombre-del-contenedor>

# Detener los contenedores
docker compose down

# Reconstruir si hiciste cambios
docker compose up --build -d
```

### Opcion 2: Ejecucion Manual (Desarrollo Local)

Si prefieres trabajar sin Docker (modo desarrollo):

#### Paso 1: Clonar el repositorio

```bash
git clone <url-del-repo>
cd MP_202610_G81_E1_Front
```

#### Paso 2: Instalar dependencias

```bash
npm install
```

#### Paso 3: Configurar variables de entorno

Crea un archivo `.env` en la raiz del proyecto (al mismo nivel que `package.json`):

```
VITE_API_BASE_URL=http://localhost:8999/api
```

**Nota:** Vite requiere que las variables de entorno empiecen con `VITE_`.

#### Paso 4: Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicacion estara disponible en:
```
http://localhost:5173
```

#### Scripts disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Genera el build de produccion en `dist/` |
| `npm run lint` | Ejecuta ESLint para verificar calidad de codigo |
| `npm run preview` | Previsualiza el build de produccion localmente |

---

## Conexion con el Backend

El frontend se comunica con el backend de Spring Boot mediante peticiones HTTP utilizando **Axios**.

### Configuracion de la URL Base

La URL base del API se configura en dos lugares:

1. **Variables de entorno (`.env` o `docker-compose.yml`):**
   ```
   VITE_API_BASE_URL=http://localhost:8999/api
   ```

2. **En los servicios (`src/services/*.ts`):**
   ```typescript
   const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
   const API_URL = `${BASE_URL}/pets`;
   ```

**Nota:** Siempre usa la variable de entorno para que el puerto sea dinámico y coincida con tu configuración.

### Manejo de Errores

Todas las peticiones deben estar envueltas en bloques `try-catch` para manejar errores de red o del servidor:

```typescript
try {
  setLoading(true);
  const data = await getAdoptions({ status: 'PROGRESS' });
  setAdoptions(data);
  setError(null);
} catch (err) {
  setError("No se pudo conectar al servidor. Verifica que el backend esté activo.");
} finally {
  setLoading(false);
}
```

### Estados de la Aplicacion

Siempre maneja estos tres estados al consumir datos:

1. **Loading (Cargando):** Mostrar un mensaje o spinner mientras se espera la respuesta.
2. **Error:** Mostrar un mensaje claro si algo fallo.
3. **Success (Exito):** Mostrar los datos obtenidos.

---

## Interfaz de Usuario (UI)

### Componentes Reutilizables

El proyecto utiliza **shadcn/ui** como base de componentes. Estos estan en `src/components/ui/` y no deben modificarse directamente.

Para crear un nuevo componente reutilizable:

1. Crea un archivo en `src/components/`.
2. Importa los componentes base de `ui/` segun sea necesario.
3. Exporta tu componente.

**Ejemplo:** `src/components/PetCard.tsx` usa componentes de `ui/` pero agrega logica especifica para mostrar una mascota.

### Formularios y Validaciones

Para formularios, se recomienda usar:
- Componentes de `shadcn/ui` como `Input`, `Button`, `Select`, etc.
- Validacion basica con estados de React (`useState`).
- En el futuro: Librerias como `react-hook-form` o `formik` para formularios complejos.

### Navegacion

La navegacion se maneja con **React Router DOM**. Las rutas se definen en `src/App.tsx`.

- `/` - LandingPage (Pagina de inicio)
- `/pets` - PetHomePage (HU01)
- `/adoptions` - AdoptionPage (HU02, ejemplo)

---

## Experiencia de Usuario (UX)

### Flujo de Usuario

El flujo actual es:
1. El usuario entra a `/` (LandingPage).
2. Ve los 4 modulos disponibles.
3. Hace clic en un modulo activo y es redirigido a la pagina correspondiente.
4. En la pagina de mascotas, puede filtrar y ver tarjetas de mascotas.

### Retroalimentacion Visual

- **Loaders:** Se muestra un mensaje "Loading..." con animacion `animate-pulse` mientras cargan los datos.
- **Mensajes de error:** Se muestran en un cuadro rojo con borde.
- **Lista vacia:** Se muestra un mensaje indicando que no hay datos.

### Accesibilidad Basica

- Uso de etiquetas semanticas (`<main>`, `<header>`, `<div>` con roles cuando aplique).
- Contraste adecuado en colores (usando paleta de Tailwind: `neutral`, `orange`, `red`).
- **Pendiente:** Mejorar navegacion con teclado y agregar atributos `aria-*`.

---

## Convenciones de Codigo

### Nombrado

- **Archivos:** PascalCase para componentes/paginas (`PetCard.tsx`, `LandingPage.tsx`), camelCase para servicios/tipos (`petService.ts`, `pet.ts`).
- **Componentes:** PascalCase (`PetCard`, `Header`).
- **Funciones:** camelCase (`getAvailablePets`, `handleFilterUpdate`).
- **Interfaces:** PascalCase con sufijo `DTO` o sin sufijo (`PetDTO`, `PetFilters`).

### Imports

Siempre usar imports absolutos desde `src/` o relativos limpios:

```typescript
import { Header } from '../components/layout/Header';
import { PetDTO } from '../types/pet'; 
```

### Tipado

Siempre tipar las props de los componentes y las respuestas de API:

```typescript
interface PetCardProps {
  name: string;
  breed: string;
  age: number;
}

export const PetCard = ({ name, breed, age }: PetCardProps) => {
  // ...
};
```

---

## Pruebas

### Estado Actual

El proyecto aun no tiene pruebas automatizadas implementadas.

### Pendiente

Se deben implementar:

1. **Pruebas unitarias:** Para funciones de servicios y componentes aislados.
   - Herramientas recomendadas: **Vitest** o **Jest**.
2. **Pruebas de componentes:** Para verificar renderizado y comportamiento.
   - Herramienta recomendada: **React Testing Library**.
3. **Pruebas end-to-end (E2E):** Para simular flujos completos de usuario.
   - Herramientas recomendadas: **Cypress** o **Playwright**.
4. **Pruebas manuales:** Crear una lista de casos de prueba y ejecutarlos manualmente.

### Ejemplo de Prueba Unitaria (Futuro)

```typescript
import { describe, it, expect } from 'vitest';
import { getAvailablePets } from './petService';

describe('petService', () => {
  it('should fetch available pets', async () => {
    const pets = await getAvailablePets();
    expect(pets).toBeInstanceOf(Array);
  });
});
```

---

## Metricas y Calidad

### Herramientas Requeridas

Segun las directrices del curso, cada equipo debe instalar localmente:

1. **Jenkins:** Servidor de integracion continua para automatizar builds y pruebas.
2. **SonarQube:** Plataforma para inspeccion de calidad de codigo y deteccion de vulnerabilidades.

### Configuracion Pendiente

- [ ] Configurar Jenkins localmente.
- [ ] Configurar SonarQube localmente.
- [ ] Crear pipeline en Jenkins que ejecute:
  - `npm install`
  - `npm run lint`
  - `npm run build`
  - `npm test` (cuando este implementado)
- [ ] Conectar Jenkins con SonarQube para analisis de codigo.

### Linting Actual

El proyecto usa ESLint con la configuracion estandar de React + TypeScript. Para ejecutar:

```bash
npm run lint
```

---

## Recomendaciones de Diseno (Figma)

Antes de empezar a codificar cualquier Historia de Usuario, es **muy recomendable** diseñar la interfaz en **Figma**.

### Por que Figma?

- Permite visualizar el resultado antes de programar.
- Facilita la comunicacion entre diseñadores y desarrolladores.
- Ayuda a identificar componentes reutilizables.
- Evita rehacer codigo por cambios de ultimo minuto.

### Flujo de Trabajo Sugerido

1. **Crear mockups en Figma:** Diseña la pagina de tu HU (https://www.figma.com/).
2. **Identificar componentes:** Marca que partes son botones, inputs, tarjetas, etc.
3. **Definir la paleta de colores y tipografia:** Asegurate de que coincida con el tema actual (Tailwind + shadcn).
4. **Exportar assets:** Si necesitas imagenes o iconos, exportalos desde Figma.
5. **Codificar:** Ahora si, implementa el diseno en React.

### Ejemplo de lo que se puede disenar

- Pagina principal de la HU
- Formularios con sus estados (vacio, con error, lleno)
- Componentes como tarjetas, modales, etc.
- Flujo de navegacion (como se mueve el usuario)

> **Nota:** Si tienes un mockup en Figma, puedes agregar una captura de pantalla en esta wiki para referencia del equipo.

---

## Pendientes

Lista de tareas pendientes para completar el proyecto segun las directrices del curso:

### Desarrollo
- [ ] **HU02:** Agregar modulo de Adopciones (en progreso por cada integrante).
- [ ] **HU03:** Agregar modulo correspondiente.
- [ ] **HU04:** Agregar modulo correspondiente.
- [ ] **Formularios:** Implementar validaciones robustas en formularios.
- [ ] **Accesibilidad:** Mejorar atributos ARIA, navegacion con teclado y contraste.

### Pruebas
- [ ] **Pruebas unitarias:** Implementar con Vitest o Jest.
- [ ] **Pruebas de componentes:** Implementar con React Testing Library.
- [ ] **Pruebas E2E:** Configurar Cypress o Playwright.
- [ ] **Pruebas manuales:** Crear documento de casos de prueba y ejecutarlos.

### Calidad y Metricas
- [ ] **Jenkins:** Instalar y configurar servidor local.
- [ ] **SonarQube:** Instalar y configurar servidor local.
- [ ] **Pipeline CI/CD:** Crear pipeline en Jenkins para build y analisis automatico.

### Documentacion
- [ ] **Figma:** Disenar mockups de las proximas HU.
- [ ] **Wiki:** Mantener esta documentacion actualizada a medida que avanza el proyecto.

---

## Resolucion de Problemas

### La lista de mascotas no carga
- Verifica que el backend de Spring Boot este activo.
- Revisa que el puerto en `docker-compose.yml` y en los servicios coincida con el del backend.
- Abre la consola del navegador (F12) y revisa si hay errores de red (Network tab).

### Cambios no reflejados en Docker
- Si usas Docker y realizaste cambios en el codigo, reconstruye la imagen:
  ```bash
  docker compose up --build -d
  ```

### Error de permisos en Linux (Docker)
- Si Docker deniega el acceso, usa `sudo` o añade tu usuario al grupo docker:
  ```bash
  sudo usermod -aG docker $USER
  ```
  (Cierra sesion y vuelve a entrar para que surta efecto).

### Puerto ocupado
- Si el puerto `3000` (Docker) o `5173` (Vite) esta ocupado:
  - Cambia el puerto en `docker-compose.yml` (mapeo de puertos).
  - Para Vite, edita `vite.config.ts` y agrega `server: { port: 3001 }`.

### Error de CORS
- Si el navegador bloquea las peticiones por CORS, asegurate de que el backend tenga configurado CORS para permitir origenes desde el frontend.

---

## Notas Finales

Este proyecto es una base modular y escalable. Cada integrante del equipo puede trabajar en su Historia de Usuario de manera independiente siguiendo la estructura de carpetas establecida. Recuerda siempre hacer commits descriptivos y mantener el codigo limpio y organizado.

Para dudas o sugerencias, abrir un issue en el repositorio o contactar al lider del equipo.
er el codigo limpio y organizado.

Para dudas o sugerencias, abrir un issue en el repositorio o contactar al lider del equipo.
 repositorio o contactar al lider del equipo.

# Estrategia de Testing

Para mantener la salud del proyecto, todos los nuevos servicios y componentes deben contar con pruebas unitarias o de integración.

## Cómo crear un test para un Service

Para crear un test de un servicio, sigue estos pasos:

1. Crea un archivo en `tests/services/` con el sufijo `.test.ts` (ej. `tests/services/veterinarianService.test.ts`).
2. Utiliza `vitest` y mockea `axios`.
3. Asegúrate de cubrir los casos de éxito y manejo de errores.

### Ejemplo:
```typescript
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { getVeterinarians } from '../src/services/veterinarianService';

vi.mock('axios');

describe('veterinarianService', () => {
  it('should fetch data correctly', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] });
    const result = await getVeterinarians();
    expect(result).toEqual([]);
  });
});
```
