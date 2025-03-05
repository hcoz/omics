FROM node:18-alpine

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

# Add environment variable for backend URL
ENV REACT_APP_BACKEND_URL=https://x.xyz.com

EXPOSE 3000

CMD ["npm", "start"] 
