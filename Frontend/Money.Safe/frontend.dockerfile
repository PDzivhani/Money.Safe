# frontend/Dockerfile
FROM node:16-alpine AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the Angular code and build the application
COPY . .
RUN npm run build --prod

# Stage 2: Serve the Angular app with nginx
FROM nginx:alpine
COPY --from=build /app/dist/money.safe /usr/share/nginx/html
#Informs Docker that the container will listen on network ports at runtime, and the specified port is 80.
EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
