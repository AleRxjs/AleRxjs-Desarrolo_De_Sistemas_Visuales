# 📋 FORMULARIO DE SESIÓN - Guía Completa

## ¿QUÉ ES?

Una aplicación de React que permite:
- ✅ Crear una sesión ingresando nombre y email
- ✅ Almacenar la sesión en localStorage automáticamente
- ✅ Mostrar la fecha exacta en que se creó la sesión
- ✅ Cambiar el layout según si hay sesión activa o no
- ✅ Cerrar sesión y volver al formulario

---

## 🎨 CARACTERÍSTICAS

### Layout 1: Formulario (Sin Sesión)
Cuando NO hay sesión guardada, ves:
- Título: "INICIAR SESIÓN"
- Campo para nombre de usuario
- Campo para email
- Botón "+ INICIAR SESIÓN"
- Nota informativa

### Layout 2: Sesión Activa (Con Sesión)
Cuando HAY sesión guardada, ves:
- Título: "SESIÓN ACTIVA"
- Indicador de estado (en línea)
- Nombre del usuario
- Email del usuario
- Fecha completa de inicio de sesión (ej: "martes, 27 de enero de 2026 22:34:45")
- **Tiempo transcurrido en tiempo real** (ej: "2h 35m 12s")
- ID de sesión
- Botón "✕ CERRAR SESIÓN"

---

## 📁 ARCHIVOS

### Componentes
- **`src/SessionForm.tsx`** (250 líneas)
  - Componente principal
  - Manejo de estados (session, formData)
  - Lógica de localStorage
  - 2 layouts diferentes (formula + sesión activa)
  - Validación de email
  - Componente TimeCounter para tiempo real

- **`src/SessionForm.css`** (420 líneas)
  - Estilos para ambos layouts
  - Diseño tema oscuro (Halo style)
  - Animaciones y transiciones
  - Responsive (mobile, tablet, desktop)
  - Efectos visuales (glow, pulse)

### Modificado
- **`src/App.tsx`**
  - Importa SessionForm en lugar de Kanban

---

## 🚀 INICIO RÁPIDO

```bash
cd Cliente/Proyectoo_Vite/Practica-05-react
npm install
npm run dev
```

Luego abre: **http://localhost:5173**

---

## 🎮 CÓMO USAR

### Crear Sesión (Primera Vez)

1. **Ingresa tu nombre**
   - Campo: "Nombre de usuario"
   - Máximo 50 caracteres
   - Ejemplo: "Juan Pérez"

2. **Ingresa tu email**
   - Campo: "Correo electrónico"
   - Debe ser formato válido (usuario@dominio.com)
   - Máximo 100 caracteres
   - Ejemplo: "juan@ejemplo.com"

3. **Haz clic en "+ INICIAR SESIÓN"**
   - Se validan los datos
   - Se guarda en localStorage
   - El layout cambia a "Sesión Activa"

### Ver Sesión Activa

Una vez creada la sesión ves:
- ✅ Tu nombre de usuario
- ✅ Tu email
- ✅ Fecha exacta en que iniciaste sesión
- ✅ Tiempo transcurrido actualizado en tiempo real
- ✅ ID de sesión

### Cerrar Sesión

1. Haz clic en el botón "✕ CERRAR SESIÓN"
2. Se elimina la sesión de localStorage
3. Vuelves al formulario

### Persistencia

- Cierra el navegador
- Recarga la página (F5)
- ¡Tu sesión sigue activa!
- Los datos están guardados en localStorage

---

## 💾 localStorage

### Clave
`userSession`

### Estructura
```json
{
  "name": "Tu Nombre",
  "email": "tu.email@ejemplo.com",
  "timestamp": 1706357000000
}
```

### Ver datos guardados (DevTools)
```javascript
console.log(JSON.parse(localStorage.getItem('userSession')))
```

### Limpiar sesión (si es necesario)
```javascript
localStorage.removeItem('userSession');
location.reload();
```

---

## 📊 COMPONENTES

### SessionForm.tsx

#### Estados
- `session: SessionData | null` - Sesión actual
- `formData: { name, email }` - Datos del formulario
- `isLoading: boolean` - Cargando datos

#### Interfaces
```typescript
interface SessionData {
  name: string;      // Nombre del usuario
  email: string;     // Email del usuario
  timestamp: number; // Fecha en milisegundos
}
```

#### Funciones Principales
- `handleInputChange()` - Actualiza formulario
- `handleSubmit()` - Crea sesión
- `handleLogout()` - Cierra sesión
- `formatDate()` - Formatea fecha en español
- `TimeCounter` - Componente para tiempo real

#### Validaciones
- ✅ Campos no vacíos
- ✅ Email válido (regex)
- ✅ Máximo de caracteres
- ✅ Mensajes de error claros

### TimeCounter.tsx (Subcomponente)

- Actualiza cada segundo
- Calcula tiempo transcurrido
- Muestra: días, horas, minutos, segundos
- Limpia intervals al desmontar

---

## 🎨 DISEÑO

