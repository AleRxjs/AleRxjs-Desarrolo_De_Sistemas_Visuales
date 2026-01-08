.PHONY: help up down logs build clean restart shell-backend shell-frontend install-backend install-frontend

# Colores para output
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

help: ## Muestra la ayuda de comandos disponibles
	@echo "$(CYAN)╔════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║     MERN STACK - MAKEFILE             ║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════╝$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-20s$(NC) %s\n", $$1, $$2}'
	@echo ""

up: ## 🚀 Inicia todos los servicios
	@echo "$(CYAN)📌 Iniciando servicios...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✓ Servicios iniciados$(NC)"
	@echo "$(CYAN)🌐 Frontend: http://localhost:3000$(NC)"
	@echo "$(CYAN)🔌 Backend: http://localhost:5000$(NC)"
	@echo "$(CYAN)🗄️  MongoDB: mongodb://localhost:27017$(NC)"

down: ## ⏹️ Detiene todos los servicios
	@echo "$(CYAN)⏹ Deteniendo servicios...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Servicios detenidos$(NC)"

down-all: ## 🧹 Detiene servicios y elimina volúmenes
	@echo "$(RED)⚠️  Eliminando servicios y volúmenes...$(NC)"
	docker-compose down -v
	@echo "$(GREEN)✓ Limpieza completa$(NC)"

restart: ## 🔄 Reinicia todos los servicios
	@echo "$(CYAN)🔄 Reiniciando servicios...$(NC)"
	docker-compose restart
	@echo "$(GREEN)✓ Servicios reiniciados$(NC)"

logs: ## 📋 Muestra logs de todos los servicios
	docker-compose logs -f

logs-backend: ## 📊 Muestra logs del backend
	docker-compose logs -f backend

logs-frontend: ## 📊 Muestra logs del frontend
	docker-compose logs -f frontend

logs-mongodb: ## 📊 Muestra logs de MongoDB
	docker-compose logs -f mongodb

build: ## 🔨 Construye las imágenes
	@echo "$(CYAN)🔨 Construyendo imágenes...$(NC)"
	docker-compose build --no-cache
	@echo "$(GREEN)✓ Imágenes construidas$(NC)"

ps: ## 📦 Muestra estado de los contenedores
	docker-compose ps

status: ## 📊 Alias para ps
	@$(MAKE) ps

clean: ## 🧹 Limpia (sin eliminar volúmenes)
	@echo "$(CYAN)🧹 Limpiando...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Limpieza completada$(NC)"

install-backend: ## 📦 Instala dependencias del backend
	@echo "$(CYAN)📦 Instalando dependencias del backend...$(NC)"
	cd backend && npm install && cd ..
	@echo "$(GREEN)✓ Dependencias instaladas$(NC)"

install-frontend: ## 📦 Instala dependencias del frontend
	@echo "$(CYAN)📦 Instalando dependencias del frontend...$(NC)"
	cd frontend && npm install && cd ..
	@echo "$(GREEN)✓ Dependencias instaladas$(NC)"

install: install-backend install-frontend ## 📦 Instala todas las dependencias

shell-backend: ## 🐚 Abre shell del backend
	docker-compose exec backend sh

shell-frontend: ## 🐚 Abre shell del frontend
	docker-compose exec frontend sh

shell-mongodb: ## 🐚 Abre shell de MongoDB
	docker-compose exec mongodb mongosh mongodb://admin:password123@mongodb:27017/mern_db

test-backend: ## ✅ Prueba la API del backend
	@echo "$(CYAN)Probando API del backend...$(NC)"
	@curl -s http://localhost:5000/api/health | jq . || echo "Backend no responde"

test-frontend: ## ✅ Prueba el frontend
	@echo "$(CYAN)Probando frontend...$(NC)"
	@curl -s http://localhost:3000 | grep -q "root" && echo "$(GREEN)✓ Frontend responde$(NC)" || echo "$(RED)✗ Frontend no responde$(NC)"

prune: ## 🧹 Limpia imágenes y contenedores no usados
	@echo "$(YELLOW)⚠️  Podando recursos no utilizados...$(NC)"
	docker system prune -f
	@echo "$(GREEN)✓ Limpieza completada$(NC)"

version: ## ℹ️ Muestra versiones de herramientas
	@echo "$(CYAN)Versiones:$(NC)"
	@echo "Docker Compose: $$(docker-compose version | grep version | head -1)"
	@echo "Docker: $$(docker --version)"
	@echo "Node: $$(node --version || echo 'No instalado')"

info: ## ℹ️ Muestra información del proyecto
	@echo "$(CYAN)═════════════════════════════════════════$(NC)"
	@echo "$(CYAN)   MERN STACK - PROJECT INFO$(NC)"
	@echo "$(CYAN)═════════════════════════════════════════$(NC)"
	@echo ""
	@echo "$(GREEN)Frontend:$(NC) React 18 + Vite @ http://localhost:3000"
	@echo "$(GREEN)Backend:$(NC) Node.js + Express @ http://localhost:5000"
	@echo "$(GREEN)Database:$(NC) MongoDB 7.0 @ localhost:27017"
	@echo ""
	@echo "$(CYAN)Credenciales MongoDB:$(NC)"
	@echo "  Usuario: admin"
	@echo "  Contraseña: password123"
	@echo ""
	@echo "$(CYAN)Archivos importantes:$(NC)"
	@echo "  - docker-compose.yml (Orquestación)"
	@echo "  - backend/Dockerfile (Backend build)"
	@echo "  - frontend/Dockerfile (Frontend build)"
	@echo ""

# Default target
.DEFAULT_GOAL := help
