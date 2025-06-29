# Dockerfile

# Base image
FROM node:20.12.2-alpine


# Create app directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build TypeScript (nếu dùng build) — nếu chạy ts-node thì không cần
# RUN yarn build

# Expose port (8000 nếu bạn dùng)
EXPOSE 8000

# Start the app
CMD ["yarn", "dev"]
