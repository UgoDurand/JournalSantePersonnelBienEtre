# 🧪 Guide de Test - Système d'Authentification

## 🚀 Démarrage rapide

### 1. Lancer le backend (Port 8080)
```bash
cd backend
./mvnw spring-boot:run
```

### 2. Lancer le frontend (Port 3000)
```bash
cd frontend
npm run serve
```

## 🔍 Tests à effectuer

### ✅ Test 1 : Redirection automatique vers login
1. Ouvrez `http://localhost:3000`
2. **Résultat attendu** : Redirection automatique vers `/login`
3. **Vérification** : La page de connexion s'affiche avec le bouton Microsoft

### ✅ Test 2 : Page de connexion
**Éléments à vérifier :**
- ✅ Logo "Journal Santé & Bien-être" 
- ✅ Bouton "Continuer avec Microsoft" (couleur bleue Microsoft)
- ✅ Logo Microsoft dans le bouton
- ✅ Section "Pourquoi utiliser Microsoft ?" avec les avantages
- ✅ Design responsive sur mobile

### ✅ Test 3 : Authentification Microsoft
1. Cliquez sur "Continuer avec Microsoft"
2. **Résultat attendu** : Redirection vers Microsoft Azure AD
3. Connectez-vous avec votre compte Microsoft
4. **Résultat attendu** : Retour sur l'application avec accès autorisé

### ✅ Test 4 : Navigation protégée
**Après connexion, vérifiez :**
- ✅ Navbar visible avec votre profil utilisateur
- ✅ Menu utilisateur (nom, email, initiales)
- ✅ Accès aux pages : Accueil, Sommeil, Activité, Humeur, Alimentation
- ✅ Pas de redirection vers `/login`

### ✅ Test 5 : Profil utilisateur
1. Cliquez sur votre profil dans la navbar
2. **Vérifications :**
   - ✅ Avatar avec vos initiales
   - ✅ Nom et email affichés
   - ✅ Badge "Microsoft" 
   - ✅ Menu déroulant avec options
   - ✅ Bouton "Se déconnecter"

### ✅ Test 6 : Déconnexion
1. Cliquez sur "Se déconnecter"
2. Confirmez la déconnexion
3. **Résultat attendu** : Redirection vers `/login`
4. **Vérification** : Tentative d'accès direct à `/` redirige vers `/login`

### ✅ Test 7 : Persistance de session
1. Connectez-vous
2. Fermez l'onglet
3. Rouvrez `http://localhost:3000`
4. **Résultat attendu** : Pas de redirection vers login (session maintenue)

### ✅ Test 8 : Validation de token
1. Connecté, ouvrez la console développeur (F12)
2. Supprimez le token : `localStorage.removeItem('auth_token')`
3. Rechargez la page
4. **Résultat attendu** : Redirection vers `/login`

## 🐛 Vérifications de sécurité

### 🔒 Routes protégées
Testez ces URLs directement dans l'adresse (sans être connecté) :
- `http://localhost:3000/` → Doit rediriger vers `/login`
- `http://localhost:3000/sleep` → Doit rediriger vers `/login`
- `http://localhost:3000/activity` → Doit rediriger vers `/login`

### 🔒 Route de connexion
Testez cette URL (en étant connecté) :
- `http://localhost:3000/login` → Doit rediriger vers `/`

## 🛠️ Console développeur

### LocalStorage
Vérifiez dans Application > Local Storage :
```javascript
// Token JWT
localStorage.getItem('auth_token')

// Informations utilisateur
localStorage.getItem('auth_user')
```

### Réseau
Surveillez les appels API dans l'onglet Network :
- `GET /auth/user` - Informations utilisateur
- `GET /auth/validate` - Validation du token
- `POST /auth/logout` - Déconnexion

## 🎯 Résultats attendus

### ✅ Fonctionnement normal
- Redirection automatique vers Microsoft OAuth2
- Retour avec token JWT valide
- Navigation fluide dans l'application
- Profil utilisateur affiché correctement
- Déconnexion propre

### ❌ Problèmes possibles

**"Erreur de connexion"**
- Vérifiez que le backend est démarré
- Vérifiez la configuration Microsoft OAuth2 dans le backend

**"Session expirée"**
- Token JWT expiré (normal après 24h)
- Reconnexion automatique demandée

**"Impossible de récupérer les informations utilisateur"**
- Problème de communication backend
- Vérifiez les CORS du backend

## 📱 Test responsive

Testez sur différentes tailles d'écran :
- **Mobile** : Navbar collapsible, page login adaptée
- **Tablet** : Menu utilisateur adapté
- **Desktop** : Interface complète

## 🔄 Scénarios avancés

### Test de rechargement de page
1. Naviguez vers `/sleep`
2. Rechargez (F5)
3. **Attendu** : Reste sur `/sleep` (pas de redirection)

### Test de token invalide
1. Connectez-vous
2. Modifiez le token dans localStorage
3. Faites une action (navigation)
4. **Attendu** : Déconnexion automatique

---

## 📋 Checklist finale

- [ ] Page de connexion design et fonctionnelle
- [ ] Authentification Microsoft fonctionnelle  
- [ ] Navigation protégée
- [ ] Profil utilisateur complet
- [ ] Déconnexion propre
- [ ] Gestion des erreurs
- [ ] Responsive design
- [ ] Persistance de session
- [ ] Sécurité des routes

**🎉 Si tous les tests passent, votre système d'authentification est prêt !** 