# Use a Node.js image
FROM node:18.12.1-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Install PM2 globally
RUN npm install -g pm2

# Copy the application code
COPY . .
COPY prisma ./prisma
# Expose the application port
EXPOSE 5000

# Start the application
CMD ["pm2", "start", "app.js","-i","max", "--no-daemon"]
