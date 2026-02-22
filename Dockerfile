# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Since Vite is configured with base: '/star-trek/', 
# we place the built files in a corresponding subfolder
COPY --from=builder /app/dist /usr/share/nginx/html/star-trek

# Also copy them to the root just in case the reverse proxy strips the path
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
