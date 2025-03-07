# Omics Full Stack Application

A dockerized full-stack application with Express.js backend and ReactJS frontend.

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

You can configure Frontend and Backend URLs with the related env params in the corresponding docker-compose files

## Installation & Running

### Using Docker (Recommended)

1. Clone the repository:

```bash
git clone https://github.com/hcoz/omics.git
cd omics
```

2. Start the application using Docker Compose (As the default one is development, you don't need to specify compose file):
```bash
docker-compose up --build
```

## Environment Variables

### Backend
- `PORT`: Server port (default: 8080)
- `NODE_ENV`: Environment mode
- `FRONTEND_URL`: Frontend URL

### Frontend
- `REACT_APP_ENV`: Environment mode
- `REACT_APP_BACKEND_URL`: Backend API URL

## Development

- Backend runs on: http://localhost:8080
- Frontend runs on: http://localhost:3000

## Production Deployment

1. Set up host file if necessary

2. Deploy using:
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```
