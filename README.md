# Backend III - Adoption API

Proyecto backend desarrollado con Node.js y Express.  
Incluye tests funcionales para el router de adopciones `adoption.router.js`, Dockerfile optimizado e imagen publicada en DockerHub.

---

## Repositorio

```bash
https://github.com/Nicoam89/Backend_III

## Imagen DockerHub
https://hub.docker.com/repository/docker/nicoam89/adoption-api

## Imagen publicada:

nicoam89/adoption-api:1.0.0
nicoam89/adoption-api:latest

## Tecnologías utilizadas
Node.js
Express
Mocha
Chai
Supertest
Sinon
Docker
Docker Scout


## Estructura del proyecto

Backend_III/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/
│   │   └── adoption.router.js
│   └── controllers/
│       └── adoptions.controller.js
├── test/
│   ├── helpers/
│   │   └── testApp.js
│   └── functional/
│       └── adoption.router.test.js
├── Dockerfile
├── .dockerignore
├── package.json
├── package-lock.json
└── README.md

## Instalación local

npm install

## Ejecutar proyecto localmente

npm start

# La aplicación queda disponible en:

http://localhost:8080

# Endpoint de salud:

http://localhost:8080/health


## Ejecutar tests funcionales

npm run test:functional

# Los tests funcionales cubren los siguientes endpoints

GET /api/adoptions
GET /api/adoptions/:aid
POST /api/adoptions/:uid/:pid


Casos validados:

Obtención exitosa de adopciones.
Listado vacío.
Búsqueda por ID.
Validación de ID inválido.
Recurso no encontrado.
Creación exitosa de adopción.
Usuario inexistente.
Mascota inexistente.
Mascota ya adoptada.
Error interno del servidor.


## Dockerización

# Dockerfile utilizado

FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production

EXPOSE 8080

USER node

CMD ["npm", "start"]


## Decisiones de optimización

< Se utilizó node:24-alpine como imagen base por ser una versión liviana y con menor cantidad de vulnerabilidades detectadas respecto de node:20-alpine. 

< Se copiaron primero los archivos package.json y package-lock.json para aprovechar la caché de Docker durante la instalación de dependencias.

< Se utilizó npm ci --omit=dev para instalar únicamente dependencias productivas de forma limpia y reproducible.

< Se agregó USER node para evitar que la aplicación se ejecute como usuario root dentro del contenedor.

## Construir imagen Docker local

docker build -t adoption-api:1.0.0 .

## Ejecutar contenedor local

docker run -d --name adoption-api-container -p 8081:8080 adoption-api:1.0.0

## Verificar funcionamiento del contenedor

curl http://localhost:8081/health

## Respuesta esperada:

{
  "status": "success",
  "message": "Server running"
}

## También se puede probar:

curl http://localhost:8081/api/adoptions


## Escaneo básico de seguridad

### Se ejecutó Docker Scout sobre la imagen construida:

docker scout quickview adoption-api:1.0.0

## Resultado final luego de optimizar la imagen base:

Target: adoption-api:1.0.0
Base image: node:24-alpine
Vulnerabilidades: 0C 1H 2M 2L
Policy status: FAILED (4/7 policies met)

## Se logró eliminar la vulnerabilidad crítica, reducir vulnerabilidades altas y ejecutar la imagen con usuario no-root.

## Subir imagen a DockerHub

docker login
docker tag adoption-api:1.0.0 nicoam89/adoption-api:1.0.0
docker tag adoption-api:1.0.0 nicoam89/adoption-api:latest
docker push nicoam89/adoption-api:1.0.0
docker push nicoam89/adoption-api:latest

## Descargar imagen desde DockerHub

docker pull nicoam89/adoption-api:1.0.0

## Ejecutar imagen desde DockerHub

docker run -d --name adoption-api-container -p 8081:8080 nicoam89/adoption-api:1.0.0
Ver logs del contenedor
docker logs adoption-api-container

## Detener y eliminar contenedor
docker stop adoption-api-container
docker rm adoption-api-container


## Autor

## Nicolás Ariel Martín