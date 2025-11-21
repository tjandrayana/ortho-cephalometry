.PHONY: help install dev dev-bg stop build preview preview-bg stop-preview lint clean status logs status-preview logs-preview

# Variables
DEV_PID_FILE := .vite.dev.pid
DEV_LOG_FILE := .vite.dev.log
PREVIEW_PID_FILE := .vite.preview.pid
PREVIEW_LOG_FILE := .vite.preview.log
DEV_PORT := 3000
PREVIEW_PORT := 4173
NPM := npm

# Default target
help:
	@echo "Available targets:"
	@echo "  make install         - Install dependencies"
	@echo "  make dev             - Run development server (foreground)"
	@echo "  make dev-bg          - Run development server (background)"
	@echo "  make stop            - Stop background development server"
	@echo "  make build           - Build for production"
	@echo "  make preview         - Preview production build (foreground)"
	@echo "  make preview-bg      - Preview production build (background)"
	@echo "  make stop-preview    - Stop background preview server"
	@echo "  make lint            - Run ESLint"
	@echo "  make clean           - Clean build artifacts and log files"
	@echo "  make status          - Check if dev server is running"
	@echo "  make status-preview  - Check if preview server is running"
	@echo "  make logs            - Show dev server logs"
	@echo "  make logs-preview    - Show preview server logs"

# Install dependencies
install:
	@echo "Installing dependencies..."
	$(NPM) install

# Run development server in foreground
dev:
	@echo "Starting development server..."
	$(NPM) run dev

# Run development server in background
dev-bg:
	@if [ -f $(DEV_PID_FILE) ]; then \
		if ps -p $$(cat $(DEV_PID_FILE)) > /dev/null 2>&1; then \
			echo "Development server is already running (PID: $$(cat $(DEV_PID_FILE)))"; \
			echo "Use 'make stop' to stop it first, or 'make status' to check status"; \
			exit 1; \
		else \
			rm -f $(DEV_PID_FILE); \
		fi; \
	fi
	@echo "Starting development server in background..."
	@$(NPM) run dev > $(DEV_LOG_FILE) 2>&1 & echo $$! > $(DEV_PID_FILE)
	@sleep 2
	@if [ -f $(DEV_PID_FILE) ] && ps -p $$(cat $(DEV_PID_FILE)) > /dev/null 2>&1; then \
		echo "Development server started in background (PID: $$(cat $(DEV_PID_FILE)))"; \
		echo "Server will be available at http://localhost:$(DEV_PORT)"; \
		echo "Use 'make logs' to view logs, 'make status' to check status, or 'make stop' to stop"; \
	else \
		echo "Failed to start development server. Check $(DEV_LOG_FILE) for errors."; \
		rm -f $(DEV_PID_FILE); \
		exit 1; \
	fi

# Stop background development server
stop:
	@if [ ! -f $(DEV_PID_FILE) ]; then \
		echo "No PID file found. Development server may not be running in background."; \
		exit 1; \
	fi
	@PID=$$(cat $(DEV_PID_FILE)); \
	if ps -p $$PID > /dev/null 2>&1; then \
		echo "Stopping development server (PID: $$PID)..."; \
		kill $$PID 2>/dev/null || true; \
		sleep 1; \
		if ps -p $$PID > /dev/null 2>&1; then \
			echo "Force killing process..."; \
			kill -9 $$PID 2>/dev/null || true; \
		fi; \
		rm -f $(DEV_PID_FILE); \
		echo "Development server stopped."; \
	else \
		echo "Process not found. Cleaning up PID file..."; \
		rm -f $(DEV_PID_FILE); \
	fi

# Build for production
build:
	@echo "Building for production..."
	$(NPM) run build
	@echo "Build complete! Output in 'dist' directory."

# Preview production build
preview:
	@if [ ! -d dist ]; then \
		echo "Error: dist directory not found. Please run 'make build' first."; \
		exit 1; \
	fi
	@echo "Starting preview server..."
	$(NPM) run preview

