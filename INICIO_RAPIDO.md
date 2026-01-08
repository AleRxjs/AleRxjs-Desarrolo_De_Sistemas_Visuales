## ⚡ INICIO RÁPIDO

### Requisitos
- Docker Desktop instalado y corriendo
- Puertos disponibles: 3000, 5000, 27017

### 3 pasos para comenzar:

#### 1️⃣ Levantar los servicios
```bash
docker-compose up -d
```

#### 2️⃣ Verificar que todo está corriendo
```bash
docker-compose ps
```

Deberías ver:
```
CONTAINER ID   IMAGE                    STATUS          PORTS
xxxxx          mern_frontend:latest     Up (healthy)    0.0.0.0:3000->3000/tcp
xxxxx          mern_backend:latest      Up (healthy)    0.0.0.0:5000->5000/tcp
xxxxx          mongo:7.0-alpine         Up (healthy)    0.0.0.0:27017->27017/tcp
```

#### 3️⃣ Acceder a la aplicación
- 🎨 Frontend: [http://localhost:3000](http://localhost:3000)
- 🔌 Backend API: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🎯 Primeros pasos en desarrollo

### Modificar el Backend
1. Edita archivos en `backend/src/`
2. Los cambios se reflejan automáticamente (hot reload)
3. Ver logs: `docker-compose logs -f backend`

### Modificar el Frontend
1. Edita archivos en `frontend/src/`
2. Vite recargará automáticamente
3. Ver logs: `docker-compose logs -f frontend`

### Conectar a MongoDB
```bash
# Desde tu máquina local
mongosh mongodb://admin:password123@localhost:27017/mern_db

# Dentro del contenedor backend
docker-compose exec backend mongosh mongodb://admin:password123@mongodb:27017/mern_db
```

---

## 🛑 Detener todo

```bash
# Parar sin eliminar datos
docker-compose down

# Parar y eliminar todo (incluyendo BD)
docker-compose down -v
```

---

## 🔍 Debugging

### Backend no responde
```bash
docker-compose logs backend
docker-compose restart backend
```

### Frontend muestra error
```bash
docker-compose logs frontend
# Verificar que el backend está corriendo
curl http://localhost:5000/api/health
```

### MongoDB no conecta
```bash
docker-compose logs mongodb
docker-compose restart mongodb
```

---

## 📦 Producción

Para usar en producción:

1. Cambiar credenciales de MongoDB
2. Usar variables de entorno seguras
3. Configurar SSL/TLS
4. Usar reverse proxy (Nginx)
5. Actualizar `NODE_ENV=production`

---

## 🐳 Usar el gestor de scripts

### En Windows
```bash
manage.bat
```

### En Linux/Mac
```bash
chmod +x manage.sh
./manage.sh
```

---

## 📚 Documentación completa
Ver [README.md](README.md) para documentación detallada.
