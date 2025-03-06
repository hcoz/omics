# Omics Full Stack Application

A dockerized full-stack application with Express.js backend and React frontend.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js (>= 18)
- Git

## Project Structure
```
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
```

## Configuration

You can configure Frontend and Backend URLs with corresponding params on .env files as described below

## Installation & Running

### Using Docker (Recommended)

1. Clone the repository:

```bash
git clone https://github.com/hcoz/omics.git
cd omics
```

2. Rename env sample files by deleting .example part
```
.env.example.development => .env.development
.env.example.production => .env.production
```

3. Start the application using Docker Compose:
```bash
docker-compose up --build
```

If you want to run in production mode, add the NODE_ENV parameter at the beginning.
As the default mode is development, you can omit this for development mode.
```bash
NODE_ENV=production docker-compose up --build
```

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

### Frontend
- `REACT_APP_ENV`: Environment mode
- `REACT_APP_BACKEND_URL`: Backend API URL

## Development

- Backend runs on: http://localhost:8080
- Frontend runs on: http://localhost:3000

## Production Deployment

1. Update the domain names in:
   - backend/.env.production
   - frontend/.env.production

2. Set up SSL certificates for your domains

3. Deploy using:
```bash
docker-compose -f docker-compose.yml up -d
```
