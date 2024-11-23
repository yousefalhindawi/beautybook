# Use a Node.js image
FROM node:18.12.1-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps

# Install PM2 globally
RUN npm install -g pm2

RUN npm install -g serve

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Expose the React development server port
EXPOSE 3000

# Start the application
CMD [ "serve","-s","-n", "build","-l", "3000", "--single" ]
# CMD ["npm", "start"]
# CMD ["pm2", "serve", "build", "--no-daemon", "--spa"]
# CMD ["pm2", "start", "npm", "--", "start"]
# CMD ["pm2", "serve", "build/", "3000","--name", "beautybook-frontend", "--no-daemon", "--spa"]