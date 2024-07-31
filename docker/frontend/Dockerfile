# Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY .env.local ./
RUN npm cache clean --force && npm install

# Copy the rest of your application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller image for production
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy build files from the previous stage
COPY --from=build /app/.next .next
COPY --from=build /app/public public
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.mjs ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env.local ./

# Install only production dependencies
RUN npm install --production

# Expose the port on which the app runs
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
