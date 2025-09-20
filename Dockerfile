# FROM node:22
# WORKDIR /app
# COPY . .
# RUN npm install
# CMD ["npm", "run","dev"]

# Use Node 22 Alpine for a lightweight base image
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists) for dependency caching
COPY package*.json ./

# Install dependencies (including dev deps for build)
RUN npm install

# Copy the rest of the codebase
COPY . .

# Build the TypeScript code
RUN npm run build

# Final production image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy built artifacts from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# Removed: COPY --from=builder /app/.env ./.env  # Use volumes/secrets in prod instead

# Install only production dependencies to slim down the image
RUN npm install --only=production

# Expose the port (default 3000; override at runtime if needed)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
