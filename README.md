# Journal Santé Personnel Bien-Être

Application de suivi du bien-être personnel, composée d’un backend Spring Boot, d’un frontend Vue.js, et d’une base de données PostgreSQL via Docker.

---

## 🔧 Prérequis

- Docker  
- Node.js et npm (v16+ recommandé)  
- Java JDK 17 ou supérieur  
- Maven (ou wrapper `./mvnw` déjà présent dans le repo)

---

## ⚙️ Lancer l'application

### 1. Cloner le dépôt

git clone https://github.com/ton-utilisateur/JournalSantePersonnelBienEtre.git
cd JournalSantePersonnelBienEtre

---

### 2. Lancer la base de données avec Docker

docker-compose up -d

Cela démarre un conteneur PostgreSQL configuré pour le projet.

---

### 3. Lancer le backend Spring Boot

cd backend
./mvnw clean install
./mvnw spring-boot:run

Ou si tu as Maven installé globalement :

mvn clean install
mvn spring-boot:run

Le backend sera accessible à l’adresse :  
http://localhost:8080

> ⚠️ Assure-toi d’avoir un fichier `.env` à la racine du backend avec les variables suivantes :

MICROSOFT_CLIENT_ID=your_microsoft_client_id_here
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret_here

---

### 4. Lancer le frontend Vue.js

cd ../frontend
npm install
npm run serve

Le frontend sera accessible à l’adresse :  
http://localhost:3000

---

## ✅ Résultat attendu

- Le frontend Vue.js tourne sur http://localhost:3000  
- Le backend Spring Boot tourne sur http://localhost:8080  
- La base PostgreSQL est lancée via Docker et connectée au backend

---

## 📁 Structure du projet


JournalSantePersonnelBienEtre/
├── backend/         → Backend Spring Boot
├── frontend/        → Frontend Vue.js
├── docker-compose.yml → Docker PostgreSQL
└── README.md        → Ce fichier


---

## 📌 Notes

- Le backend expose des endpoints sécurisés avec OAuth2 (Microsoft Azure AD).
- Les tokens JWT sont utilisés pour maintenir l’authentification.
- Le frontend envoie automatiquement le token au backend après connexion.

---

## ✨ Auteurs

Projet réalisé par Cyril GROSJEAN, Jonas OBRUN, Ugo DURAND, Nicolas Ramirez
Efrei Paris — ING1 S2 — DevWeb