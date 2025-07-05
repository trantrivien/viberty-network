# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the source code
COPY . .

# Build the Next.js app
RUN yarn run build

# Stage 2: Production image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the build output and other necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose the port
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
