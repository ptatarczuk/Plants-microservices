# Stage 1 = build
FROM openjdk:17-jdk-alpine as build
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
COPY mvnw.cmd .
COPY ../pom.xml /parent/pom.xml
RUN ./mvnw -f /parent/pom.xml clean install

RUN --mount=type=cache,target=/root/.m2 ./mvnw install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)


# Stage 2 = run
FROM openjdk:17-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=/app/target/dependency

COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java", "-cp", "app:app/lib/*", "com.x250.apigateway.ApiGatewayApplication"]

# mvn -N wrapper:wrapper pamiętać że ta komenda musi być uruchomiona przed docker-compose up