FROM node:20-alpine

# Install dependencies for building native modules if needed
RUN apk add --no-cache python3 make g++ bash

WORKDIR /app

COPY package*.json ./
RUN yarn install --frozen-lockfile

# Copy toàn bộ code vào container
COPY . .

# Build TypeScript sang JavaScript
RUN yarn build

# Expose port bạn dùng, ví dụ: 8000
EXPOSE 8000

# Start app dùng file đã build
CMD ["yarn", "start"]
