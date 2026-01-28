# 🎉 ¡EMPEZA AQUÍ! - FORMULARIO DE SESIÓN

> Formulario interactivo con localStorage que detecta sesiones y cambia el layout

---

## ⚡ INICIO RÁPIDO (30 segundos)

```bash
# En este directorio ejecuta:
npm install
npm run dev
```

Luego abre: **http://localhost:5173**

---

## 🎯 ¿QUÉ TIENE?

Un formulario que:

✅ Crea una sesión con tu nombre y email  
✅ Almacena automáticamente en localStorage  
✅ Muestra la fecha exacta en que iniciaste sesión  
✅ Cambia el layout según si hay sesión activa  
✅ Muestra el tiempo transcurrido en tiempo real  
✅ Permite cerrar sesión  

---

## 📖 DOCUMENTOS (Lee en este orden)

### 1️⃣ RÁPIDO (3 min)
👉 [SESSION_FORM_RESUMEN.md](SESSION_FORM_RESUMEN.md)

### 2️⃣ DETALLADO (10 min)
👉 [SESSION_FORM_GUIDE.md](SESSION_FORM_GUIDE.md)

---

## 🎮 PRIMEROS PASOS

### Escenario 1: Primera Vez
1. Abre la app
2. Ves un formulario
3. Ingresa tu nombre (ej: "Juan")
4. Ingresa tu email (ej: "juan@ejemplo.com")
5. Haz clic "+ INICIAR SESIÓN"
6. ¡El layout cambia a "SESIÓN ACTIVA"!

### Escenario 2: Ves tu Sesión
Ahora ves:
- Tu nombre
- Tu email
- La fecha: "martes, 27 de enero de 2026, 22:34:45"
- **Tiempo actualizado en tiempo real**: "2h 35m 12s"
- Botón para cerrar sesión

### Escenario 3: Recarga
1. Presiona F5 (recargar)
2. ¡Tu sesión sigue aquí!
3. localStorage la guardó automáticamente

### Escenario 4: Cerrar Sesión
1. Haz clic "✕ CERRAR SESIÓN"
2. Vuelves al formulario
3. localStorage se limpia

---

## 🎨 DOS LAYOUTS

### Layout 1: Formulario (Sin Sesión)
```
INICIAR SESIÓN
├─ Ingresa nombre
├─ Ingresa email
└─ Botón: → INICIAR SESIÓN
```

### Layout 2: Sesión Activa (Con Sesión)
```
SESIÓN ACTIVA  [🟢 En línea]
├─ USUARIO: Tu nombre
├─ EMAIL: tu.email@ejemplo.com
├─ FECHA: martes, 27 de enero...
├─ TIEMPO TRANSCURRIDO: 2h 35m 12s ← ¡Actualizado cada segundo!
└─ Botón: ✕ CERRAR SESIÓN
```

---

## 💾 DATOS

Tus datos se guardan en localStorage:
- **Clave**: `userSession`
- **Contenido**: { name, email, timestamp }
- **Persistencia**: Entre sesiones del navegador

Ver datos:
```javascript
localStorage.getItem('userSession')
```

---

## 📁 ARCHIVOS PRINCIPALES

```
src/
├── SessionForm.tsx    [✨ NUEVO] - Componente (250 líneas)
├── SessionForm.css    [✨ NUEVO] - Estilos (420 líneas)
└── App.tsx           [✏️ MODIFICADO]
```

---

## 🚀 COMANDOS

```bash
npm run dev      # Desarrollo (por defecto)
npm run build    # Build producción
npm run preview  # Ver build
npm run lint     # Linting
```

---

## ✅ REQUISITOS

✅ Componente React funcional  
✅ Almacena en localStorage  
✅ Detecta sesión existente  
✅ Cambia layout según sesión  
✅ Muestra fecha completa  
✅ Tiempo real actualizado  

---

## 🎨 DISEÑO

- Tema oscuro (Halo style)
- Colores cián (#3ad5ff)
- Efectos glow
- 100% responsivo
- Mismo estilo que Practica-05-React

---

## 📱 FUNCIONA EN

- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

---

## 🔄 FLUJO

```
1. Abre app
   ↓
2. ¿Hay sesión en localStorage?
   ├─ SÍ  → Muestra "Sesión Activa"
   └─ NO  → Muestra Formulario
   ↓
3. Usuario interactúa
   ├─ Crea sesión → localStorage guarda → Layout cambia
   ├─ Cierra sesión → localStorage limpia → Vuelve a formulario
   └─ Recarga → localStorage carga → Sesión se muestra
```

---

## 📞 REFERENCIA RÁPIDA

| Necesito | Ir a |
|----------|------|
| Empezar | Este archivo |
| Resumen | SESSION_FORM_RESUMEN.md |
| Guía detallada | SESSION_FORM_GUIDE.md |
| Ver código | src/SessionForm.tsx |
| Ver estilos | src/SessionForm.css |

---

## ⏱️ TIEMPO TRANSCURRIDO

El componente `TimeCounter` actualiza cada segundo:

```
Inicio: 10:00:00
10:00:05 → "5s"
10:01:00 → "1m 0s"
10:05:00 → "5m 0s"
11:00:00 → "1h 0m 0s"
Mañana: "1d 0h 0m"
```

---

## 🎓 TECNOLOGÍAS

- React 19
- TypeScript
- Vite
- CSS3
- localStorage API

---

## 🧪 PRUEBA RÁPIDA (2 min)

1. Ejecuta `npm run dev`
2. Ingresa: nombre "Test", email "test@ejemplo.com"
3. Haz clic "+ INICIAR SESIÓN"
4. Observa la fecha y tiempo
5. Recarga (F5)
6. ¡Sesión sigue aquí!
7. Haz clic "✕ CERRAR SESIÓN"
8. Vuelves al formulario

---

## 🎉 LISTO

Tu formulario de sesión está funcionando.

```bash
npm run dev
```

**Acceso**: http://localhost:5173

---

**Estado**: ✅ COMPLETADO  
**Fecha**: Enero 27, 2026  
**Versión**: 1.0
