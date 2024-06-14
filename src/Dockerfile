FROM node:18-alpine

WORKDIR /app

# Use production node environment by default.
ENV NODE_ENV production

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

# Install vite globally to build the UI assets
RUN npm install -g vite

# Run Vite build to package the UI assets
RUN npm run build

EXPOSE 3000

# Run the application as a non-root user.
USER node

# Run the application.
CMD npm start
