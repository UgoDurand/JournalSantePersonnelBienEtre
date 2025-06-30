# Journal Santé Personnel Bien-Être - Backend

## 🔐 Authentification Microsoft OAuth2

Cette application utilise l'authentification **Microsoft OAuth2** (Azure AD) avec JWT pour sécuriser l'accès. Les utilisateurs se connectent uniquement via leur **compte Microsoft**.

### 🚀 Configuration rapide

1. **Cloner et installer**
```bash
git clone <repository-url>
cd backend
./mvnw clean install
```

2. **Configuration Microsoft OAuth2**

Créez un fichier `.env` ou configurez les variables d'environnement :

```bash
# Microsoft OAuth2 (Azure AD)
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret

# JWT Secret
JWT_SECRET=your-secret-key-at-least-256-bits
```

3. **Base de données PostgreSQL**
```bash
# Assurez-vous que PostgreSQL est en cours d'exécution
# Base de données : journal_sante_db
# Utilisateur : postgres
# Mot de passe : password
```

### 🔧 Configuration Microsoft OAuth2 (Azure AD)

1. **Accédez au portail Azure** : [portal.azure.com](https://portal.azure.com/)
2. **Azure Active Directory** > **App registrations** > **New registration**
3. **Nom de l'application** : `Journal Santé Backend`
4. **Supported account types** : `Accounts in any organizational directory and personal Microsoft accounts`
5. **Redirect URI** : 
   - Platform: `Web`
   - URI: `http://localhost:8080/login/oauth2/code/microsoft`
6. **Enregistrer** l'application
7. **Noter** le `Application (client) ID`
8. **Certificates & secrets** > **New client secret** > **Noter** la valeur
9. **API permissions** > **Add a permission** > **Microsoft Graph** > **Delegated permissions**
   - Ajouter : `openid`, `profile`, `email`

### 🎯 Endpoints disponibles

#### Authentification
- `GET /oauth2/authorize/microsoft` - Connexion Microsoft
- `GET /auth/user` - Informations utilisateur actuel
- `GET /auth/validate` - Validation du token JWT
- `POST /auth/logout` - Déconnexion
- `GET /auth/info` - Informations sur l'authentification

#### Utilisation du token JWT
```javascript
// Headers à inclure dans vos requêtes
{
  "Authorization": "Bearer <your-jwt-token>"
}
```

### 🏗️ Architecture

```
src/main/java/fr/JSBE/backend/
├── config/
│   └── SecurityConfig.java                     # Configuration Spring Security
├── controller/
│   ├── AuthController.java                     # Endpoints d'authentification
│   └── HomeController.java                     # Endpoints de base
├── dto/
│   ├── AuthResponse.java                       # Réponse d'authentification
│   └── UserInfo.java                           # Informations utilisateur
├── model/
│   ├── User.java                               # Entité utilisateur
│   └── AuthProvider.java                       # Enum (MICROSOFT)
├── repository/
│   └── UserRepository.java                     # Repository JPA
├── security/
│   ├── OAuth2AuthenticationSuccessHandler.java # Handler de succès
│   └── OAuth2AuthenticationFailureHandler.java # Handler d'échec
├── service/
│   ├── OAuth2UserService.java                  # Service OAuth2 personnalisé
│   ├── OAuth2UserInfo.java                     # Interface utilisateur OAuth2
│   ├── MicrosoftOAuth2UserInfo.java            # Impl. Microsoft
│   ├── OAuth2UserInfoFactory.java              # Factory
│   └── CustomOAuth2User.java                   # Utilisateur OAuth2 personnalisé
└── util/
    └── JwtUtil.java                            # Utilitaires JWT
```

### 🔄 Flux d'authentification

1. **Frontend** → Redirige vers `/oauth2/authorize/microsoft`
2. **Spring Security** → Redirige vers Microsoft Azure AD
3. **Microsoft** → L'utilisateur s'authentifie avec son compte Microsoft
4. **Callback** → `/login/oauth2/code/microsoft`
5. **JWT Generation** → Génération d'un token JWT
6. **Redirection** → Vers le frontend avec le token

### 📱 Intégration Frontend

```javascript
// Exemple de connexion
window.location.href = 'http://localhost:8080/oauth2/authorize/microsoft';

// Récupération du token depuis l'URL après redirection
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

// Utilisation du token pour les requêtes API
const response = await fetch('http://localhost:8080/auth/user', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### 🚀 Lancement

```bash
./mvnw spring-boot:run
```

L'application démarre sur `http://localhost:8080`

### 🔒 Sécurité

- **Microsoft OAuth2** : Authentification sécurisée via Azure AD
- **JWT** : Tokens sécurisés avec expiration (24h par défaut)
- **CORS** : Configuré pour autoriser les requêtes depuis `localhost:3000`
- **HTTPS** : Recommandé en production
- **Variables d'environnement** : Secrets non exposés dans le code

### 📊 Informations utilisateur récupérées

Via Microsoft Graph API :
- **ID** : Identifiant unique Microsoft
- **Nom** : `displayName` de l'utilisateur
- **Email** : Adresse email principale
- **Vérification** : Email automatiquement vérifié par Microsoft

### 📝 Notes importantes

- **JWT_SECRET** : Changez en production avec une clé de 256 bits minimum
- **HTTPS** : Configurez pour la production
- **Redirect URI** : Adaptez selon votre environnement de production
- **Permissions** : Seules les permissions `openid`, `profile`, `email` sont requises
- **Comptes supportés** : Comptes Microsoft personnels et professionnels

### 🔧 Variables d'environnement requises

```bash
# Obligatoires
MICROSOFT_CLIENT_ID=<votre-client-id>
MICROSOFT_CLIENT_SECRET=<votre-client-secret>

# Optionnelles (valeurs par défaut)
JWT_SECRET=mySecretKey
``` 