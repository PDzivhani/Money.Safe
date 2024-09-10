# backend/Dockerfile
# Copy the project files and build the Spring Boot app
# Stage 2: Run the Spring Boot app
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]


# Stage 1: Build the Maven Project
FROM maven:3.8.6-openjdk-17-slim AS build

# Create a working directory
RUN mkdir -p /app
WORKDIR /app

# Copy only the pom.xml first to leverage Docker cache for dependencies
COPY pom.xml /app

# Download dependencies without copying the full project to cache layers effectively
RUN mvn -B dependency:resolve

# Copy the rest of the project (source code)
COPY src /app/src

# Build the project
RUN mvn clean package -DskipTests

# Stage 2: Run the Application
FROM openjdk:8-jdk-alpine

# Copy the jar file from the build stage
COPY --from=build /workspace/target/*.jar /app.jar

# Expose $PORT on container.
# We use a varibale here as the port is something that can differ on the environment.
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app.jar"]
