#!/bin/bash

echo "🚀 Building single executables for all platforms..."

# Build frontend
echo "📦 Building frontend..."
cd frontend && bun run build && cd ..

# Build executables
echo "🍎 Building macOS executable..."
bun build backend/index.js --compile --outfile=testexe-final-macos --target=bun-mac

echo "🐧 Building Linux executable..."
bun build backend/index.js --compile --outfile=testexe-final-linux --target=bun-linux

echo "🪟 Building Windows executable..."
bun build backend/index.js --compile --outfile=testexe-final-windows.exe --target=bun-windows

echo "✅ All executables built successfully!"
echo ""
echo "📁 Final executables:"
echo "   - macOS:   ./testexe-final-macos"
echo "   - Linux:   ./testexe-final-linux"
echo "   - Windows: ./testexe-final-windows.exe"
echo ""
echo "🌐 These executables work from ANY location!"
echo "   Just copy them anywhere and run - no external files needed."