# Test App - Backend & Frontend

This project contains a simple backend server using Hono and a frontend built with Vue 3 and Vite.

## Project Structure

```
testexe/
├── backend/          # Hono server
│   ├── index.js      # Main server file
│   └── package.json  # Backend dependencies
├── frontend/         # Vue 3 + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── BackendConnection.vue  # Component to test backend connection
│   │   └── App.vue
│   └── package.json
└── README.md
```

## Backend (Hono Server)

The backend is a simple Hono server with the following features:
- Health check endpoint (`/api/health`)
- Users API (`/api/users`)
- CORS enabled for frontend communication
- Runs on port 3000

### Running the Backend

**Development:**
```bash
cd backend
bun install
bun run dev
```

**Production (Obfuscated):**
```bash
cd backend
bun install
bun run build:prod
bun run start:prod
```

The server will start on `http://localhost:3000`

## Frontend (Vue 3 + Vite)

The frontend is a Vue 3 application with TypeScript, Router, Pinia, and other modern tools, all running with Bun.

### Running the Frontend

```bash
cd frontend
bun install
bun run dev
```

The frontend will start on `http://localhost:5173`

## Features

- **Backend Connection Test**: The frontend includes a component that can test the connection to the backend
- **Health Check**: Test if the backend server is running
- **Users API**: Fetch and display users from the backend
- **Error Handling**: Proper error handling for failed API calls
- **Code Obfuscation**: Backend code is heavily obfuscated for production builds
- **Bundle Optimization**: Rollup bundling with minification and dead code elimination

## Development

1. Start the backend server first: `cd backend && bun install && bun run dev`
2. Start the frontend in a new terminal: `cd frontend && bun install && bun run dev`
3. Open `http://localhost:5173` in your browser
4. Use the "Backend Connection Test" section to verify the connection

## Creating Executables

This project can be built into standalone executables for all major platforms (macOS, Linux, Windows). The executables are completely self-contained and can run from anywhere without requiring Node.js, Bun, or any other dependencies.

### Prerequisites

- [Bun](https://bun.sh) installed on your system
- Git (to clone the repository)

### Build Process

1. **Clone and setup the project:**
   ```bash
   git clone <repository-url>
   cd testexe
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies
   bun install
   
   # Install frontend dependencies
   cd frontend
   bun install
   cd ..
   
   # Install backend dependencies
   cd backend
   bun install
   cd ..
   ```

3. **Build the executables:**
   ```bash
   # Make the build script executable (if needed)
   chmod +x build.sh
   
   # Run the build script
   ./build.sh
   ```

### What the Build Process Does

The build script (`build.sh`) performs the following steps:

1. **Frontend Build**: Compiles the Vue.js frontend into optimized static files
2. **Backend Compilation**: Uses Bun's native compilation to create standalone executables
3. **Multi-Platform Support**: Creates executables for:
   - **macOS**: `testexe-final-macos`
   - **Linux**: `testexe-final-linux` 
   - **Windows**: `testexe-final-windows.exe`

### Running the Executables

Once built, you can run the executables from anywhere:

```bash
# On macOS
./testexe-final-macos

# On Linux
./testexe-final-linux

# On Windows
./testexe-final-windows.exe
```

The executables will:
- Start the backend server on port 3000
- Serve the frontend on the same port
- Work completely offline with no external dependencies

### Executable Features

- **Self-contained**: No need for Node.js, Bun, or any other runtime
- **Portable**: Copy to any location and run
- **Cross-platform**: Separate executables for each platform
- **Optimized**: Frontend is built and bundled for production
- **Obfuscated**: Backend code is compiled and optimized

### Troubleshooting

- **Permission denied**: Make sure the build script is executable (`chmod +x build.sh`)
- **Build fails**: Ensure all dependencies are installed (`bun install` in all directories)
- **Executable won't run**: Check that you're using the correct executable for your platform

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user


<!-- pkill -f testexe-final-macos || true; sleep 1; ./testexe-final-macos & sleep 1; echo PROBE1: && curl -s http://localhost:3000/__assets_probe || true; -->