### Tema
- Basado en Practica-05-React
- Tema oscuro "Halo" style
- Colores: Cián (#3ad5ff), Verde (#0f0), Rojo (#ff4444)

### Elementos Visuales

#### Formulario
- Entrada de texto con focus glow
- Botón gradiente cián
- Animación slideIn

#### Sesión Activa
- Indicador verde "En línea"
- Punto pulsante
- Información en cuadros con borde
- Botón rojo para cerrar

#### Animaciones
- slideIn (entrada de tarjetas)
- spin (loader)
- pulse (pulsaciones)
- pulse-dot (punto estado)

---

## 📱 Responsividad

| Dispositivo | Vista |
|------------|------|
| **Desktop** (1024px+) | 2 columnas en grid |
| **Tablet** (768px) | 1 columna, adaptada |
| **Mobile** (<480px) | Columna completa, optimizada |

---

## ✨ CARACTERÍSTICAS TÉCNICAS

### React Hooks
- `useState` - Gestionar estado
- `useEffect` - Cargar localStorage
- `useEffect` - Limpiar intervals

### TypeScript
- Interfaces tipadas
- Type safety completo
- Sin `any` types

### APIs
- localStorage
- JSON stringify/parse
- Date API

### Validación
- Email regex
- Campos requeridos
- Límite de caracteres

---

## 🧪 PRUEBAS

### Prueba 1: Crear Sesión
1. Abre la app
2. Ingresa nombre: "Test User"
3. Ingresa email: "test@ejemplo.com"
4. Haz clic "+ INICIAR SESIÓN"
5. ✅ Debe cambiar el layout

**Resultado Esperado:**
- El email se valida correctamente
- Aparece la sesión activa
- Muestra la fecha actual

### Prueba 2: Validar Email
1. Ingresa email inválido: "test"
2. Haz clic "+ INICIAR SESIÓN"
3. ✅ Debe mostrar error

**Resultado Esperado:**
- Alert: "Por favor ingresa un email válido"

### Prueba 3: Persistencia
1. Crea una sesión
2. Abre DevTools → Application → Storage → localStorage
3. Busca `userSession`
4. Recarga la página (F5)
5. ✅ La sesión debe seguir ahí

### Prueba 4: Tiempo Real
1. Crea sesión
2. Observa "TIEMPO TRANSCURRIDO"
3. ✅ Debe incrementarse cada segundo

### Prueba 5: Cerrar Sesión
1. Haz clic "✕ CERRAR SESIÓN"
2. ✅ Debe volver al formulario
3. Verifica localStorage (debe estar vacío)

---

## 📝 FECHA Y HORA

### Formato Mostrado
Ejemplo: "martes, 27 de enero de 2026, 22:34:45"

### Cálculo
```javascript
const date = new Date(timestamp);
date.toLocaleString("es-ES", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
```

---

## 🔄 FLUJO DE DATOS

```
1. App monta
   ↓
2. useEffect carga localStorage
   ↓
3. Si hay sesión → muestra Layout 2
   Si no hay → muestra Layout 1 (Formulario)
   ↓
4. Usuario interactúa
   ↓
5. State se actualiza
   ↓
6. Component re-renderiza
   ↓
7. Si crea sesión → localStorage guarda
   ↓
8. Layout cambia automáticamente
```

---

## ✅ REQUISITOS CUMPLIDOS

- ✅ Componente de React funcional
- ✅ Almacena sesión en localStorage
- ✅ Detecta sesión existente
- ✅ Cambia layout según sesión
- ✅ Muestra fecha de inicio
- ✅ Muestra hora actual actualizada
- ✅ Validación de datos
- ✅ Diseño responsivo
- ✅ Tema Practica-05-React
- ✅ Documentación completa

---

## 🛠️ TECNOLOGÍAS

- React 19
- TypeScript
- Vite
- CSS3
- localStorage API

---

## 📊 ESTADÍSTICAS

| Métrica | Valor |
|---------|-------|
| Líneas TypeScript | 250 |
| Líneas CSS | 420 |
| Componentes | 2 (SessionForm + TimeCounter) |
| Hooks | 3 (useState x2, useEffect x2) |
| Dependencias nuevas | 0 |

---

## 🎯 CASOS DE USO

### Usuario 1: Primera Vez
1. Abre la app
2. Ve formulario vacío
3. Ingresa datos
4. Crea sesión
5. Ve información de sesión

### Usuario 2: Regresa
1. Abre la app
2. localStorage tiene sesión
3. Ve información de sesión inmediatamente
4. Ve tiempo actualizado en tiempo real

### Usuario 3: Múltiples Sesiones
1. Cierra sesión
2. Crea nueva sesión con otros datos
3. localStorage se actualiza
4. Nueva sesión se muestra

---

## 📞 REFERENCIA

| Necesito | Ubicación |
|----------|-----------|
| Crear sesión | Formulario |
| Ver sesión | Layout 2 |
| Cerrar sesión | Botón rojo |
| Editar datos | Crear nueva sesión |
| Ver localStorage | DevTools |

---

¡Tu formulario de sesión está listo para usar! 🎉
