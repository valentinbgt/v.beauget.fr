# Image de Départ
FROM node:latest AS builder

# Create and set working directory
WORKDIR /app

ARG CACHEBUST
# Build arguments for environment variables (required at build time for Nuxt public runtime config)
ARG NUXT_PUBLIC_FORM_URL
ENV NUXT_PUBLIC_FORM_URL=${NUXT_PUBLIC_FORM_URL}

# Clone the repository
COPY . .

# Install dependencies and build
RUN npm install
RUN echo "[Docker Build] NUXT_PUBLIC_FORM_URL is: ${NUXT_PUBLIC_FORM_URL:-(not set)}"
RUN npm run build


FROM node:alpine

WORKDIR /app

COPY --from=builder /app/.output /app

# Expose default Nuxt port
EXPOSE 3000

# Start the server
CMD ["node", "/app/server/index.mjs"]