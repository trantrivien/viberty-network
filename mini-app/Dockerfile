FROM node:20-slim

# Optional: Giảm size image
RUN apt-get update && apt-get install -y python3 make g++ bash && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]
