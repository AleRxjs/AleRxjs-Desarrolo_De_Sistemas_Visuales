# 📋 DOCUMENTACIÓN DEL DOCKER-COMPOSE.YML

## Versión y Estructura
```yaml
version: '3.9'  # Versión más reciente compatible con Docker Compose 2.x
```

---

## 🗄️ SERVICIO: MONGODB

```yaml
mongodb:
  image: mongo:7.0-alpine
  container_name: mern_mongodb
  restart: unless-stopped
```

### Características:
- **Imagen Alpine**: Lightweight (~170MB vs 700MB de la versión completa)
- **Auto-restart**: Se reinicia automáticamente si falla
- **Puerto**: 27017 (accesible desde la máquina host)

### Autenticación:
```
Usuario: admin
Contraseña: password123
Base de datos: mern_db
```

### Volúmenes Persistentes:
- `mongodb_data`: Guarda los datos de la BD
- `mongodb_config`: Guarda configuración de MongoDB
- **Ventaja**: Los datos persisten incluso si eliminas el contenedor

### Health Check:
```yaml
healthcheck:
  test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
  interval: 10s      # Verifica cada 10 segundos
  timeout: 5s        # Espera máximo 5 segundos por respuesta
  retries: 5         # Falla después de 5 intentos fallidos
  start_period: 10s  # No verifica durante los primeros 10s
```

---

## 🔌 SERVICIO: BACKEND (Node.js/Express)

```yaml
backend:
  build:
    context: ./backend
    dockerfile: Dockerfile
  container_name: mern_backend
  restart: unless-stopped
```

### Build Automático:
- Compila la imagen desde el Dockerfile del backend
- Multi-stage build (optimizado para producción)

### Variables de Entorno:
```yaml
environment:
  - NODE_ENV=development    # Modo desarrollo
  - PORT=5000               # Puerto de la aplicación
  - MONGODB_URI=...        # URL de conexión a MongoDB
```

### Dependencias:
```yaml
depends_on:
  mongodb:
    condition: service_healthy  # Espera a que MongoDB esté healthy
```

### Volúmenes:
```yaml
volumes:
  - ./backend/src:/app/src    # Hot reload: cambios locales se reflejan
  - /app/node_modules          # Anónimo: evita sincronizar node_modules
```

### Health Check:
```yaml
healthcheck:
  test: ["CMD", "node", "-e", "require('http').get('http://localhost:5000/api/health', (r) => {...})"]
  interval: 30s   # Verifica cada 30 segundos
  timeout: 3s     # Espera máximo 3 segundos
  retries: 3      # Falla después de 3 intentos fallidos
  start_period: 5s  # Comienza a verificar después de 5s
```

---

## 🎨 SERVICIO: FRONTEND (React/Vite)

```yaml
frontend:
  build:
    context: ./frontend
    dockerfile: Dockerfile
    target: builder  # Usa solo la etapa 'builder' del Dockerfile (Dev mode)
  container_name: mern_frontend
  command: npm run dev  # Ejecuta Vite en modo desarrollo
```

### Características Especiales:
- **Target builder**: Evita compilar la app en la etapa de desarrollo
- **Hot Module Replacement (HMR)**: Recarga en tiempo real
- **Vite Dev Server**: Mucho más rápido que Create React App

### Volúmenes:
```yaml
volumes:
  - ./frontend/src:/app/src        # Hot reload de componentes
  - ./frontend/public:/app/public  # Assets estáticos
  - /app/node_modules              # Aislado del sistema local
```

### Conexión con Backend:
```yaml
environment:
  - VITE_API_URL=http://localhost:5000
```
Accesible en el código como: `import.meta.env.VITE_API_URL`

---

## 🌐 RED DEDICADA

```yaml
networks:
  mern_network:
    driver: bridge  # Los contenedores pueden comunicarse por nombre
```

### Ventajas:
- ✅ Contenedores pueden comunicarse entre sí
- ✅ Aislamiento de otras redes
- ✅ DNS interno automático
- ✅ Seguridad mejorada

### Comunicación interna:
```
Backend → MongoDB: mongodb://admin:password123@mongodb:27017/...
Frontend → Backend: http://backend:5000/api/... (internamente)
```

