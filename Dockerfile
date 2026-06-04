# --- STAGE 1: Build the React App ---
FROM node:18-alpine AS build-stage

WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Create the production build
RUN npm run build

# --- STAGE 2: Serve with Nginx ---
FROM nginx:stable-alpine

# Copy the build output from the first stage to Nginx's html folder
# Note: Ensure your build output is in 'dist' (Vite) or 'build' (CRA)
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]