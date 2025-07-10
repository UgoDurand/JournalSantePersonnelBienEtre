# 🛠️ Mode Développement - Contournement Authentification

## Activation du Mode Développement

Pour tester les fonctionnalités sans passer par l'authentification Microsoft, suivez ces étapes :

### 1. Ouvrir la Console du Navigateur
- Appuyez sur `F12` ou `Ctrl+Shift+I` (Windows/Linux) ou `Cmd+Option+I` (Mac)
- Allez dans l'onglet "Console"

### 2. Activer le Mode Développement
Copiez et collez ce code dans la console :

```javascript
// Activer le mode développement
window.authService.enableDevMode()

// Recharger la page pour prendre en compte les changements
window.location.reload()
```

### 3. Vérifier l'Activation
Après le rechargement, vous devriez voir :
- La navbar apparaître
- Accès aux pages sans redirection vers login
- Message dans la console confirmant l'activation

### 4. Désactiver le Mode Développement
Quand vous avez terminé vos tests :

```javascript
// Désactiver le mode développement
window.authService.disableDevMode()
```

## Code d'Activation Rapide

```javascript
// Copier-coller ce bloc complet
(() => {
  console.log('🛠️ Activation du mode développement...')
  
  // Vérifier que authService est disponible
  if (window.authService) {
    window.authService.enableDevMode()
    console.log('✅ Mode développement activé!')
    console.log('🔄 Rechargement automatique dans 2 secondes...')
    setTimeout(() => window.location.reload(), 2000)
  } else {
    console.error('❌ authService non trouvé. Recharger la page et réessayer.')
  }
})()
```

## Tests à Effectuer Ensuite

Une fois le mode développement activé, vous pouvez :

1. **Tester l'ajout d'activité** :
   - Aller sur `/activity`
   - Cliquer sur "Modifier mes activités"
   - Remplir et enregistrer
   - Vérifier les logs de la console

2. **Tester la navigation par date** :
   - Sélectionner une date sur la page d'accueil
   - Cliquer sur "Voir les détails"
   - Vérifier que la page affiche la bonne date

3. **Tester l'ajout de sommeil** :
   - Aller sur `/sleep`
   - Remplir les données
   - Enregistrer et vérifier

## ⚠️ Important

- Ce mode contourne l'authentification **uniquement côté frontend**
- Le backend renverra toujours des erreurs 401
- C'est normal et attendu pour le debug
- Ne pas utiliser en production
- Les données ne seront pas réellement sauvegardées

## Restauration

Pour revenir au mode normal :
```javascript
window.authService.disableDevMode()
window.location.reload()
```
