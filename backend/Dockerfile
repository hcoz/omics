FROM node:18-alpine

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Add environment variable for frontend URL
ENV FRONTEND_URL=https://y.xyz.com

CMD ["npm", "start"]
