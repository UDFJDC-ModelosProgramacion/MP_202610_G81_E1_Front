## Enlaces de interes
- [Estructura del Front](https://github.com/UDFJDC-ModelosProgramacion/MP_202610_G81_E1_Front/wiki/Estructura)

# Pet Adoption System - Frontend

Este repositorio contiene la interfaz de usuario desarrollada con React, TypeScript y Vite. El proyecto se despliega mediante contenedores Docker para garantizar que todos los desarrolladores trabajen en el mismo entorno, evitando conflictos de versiones de Node.js o librerías.

## Requisitos previos

Para ejecutar este proyecto, es necesario tener instalado:

1. **Docker Desktop** (Si usas Windows o macOS).
2. **Docker Engine y Docker Compose** (Si usas Linux).
3. **Git** para clonar el repositorio.

## Estructura del proyecto

* **src/components**: Componentes visuales reutilizables.
* **src/pages**: Vistas principales de la aplicación.
* **src/services**: Funciones para consumir la API de Spring Boot.
* **src/types**: Definición de interfaces y DTOs compatibles con el Backend.
* **Dockerfile / docker-compose.yml**: Configuración para el despliegue de contenedores.

## Configuración y despliegue

Antes de iniciar, asegúrate de que el backend de Spring Boot esté en ejecución.

### 1. Ajustar la conexión con el Backend

El frontend necesita conocer la dirección de tu API. Si tu puerto de Spring Boot es distinto al configurado por defecto (ejemplo: 8999), abre el archivo ***docker-compose.yml*** y modifica la línea de ***VITE_API_BASE_URL***:

```
- VITE_API_BASE_URL=http://localhost:8999/pets
```

### 2. Ejecución con Docker (Recomendado)

Abre una terminal en la raíz del proyecto y ejecuta el comando correspondiente:

**En Windows (PowerShell o CMD):**
```
docker compose up --build -d
``` 

**En Linux (Arch/Ubuntu):**
```
sudo docker-compose up --build -d
```

Una vez finalizado el proceso, la aplicación estará disponible en: ***http://localhost:3000*** 

### 3. Ejecución manual (Desarrollo local)

Si prefieres ejecutar el proyecto sin Docker, asegúrate de tener Node.js v20 o superior:

1. Instalar dependencias:
```
npm install
```

2. Configurar variables de entorno (Crear archivo ***.env*** en la raíz):
```
VITE_API_BASE_URL=http://localhost:8999/pets
```

3. Iniciar el servidor:
```
npm run dev
```

## Arbol
```
src/
├── api/             # Configuración base de Axios
│   └── axios.ts
├── components/      # Componentes visuales 
│   ├── ui/          # Botones, inputs, etc.
│   ├── Header.tsx
│   └── PetCard.tsx
├── services/        # Logica de llamadas al Backend
│   └── petService.ts
├── types/           # DTOs
│   └── pet.ts       
└── App.tsx # El orquestador principal
```


## Resolución de problemas frecuentes

* **La lista de mascotas no carga**: Verifica que el backend esté activo y que el puerto en el archivo de configuración sea el correcto.
* **Cambios no reflejados**: Si usas Docker y realizas cambios en el código, es necesario reconstruir la imagen usando el comando con el flag ***--build***, normalmente ire actualizando la imagen los fines de semana.
* **Error de permisos en Linux**: Si Docker deniega el acceso, utiliza ***sudo*** o añade tu usuario al grupo docker de tu sistema.

## Notas adicionales

Para facilitar el despliegue entre diferentes equipos, el proceso de construcción omite verificaciones estrictas de TypeScript. Si añades nuevos componentes que requieran librerías externas, asegúrate de registrarlas en el archivo package.json. Para mayor comodidad ire agregando en la wiki la estructura que iremos trabajando para tener el proyecto escalable y modular.
