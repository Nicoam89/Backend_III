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