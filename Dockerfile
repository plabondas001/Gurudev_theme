# ── Stage 1: Build ───────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build-time env vars are baked into the bundle by Vite.
# Pass them via --build-arg or .env file at build time.
ARG VITE_API_BASE_URL
ARG VITE_GOOGLE_CLIENT_ID

RUN npm run build

# ── Stage 2: Serve with Nginx ────────────────────────────────────
FROM nginx:alpine

# Remove default nginx site
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]