# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml first for dependency caching
COPY pom.xml .
COPY src ./src

# Download dependencies and build the JAR
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create a non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring

# Copy the built JAR from the build stage
# The JAR will be named VotingApp-0.0.1-SNAPSHOT.jar based on your pom.xml
COPY --from=build /app/target/VotingApp-0.0.1-SNAPSHOT.jar app.jar

# Switch to non-root user
USER spring

# Expose the port Spring Boot runs on
EXPOSE 8080

# Start the application with database configuration from environment variables
ENTRYPOINT ["java", "-jar", "app.jar"]