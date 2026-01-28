# Session Manager con localStorage

Aplicación React simple que almacena y detecta sesiones usando localStorage.

## 🚀 Inicio Rápido

```bash
npm install
npm run dev
```

Abre: http://localhost:5173

## ¿Qué hace?

- 📝 Crea sesión con nombre y email
- 💾 Almacena automáticamente en localStorage
- 🔍 Detecta sesión existente al abrir
- 🎨 Cambia layout dinámicamente
- 📅 Muestra fecha completa
- ⏱️ Actualiza tiempo en tiempo real
- 🌙 Toggle entre tema oscuro y claro

## Cómo usar

1. Ingresa tu nombre y email
2. Haz clic "Iniciar Sesión"
3. ¡Tu sesión se guardó!
4. Recarga la página (F5) - ¡Sigue aquí!
5. Haz clic "Cerrar Sesión" para limpiar

## Archivos importantes

- `src/SessionForm.tsx` - Componente principal
- `src/SessionForm.css` - Estilos
- `src/App.tsx` - Wrapper con header y footer
- `src/App.css` - Estilos generales

## localStorage

**Clave**: `userSession`

**Estructura**:
```json
{
  "name": "Tu Nombre",
  "email": "tu.email@ejemplo.com",
  "timestamp": 1706357045000
}
```

## Comandos

```bash
npm run dev      # Desarrollo
npm run build    # Build
npm run preview  # Preview
npm run lint     # Linting
```

## Características Técnicas

- React 19 + TypeScript
- Totalmente responsivo
- localStorage API
- Validación de email
- Sin dependencias externas
- Tema oscuro/claro