# Preview production build in background
preview-bg:
	@if [ ! -d dist ]; then \
		echo "Error: dist directory not found. Please run 'make build' first."; \
		exit 1; \
	fi
	@if [ -f $(PREVIEW_PID_FILE) ]; then \
		if ps -p $$(cat $(PREVIEW_PID_FILE)) > /dev/null 2>&1; then \
			echo "Preview server is already running (PID: $$(cat $(PREVIEW_PID_FILE)))"; \
			echo "Use 'make stop-preview' to stop it first, or 'make status-preview' to check status"; \
			exit 1; \
		else \
			rm -f $(PREVIEW_PID_FILE); \
		fi; \
	fi
	@echo "Starting preview server in background..."
	@$(NPM) run preview > $(PREVIEW_LOG_FILE) 2>&1 & echo $$! > $(PREVIEW_PID_FILE)
	@sleep 2
	@if [ -f $(PREVIEW_PID_FILE) ] && ps -p $$(cat $(PREVIEW_PID_FILE)) > /dev/null 2>&1; then \
		echo "Preview server started in background (PID: $$(cat $(PREVIEW_PID_FILE)))"; \
		echo "Server will be available at http://localhost:$(PREVIEW_PORT)"; \
		echo "Use 'make logs-preview' to view logs, 'make status-preview' to check status, or 'make stop-preview' to stop"; \
	else \
		echo "Failed to start preview server. Check $(PREVIEW_LOG_FILE) for errors."; \
		rm -f $(PREVIEW_PID_FILE); \
		exit 1; \
	fi

# Stop background preview server
stop-preview:
	@if [ ! -f $(PREVIEW_PID_FILE) ]; then \
		echo "No PID file found. Preview server may not be running in background."; \
		exit 1; \
	fi
	@PID=$$(cat $(PREVIEW_PID_FILE)); \
	if ps -p $$PID > /dev/null 2>&1; then \
		echo "Stopping preview server (PID: $$PID)..."; \
		kill $$PID 2>/dev/null || true; \
		sleep 1; \
		if ps -p $$PID > /dev/null 2>&1; then \
			echo "Force killing process..."; \
			kill -9 $$PID 2>/dev/null || true; \
		fi; \
		rm -f $(PREVIEW_PID_FILE); \
		echo "Preview server stopped."; \
	else \
		echo "Process not found. Cleaning up PID file..."; \
		rm -f $(PREVIEW_PID_FILE); \
	fi

# Run linting
lint:
	@echo "Running ESLint..."
	$(NPM) run lint

# Clean build artifacts and optionally node_modules
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist
	rm -f $(DEV_PID_FILE) $(DEV_LOG_FILE) $(PREVIEW_PID_FILE) $(PREVIEW_LOG_FILE)
	@echo "Cleaned build artifacts and log files."
	@echo "To also remove node_modules, use: make clean-all"

# Clean everything including node_modules
clean-all: clean
	@echo "Removing node_modules..."
	rm -rf node_modules
	@echo "All cleaned up."

# Check status of background dev server
status:
	@if [ ! -f $(DEV_PID_FILE) ]; then \
		echo "Development server is not running in background."; \
		exit 0; \
	fi
	@PID=$$(cat $(DEV_PID_FILE)); \
	if ps -p $$PID > /dev/null 2>&1; then \
		echo "Development server is running (PID: $$PID)"; \
		echo "Port: $(DEV_PORT)"; \
		echo "Use 'make logs' to view logs or 'make stop' to stop"; \
	else \
		echo "Development server is not running (stale PID file)"; \
		rm -f $(DEV_PID_FILE); \
	fi

# Check status of background preview server
status-preview:
	@if [ ! -f $(PREVIEW_PID_FILE) ]; then \
		echo "Preview server is not running in background."; \
		exit 0; \
	fi
	@PID=$$(cat $(PREVIEW_PID_FILE)); \
	if ps -p $$PID > /dev/null 2>&1; then \
		echo "Preview server is running (PID: $$PID)"; \
		echo "Port: $(PREVIEW_PORT)"; \
		echo "Use 'make logs-preview' to view logs or 'make stop-preview' to stop"; \
	else \
		echo "Preview server is not running (stale PID file)"; \
		rm -f $(PREVIEW_PID_FILE); \
	fi

# Show logs from background dev server
logs:
	@if [ ! -f $(DEV_LOG_FILE) ]; then \
		echo "No log file found. The server may not be running in background."; \
		exit 1; \
	fi
	@echo "Showing development server logs (Ctrl+C to exit):"
	@tail -f $(DEV_LOG_FILE)

# Show logs from background preview server
logs-preview:
	@if [ ! -f $(PREVIEW_LOG_FILE) ]; then \
		echo "No log file found. The server may not be running in background."; \
		exit 1; \
	fi
	@echo "Showing preview server logs (Ctrl+C to exit):"
	@tail -f $(PREVIEW_LOG_FILE)

