# Build del proyecto
FROM node:20-alpine AS build
WORKDIR /app

# Argumento para el puerto del API (se puede pasar al construir)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Servidor Nginx para produccion
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Configuración de Nginx para evitar errores 404 en SPAs
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
