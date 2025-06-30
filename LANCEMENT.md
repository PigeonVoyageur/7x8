# 🚀 Lancement de l'application 7x8

## Fichiers de lancement disponibles

### 1. `start-7x8-app.bat` (Simple)
- Fichier batch basique pour lancer l'application
- Double-cliquez pour exécuter
- Ouvre une fenêtre de commande simple

### 2. `start-7x8-app.ps1` (PowerShell)
- Version PowerShell plus moderne
- Ouvre automatiquement le navigateur après 3 secondes
- Meilleure gestion des erreurs
- **Exécution :** Clic droit → "Exécuter avec PowerShell"

### 3. `launch-7x8.bat` (Interface améliorée)
- Interface graphique ASCII
- Vérification automatique des prérequis
- Option de redémarrage automatique
- Ouverture automatique du navigateur

## 📋 Prérequis

- **Node.js** installé sur votre système
- Connexion internet pour l'installation initiale

## 🎯 Utilisation rapide

1. **Double-cliquez** sur `launch-7x8.bat`
2. L'application se lance automatiquement
3. Votre navigateur s'ouvre sur `http://localhost:5174`
4. Amusez-vous avec les tables de multiplication !

## 🛠️ Résolution des problèmes

### Erreur "Node.js n'est pas installé"
- Téléchargez et installez Node.js depuis https://nodejs.org/
- Redémarrez votre ordinateur après l'installation

### L'application ne se lance pas
- Vérifiez que vous avez une connexion internet
- Essayez le fichier `start-7x8-app.bat` en tant qu'administrateur

### Port déjà utilisé
- L'application utilisera automatiquement un autre port (5175, 5176, etc.)
- L'URL correcte sera affichée dans la console

## 🎮 Fonctionnalités de l'application

- **Tables standard** : de 2 à 9
- **Tables personnalisées** : jusqu'à 1 000 000 (max 10 par partie)
- **Timer adaptatif** : temps basé sur la complexité du calcul
- **Statistiques détaillées** : temps de réponse moyen, pourcentage de réussite
- **Interface moderne** : design responsive et animations fluides

---

**Créé le :** $(Get-Date)
**Version :** 1.0.0
