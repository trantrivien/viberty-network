# =========================================
# Stage 1: Build the Next.js app
# =========================================
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock first (for caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the code
COPY . .

# Build the Next.js app
RUN yarn build


FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules


COPY --from=builder /app/next.config.js ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "start"]
