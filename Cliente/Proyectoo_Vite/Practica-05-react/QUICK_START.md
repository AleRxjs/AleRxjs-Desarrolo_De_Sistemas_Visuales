# 🎯 INICIO RÁPIDO

## 1️⃣ Ejecutar

```bash
npm install
npm run dev
```

## 2️⃣ Usar

- Ingresa nombre y email
- Haz clic "Iniciar Sesión"
- Tu sesión se guardó en localStorage
- Recarga (F5) - ¡Sigue aquí!
- Haz clic "Cerrar Sesión" para limpiar

## 3️⃣ Features

✅ localStorage automático
✅ Detecta sesión existente
✅ Cambia layout dinámicamente
✅ Muestra fecha completa
✅ Tiempo actualizado cada segundo
✅ Validación de email
✅ Tema oscuro/claro
✅ 100% responsivo

## 📁 Archivos

```
src/
├── SessionForm.tsx   (Component)
├── SessionForm.css   (Estilos sesión)
├── App.tsx          (Wrapper)
└── App.css          (Estilos app)
```

## 💡 localStorage

Abre DevTools (F12) → Application → Storage → localStorage → http://localhost:5173

Verás: `userSession` con { name, email, timestamp }

## 🚀 Build

```bash
npm run build
```

¡Listo! 🎉
