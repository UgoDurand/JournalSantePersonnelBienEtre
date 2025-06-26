# Journal Santé Personnel Bien-être - Docker Setup

Ce projet utilise Docker Compose pour orchestrer les trois services suivants :
- **PostgreSQL** : Base de données
- **Spring Boot** : API Backend (port 8080)
- **Vue.js** : Frontend (port 3000)

## Prérequis

- Docker et Docker Compose installés sur votre machine
- Ports 3000, 5432 et 8080 disponibles

## Lancer l'application

### Première utilisation
```bash
# Construire et démarrer tous les services
docker compose up --build

# Ou en arrière-plan
docker compose up --build -d
```

### Utilisations suivantes
```bash
# Démarrer les services
docker compose up

# Ou en arrière-plan  
docker compose up -d
```

## Arrêter l'application

```bash
# Arrêter les services
docker-compose down

# Arrêter et supprimer les volumes (données perdues)
docker-compose down -v
```

## Accès aux services

- **Frontend Vue.js** : http://localhost:3000
- **Backend Spring Boot** : http://localhost:8080
- **Base de données PostgreSQL** : localhost:5432
  - Base : `journal_sante`
  - Utilisateur : `journal_user`
  - Mot de passe : `journal_password`

## Commandes utiles

```bash
# Voir les logs
docker-compose logs

# Voir les logs d'un service spécifique
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

# Reconstruire un service spécifique
docker-compose build backend
docker-compose build frontend

# Redémarrer un service
docker-compose restart backend
```

## Développement

- Les volumes sont montés pour permettre le hot-reload
- Le backend se reconnecte automatiquement à la base de données
- Le frontend supporte le hot-reload pour Vue.js

## Configuration

### Base de données
- Les données PostgreSQL sont persistées dans un volume Docker
- Le fichier `init.sql` est exécuté au premier démarrage pour initialiser la base

### Backend
- Configuration Spring Boot pour Docker dans les variables d'environnement
- JPA configuré pour créer/mettre à jour automatiquement le schéma

### Frontend  
- Configuration Vue.js pour pointer vers l'API backend
- Mode développement activé avec hot-reload 