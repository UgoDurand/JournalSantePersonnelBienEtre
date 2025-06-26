# Utiliser l'image Node.js comme base
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration npm
COPY package*.json ./

# Installer les dépendances (y compris devDependencies)
RUN npm install

# Copier le code source
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Commande pour démarrer l'application en mode développement
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0", "--port", "3000"] 