@echo off
REM Script de ayuda para ProyectoMERN en Windows

setlocal enabledelayedexpansion

:menu
cls
echo.
echo ╔════════════════════════════════════════╗
echo ║     MERN STACK - GESTOR RÁPIDO        ║
echo ╚════════════════════════════════════════╝
echo.
echo 📦 COMANDOS DE DOCKER:
echo   1. Iniciar servicios
echo   2. Detener servicios
echo   3. Reiniciar servicios
echo   4. Ver logs del backend
echo   5. Ver logs del frontend
echo   6. Ver estado de contenedores
echo.
echo 🔧 COMANDOS DE DESARROLLO:
echo   7. Instalar dependencias del backend
echo   8. Instalar dependencias del frontend
echo.
echo 🧹 LIMPIEZA:
echo   9. Limpiar (sin eliminar volúmenes)
echo   10. Limpiar todo (incluyendo volúmenes)
echo.
echo 0. Salir
echo.

set /p option="Selecciona una opción: "

if "%option%"=="1" (
    echo.
    echo 📌 Iniciando servicios...
    docker-compose up -d
    echo ✓ Servicios iniciados
    echo 🌐 Frontend: http://localhost:3000
    echo 🔌 Backend: http://localhost:5000
    pause
    goto menu
)

if "%option%"=="2" (
    echo.
    echo ⏹ Deteniendo servicios...
    docker-compose down
    echo ✓ Servicios detenidos
    pause
    goto menu
)

if "%option%"=="3" (
    echo.
    echo 🔄 Reiniciando servicios...
    docker-compose restart
    echo ✓ Servicios reiniciados
    pause
    goto menu
)

if "%option%"=="4" (
    docker-compose logs -f backend
    goto menu
)

if "%option%"=="5" (
    docker-compose logs -f frontend
    goto menu
)

if "%option%"=="6" (
    docker-compose ps
    pause
    goto menu
)

if "%option%"=="7" (
    echo.
    echo 📦 Instalando dependencias del backend...
    cd backend && npm install && cd ..
    echo ✓ Dependencias instaladas
    pause
    goto menu
)

if "%option%"=="8" (
    echo.
    echo 📦 Instalando dependencias del frontend...
    cd frontend && npm install && cd ..
    echo ✓ Dependencias instaladas
    pause
    goto menu
)

if "%option%"=="9" (
    echo.
    echo 🧹 Limpiando (sin volúmenes)...
    docker-compose down
    echo ✓ Limpieza completada
    pause
    goto menu
)

if "%option%"=="10" (
    echo.
    echo 🧹 Limpiando todo (incluyendo volúmenes)...
    docker-compose down -v
    echo ✓ Limpieza total completada
    pause
    goto menu
)

if "%option%"=="0" (
    echo 👋 Hasta pronto!
    exit /b 0
)

echo ❌ Opción inválida
pause
goto menu
