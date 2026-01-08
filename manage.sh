#!/bin/bash

# Script de ayuda para ProyectoMERN

print_menu() {
    echo "╔════════════════════════════════════════╗"
    echo "║     MERN STACK - GESTOR RÁPIDO        ║"
    echo "╚════════════════════════════════════════╝"
    echo ""
    echo "📦 COMANDOS DE DOCKER:"
    echo "  1. Iniciar servicios"
    echo "  2. Detener servicios"
    echo "  3. Reiniciar servicios"
    echo "  4. Ver logs del backend"
    echo "  5. Ver logs del frontend"
    echo "  6. Ver estado de contenedores"
    echo ""
    echo "🔧 COMANDOS DE DESARROLLO:"
    echo "  7. Instalar dependencias del backend"
    echo "  8. Instalar dependencias del frontend"
    echo "  9. Acceder a shell del backend"
    echo "  10. Acceder a shell del frontend"
    echo ""
    echo "🧹 LIMPIEZA:"
    echo "  11. Limpiar (sin eliminar volúmenes)"
    echo "  12. Limpiar todo (incluyendo volúmenes)"
    echo ""
    echo "0. Salir"
    echo ""
}

run_command() {
    case $1 in
        1)
            echo "📌 Iniciando servicios..."
            docker-compose up -d
            echo "✓ Servicios iniciados"
            echo "🌐 Frontend: http://localhost:3000"
            echo "🔌 Backend: http://localhost:5000"
            ;;
        2)
            echo "⏹ Deteniendo servicios..."
            docker-compose down
            echo "✓ Servicios detenidos"
            ;;
        3)
            echo "🔄 Reiniciando servicios..."
            docker-compose restart
            echo "✓ Servicios reiniciados"
            ;;
        4)
            docker-compose logs -f backend
            ;;
        5)
            docker-compose logs -f frontend
            ;;
        6)
            docker-compose ps
            ;;
        7)
            echo "📦 Instalando dependencias del backend..."
            cd backend && npm install && cd ..
            echo "✓ Dependencias instaladas"
            ;;
        8)
            echo "📦 Instalando dependencias del frontend..."
            cd frontend && npm install && cd ..
            echo "✓ Dependencias instaladas"
            ;;
        9)
            docker-compose exec backend sh
            ;;
        10)
            docker-compose exec frontend sh
            ;;
        11)
            echo "🧹 Limpiando (sin volúmenes)..."
            docker-compose down
            echo "✓ Limpieza completada"
            ;;
        12)
            echo "🧹 Limpiando todo (incluyendo volúmenes)..."
            docker-compose down -v
            echo "✓ Limpieza total completada"
            ;;
        0)
            echo "👋 Hasta pronto!"
            exit 0
            ;;
        *)
            echo "❌ Opción inválida"
            ;;
    esac
}

# Loop principal
while true; do
    print_menu
    read -p "Selecciona una opción: " option
    clear
    run_command $option
    echo ""
    read -p "Presiona Enter para continuar..."
    clear
done
