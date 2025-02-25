# Stage 1: Dependencies and Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/types/package.json ./packages/types/

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build packages
RUN npm run build --workspace=types
RUN npm run build --workspace=api

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

# Set to production environment
ENV NODE_ENV production
ENV PORT 4000

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 apiuser

# Copy necessary files from builder stage
COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/types/package.json ./packages/types/package.json
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/package.json ./package.json

# Set the correct permissions
RUN chown -R apiuser:nodejs /app

# Switch to non-root user
USER apiuser

# Expose the port the app will run on
EXPOSE 4000

# Set the command to start the app
CMD ["node", "apps/api/dist/index.js"]