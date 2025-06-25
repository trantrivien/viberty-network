# Stage 1: Build
FROM node:20-alpine AS builder

# Tạo thư mục app
WORKDIR /app

# Copy file cấu hình và cài đặt dependencies
COPY package.json yarn.lock ./
COPY . .

# Cài đặt và build asset
RUN yarn install --frozen-lockfile
RUN yarn assets
RUN yarn build

# Stage 2: Serve static files
FROM nginx:alpine

# Copy build output sang Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Khởi chạy nginx
CMD ["nginx", "-g", "daemon off;"]
