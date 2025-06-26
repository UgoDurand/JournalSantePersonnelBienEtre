# Utiliser l'image OpenJDK 21 comme base
FROM openjdk:21-jdk-slim

# Installer Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration Maven
COPY pom.xml .
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn

# Télécharger les dépendances (pour optimiser le cache Docker)
RUN mvn dependency:go-offline -B

# Copier le code source
COPY src src

# Construire l'application
RUN mvn clean package -DskipTests

# Exposer le port 8080
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"] 