---

## 💾 VOLÚMENES PERSISTENTES

```yaml
volumes:
  mongodb_data:
    driver: local  # Almacenamiento local de la máquina host
  mongodb_config:
    driver: local
```

### Ubicación en host:
- Linux/Mac: `~/.docker/volumes/`
- Windows: `C:\ProgramData\Docker\volumes\`

### Comandos útiles:
```bash
# Ver volúmenes
docker volume ls

# Inspeccionar volumen
docker volume inspect mongodb_data

# Eliminar volumen
docker volume rm mongodb_data
```

---

## 🔄 ORDEN DE INICIALIZACIÓN

1. **MongoDB inicia primero** (sin dependencias)
2. **Backend espera** a que MongoDB esté healthy
3. **Frontend espera** a que Backend esté listo
4. **Servicios accesibles** con health checks pasados

```
Tiempo:    0s          10s          15s          20s
┌──────────────────────────────────────────────────┐
│ MongoDB  ████████░░░░░░░░░░░░░░  ✓ Ready
│ Backend  ░░░░░░░░░░████████░░░░░  ✓ Ready
│ Frontend ░░░░░░░░░░░░░░░░░░████░  ✓ Ready
└──────────────────────────────────────────────────┘
```

---

## 🔐 CONSIDERACIONES DE SEGURIDAD

⚠️ **DESARROLLO**: Las contraseñas está hardcodeadas (OK para desarrollo)

🔒 **PRODUCCIÓN**: Implementar:
```yaml
environment:
  MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
  MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
```

Con archivo `.env`:
```
MONGO_USER=usuario_seguro
MONGO_PASSWORD=contraseña_muy_fuerte_2024
```

---

## 📊 DEBUGGING COMÚN

### Ver estado de servicios
```bash
docker-compose ps
docker-compose logs
docker-compose logs -f backend
```

### Verificar conectividad
```bash
# Desde backend al MongoDB
docker-compose exec backend mongosh mongodb://admin:password123@mongodb:27017/mern_db

# Desde frontend al backend
docker-compose exec frontend curl http://backend:5000/api/health
```

### Recrear contenedores
```bash
docker-compose up -d --force-recreate --no-deps backend
```

---

## 🚀 OPTIMIZACIONES APLICADAS

### 1. Multi-stage Docker builds
```dockerfile
FROM node:20-alpine AS builder
# ... compilar código
FROM node:20-alpine
# ... copiar solo artefactos necesarios
```
**Resultado**: Imágenes más pequeñas (50-70% reducción)

### 2. Alpine Linux
**Beneficio**: Base `20MB` vs `150MB` con Debian

### 3. Health Checks
**Beneficio**: Docker espera a que servicios estén realmente listos

### 4. Volúmenes anónimos para node_modules
```yaml
volumes:
  - /app/node_modules  # No sincroniza con host
```
**Beneficio**: Evita conflictos entre plataformas (Windows/Linux)

### 5. Restart policy
```yaml
restart: unless-stopped  # Reinicia si falla
```
**Beneficio**: Alta disponibilidad en desarrollo

---

## 📈 ESCALABILIDAD FUTURA

Para agregar más servicios:

```yaml
services:
  nginx:                    # Reverse proxy
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - frontend
      - backend
```

```yaml
  redis:                    # Cache
    image: redis:7-alpine
    networks:
      - mern_network
```

---

## 🎯 RESUMEN DE ESTÁNDARES APLICADOS

✅ Versión compatible con Docker Compose moderno (v2)
✅ Health checks en todos los servicios
✅ Red dedicada para comunicación segura
✅ Volúmenes persistentes
✅ Variables de entorno configurables
✅ Multi-stage builds optimizados
✅ Usuarios no-root en contenedores
✅ Restart policies para Alta disponibilidad
✅ Hot reload en desarrollo
✅ Dependencias declaradas correctamente
✅ Imágenes Alpine para optimizar tamaño
✅ Logging y debugging facilidades

---

## 📚 Referencias

- [Docker Compose Specification](https://compose-spec.io/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [MongoDB Docker](https://hub.docker.com/_/mongo)
- [Node.js Docker](https://hub.docker.com/_/node)
