# Omics Full Stack Application

A dockerized full-stack application with Express.js backend and React frontend.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js (>= 20)
- Git

## Project Structure
omics/
├── backend/
│ ├── Dockerfile
│ ├── package.json
│ └── server.js
├── frontend/
│ ├── Dockerfile
│ ├── package.json
│ └── src/
├── docker-compose.yml
└── README.md

## Configuration

The application is configured to run on the following domains:
- Frontend: https://y.xyz.com (Port 3000)
- Backend: https://x.xyz.com (Port 8080)

## Installation & Running

### Using Docker (Recommended)

1. Clone the repository:

```bash
git clone <repository-url>
cd omics
```

2. Start the application using Docker Compose:
```bash
docker-compose up --build
```

This will:
- Build both frontend and backend containers
- Start the services
- Set up the network between containers
- Mount volumes for development

### Local Development

1. Install backend dependencies:
```bash
cd backend
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Start the backend server:
```bash
cd backend
npm start
```

4. Start the frontend development server:
```bash
cd frontend
npm start
```

## Environment Variables

### Backend
- `PORT`: Server port (default: 8080)
- `NODE_ENV`: Environment mode
- `FRONTEND_URL`: Frontend URL for CORS

### Frontend
- `REACT_APP_BACKEND_URL`: Backend API URL

## Development

- Backend runs on: http://localhost:8080
- Frontend runs on: http://localhost:3000

## Production Deployment

1. Update the domain names in:
   - docker-compose.yml
   - backend/server.js
   - frontend/.env (create if needed)

2. Set up SSL certificates for your domains

3. Deploy using:
```bash
docker-compose -f docker-compose.yml up -d
```
