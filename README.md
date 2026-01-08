# 🚀 Proyecto MERN Stack con Docker

Un proyecto MERN (MongoDB, Express, React, Node.js) moderno con contenedorización Docker.

## 📋 Requisitos Previos

- Docker 24.0+
- Docker Compose 2.20+
- Git

## 🏗️ Estructura del Proyecto

```
ProyectoMERN/
├── backend/                 # Servidor Node.js + Express
│   ├── src/
│   │   ├── config/         # Configuración (BD, etc)
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── models/         # Esquemas de Mongoose
│   │   ├── routes/         # Definición de rutas
│   │   └── server.js       # Punto de entrada
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── frontend/                # Aplicación React + Vite
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── App.css
│   ├── public/
│   ├── index.html
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
├── docker-compose.yml       # Orquestación de contenedores
├── .gitignore
└── README.md
```

## 🚀 Cómo Ejecutar

### 1. Clonar el repositorio
```bash
git clone <repositorio>
cd ProyectoMERN
```

### 2. Levantar los servicios con Docker Compose
```bash
docker-compose up -d
```

Este comando levantará:
- **MongoDB** en `mongodb://localhost:27017`
- **Backend** en `http://localhost:5000`
- **Frontend** en `http://localhost:3000`

### 3. Verificar que todo está funcionando
```bash
# Ver estado de los contenedores
docker-compose ps

# Ver logs del backend
docker-compose logs backend

# Ver logs del frontend
docker-compose logs frontend
```

## 🌐 Acceso a Servicios

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:3000 | Aplicación React |
| Backend | http://localhost:5000 | API REST |
| MongoDB | mongodb://localhost:27017 | Base de datos |

### Credenciales MongoDB
```
Usuario: admin
Contraseña: password123
BD: mern_db
```

## 📝 Desarrollo

### Backend
```bash
# Instalar dependencias
cd backend
npm install

# Desarrollo local (con nodemon)
npm run dev

# Producción
npm start
```

### Frontend
```bash
# Instalar dependencias
cd frontend
npm install

# Desarrollo local
npm run dev

# Compilar para producción
npm run build

# Vista previa de la build
npm run preview
```

## 🐳 Comandos Docker Útiles

```bash
# Detener los servicios
docker-compose down

# Detener y limpiar volúmenes
docker-compose down -v

# Reconstruir las imágenes
docker-compose build --no-cache

# Ver logs en tiempo real
docker-compose logs -f

# Acceder a bash en un contenedor
docker-compose exec backend sh
docker-compose exec frontend sh
```

## 🔒 Variables de Entorno

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://admin:password123@mongodb:27017/mern_db?authSource=admin
```

### MongoDB
```
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123
MONGO_INITDB_DATABASE=mern_db
```

## 🏥 Health Checks

Todos los servicios tienen health checks configurados:
- **MongoDB**: Ping cada 10 segundos
- **Backend**: Endpoint `/api/health` cada 30 segundos
- **Frontend**: Check HTTP cada 30 segundos

## 📊 Características de la Stack

### Backend
- ✅ Node.js 20 (LTS)
- ✅ Express.js 4.18
- ✅ Mongoose 8.0
- ✅ CORS habilitado
- ✅ Dotenv para variables de entorno
- ✅ Nodemon para desarrollo
- ✅ Multi-stage Docker build (optimizado)
- ✅ Usuario no-root en el contenedor

### Frontend
- ✅ React 18
- ✅ Vite (build tool moderno)
- ✅ Hot Module Replacement (HMR)
- ✅ CSS moderno
- ✅ Multi-stage Docker build
- ✅ Servido con `serve` en producción

### Infraestructura
- ✅ MongoDB 7.0 Alpine
- ✅ Docker Compose 3.9
- ✅ Red dedicada (bridge network)
- ✅ Volúmenes persistentes
- ✅ Health checks
- ✅ Restart policies

## 🔄 Flujo de Desarrollo

1. **Cambios locales**: Modifica los archivos en `backend/src` o `frontend/src`
2. **Hot reload**: Los cambios se reflejan automáticamente (volumes montados)
3. **Commit**: Haz push de tus cambios
4. **Build**: Docker construirá las imágenes optimizadas

## 🐛 Troubleshooting

### Puerto ya en uso
```bash
# Cambiar puerto en docker-compose.yml
# O verificar qué está usando el puerto
netstat -ano | findstr :5000
```

### MongoDB no conecta
```bash
# Verificar que MongoDB esté corriendo
docker-compose logs mongodb

# Reiniciar el servicio
docker-compose restart mongodb
```

### Frontend no carga
```bash
# Verificar que el backend esté corriendo
curl http://localhost:5000/api/health

# Ver logs del frontend
docker-compose logs frontend
```

## 📦 Deployments

### Preparar para producción
1. Cambiar `NODE_ENV=production`
2. Usar variables de entorno seguras
3. Configurar SSL/TLS
4. Usar un reverse proxy (Nginx/Traefik)

## 📄 Licencia

MIT

## 👤 Autor

ProyectoMERN - 2026
