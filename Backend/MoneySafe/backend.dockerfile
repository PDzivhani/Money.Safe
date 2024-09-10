# backend/Dockerfile
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app

# Copy the project files and build the Spring Boot app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run the Spring Boot app
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar /app/app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
