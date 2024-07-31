# Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

COPY backend-entrypoint.sh /app/backend-entrypoint.sh

# Make the script executable
RUN chmod +x /app/backend-entrypoint.sh

# Optionally set the default entrypoint


# Copy the rest of your application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a smaller image for production
FROM node:18-slim

RUN apt-get update && apt-get install -y curl

# Set working directory
WORKDIR /app

# Copy build files from the previous stage
COPY --from=build /app/.next .next
COPY --from=build /app/public public
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma prisma
COPY --from=build /app/backend-entrypoint.sh backend-entrypoint.sh

# Install only production dependencies
RUN npm install --production

RUN chmod +x backend-entrypoint.sh

# Expose the port on which the app runs
EXPOSE 3000

ENTRYPOINT ["./backend-entrypoint.sh"]
