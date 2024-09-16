# backend/Dockerfile
# Copy the project files and build the Spring Boot app
# Stage 1: Build the Maven Project
FROM maven:3.8.8-eclipse-temurin-17 AS build

# Create a working directory
WORKDIR /app

# Copy only the pom.xml first to leverage Docker cache for dependencies
COPY pom.xml /app

# Download dependencies without copying the full project to cache layers effectively
RUN mvn -B dependency:resolve

# Copy the rest of the project (source code)
COPY src /app/src

# Build the project
RUN mvn clean package -DskipTests

#verify if jar exists
RUN ls /app/target/


# Stage 2: Run the Spring Boot app
FROM openjdk:17-jdk-slim

# Copy the jar file from the build stage
# COPY --from=build /app/target/*.jar /app/app/target/app.jar
COPY --from=build /app/target/MoneySafe-0.0.1-SNAPSHOT.jar /app/target/app.jar

# Expose $PORT on container.
# We use a varibale here as the port is something that can differ on the environment.
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/target/app.jar"]
