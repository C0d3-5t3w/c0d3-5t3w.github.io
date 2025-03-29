# Project directories
RUST_SRC_DIR = src
TS_SRC_DIR = assets/ts
TS_OUT_DIR = assets/js
SASS_SRC_DIR = assets/sass
SASS_OUT_DIR = assets/css

# Build configuration
GO = go
CARGO = cargo
TSC = npx tsc
SASS = npx sass
WATCHEXEC = watchexec

# Default target
.PHONY: all
all: rust-build ts-build sass-build

# Rust targets
.PHONY: rust-build
rust-build:
	@echo "Building Rust project..."
	$(CARGO) build

.PHONY: rust-release
rust-release:
	@echo "Building Rust project for release..."
	$(CARGO) build --release

# TypeScript targets
.PHONY: ts-build
ts-build:
	@echo "Compiling TypeScript..."
	$(TSC) --project tsconfig.json --outDir $(TS_OUT_DIR) --sourceMap

.PHONY: ts-watch
ts-watch:
	@echo "Watching TypeScript files..."
	$(TSC) --project tsconfig.json --watch --outDir $(TS_OUT_DIR) --sourceMap

# Sass targets
.PHONY: sass-build
sass-build:
	@echo "Compiling Sass..."
	$(SASS) $(SASS_SRC_DIR):$(SASS_OUT_DIR)

.PHONY: sass-watch
sass-watch:
	@echo "Watching Sass files..."
	$(SASS) --watch $(SASS_SRC_DIR):$(SASS_OUT_DIR)

# Run targets
.PHONY: run-rust
run: clean ts-build sass-build
	@echo "Running server..."
	$(CARGO) run

.PHONY: run-go
run-go: clean ts-build sass-build
	$(GO) run $(RUST_SRC_DIR)/main.go

# Watch everything (development mode)
.PHONY: dev
dev:
	@echo "Starting development mode..."
	@echo "Press Ctrl+C to stop"
	@$(MAKE) -j3 ts-watch sass-watch run

# Clean targets
.PHONY: clean
clean:
	@echo "Cleaning build artifacts..."
	$(CARGO) clean
	rm -rf $(TS_OUT_DIR)/*.js
	rm -rf $(TS_OUT_DIR)/*.js.map
	rm -rf $(SASS_OUT_DIR)/*.css
	rm -rf $(SASS_OUT_DIR)/*.css.map

# Installation and setup
.PHONY: setup
setup:
	@echo "Setting up development environment..."
	npm install -g typescript sass

# Help target
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  all          - Build everything (default)"
	@echo "  rust-build   - Build Rust server"
	@echo "  rust-release - Build Rust server in release mode"
	@echo "  ts-build     - Compile TypeScript files"
	@echo "  ts-watch     - Watch and compile TypeScript files on change"
	@echo "  sass-build   - Compile Sass files"
	@echo "  sass-watch   - Watch and compile Sass files on change"
	@echo "  run          - Build and run the server"
	@echo "  run-release  - Run the server in release mode"
	@echo "  dev          - Start development mode with watchers"
	@echo "  clean        - Clean build artifacts"
	@echo "  setup        - Install development dependencies"
