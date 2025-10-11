FROM eclipse-temurin:21-jre
WORKDIR /app
COPY Backend/target/BudgetBee-0.0.1-SNAPSHOT.jar budgetbee.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "budgetbee.jar"]