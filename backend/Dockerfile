FROM node:18-alpine

# Install SQLite dependencies
RUN apk add --no-cache sqlite sqlite-dev python3 make g++

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
