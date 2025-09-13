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

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user