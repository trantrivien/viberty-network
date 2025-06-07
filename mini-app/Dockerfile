# Use a Node.js base image
FROM node:20-alpine

# Install build tools for native dependencies
RUN apk add --no-cache python3 make g++ bash

# Set working directory
WORKDIR /app


# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3001

# Start the app
CMD ["npm", "run", "start"]