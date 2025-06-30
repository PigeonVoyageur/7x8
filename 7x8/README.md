# Tables de Multiplication 7×8

Une application web moderne pour l'apprentissage des tables de multiplication, inspirée du logiciel éducatif 7×8.

## 🎯 Fonctionnalités

- **Sélection des tables** : Choisissez les tables de 2 à 9 à travailler
- **Jeu interactif** : Questions aléatoires avec validation automatique
- **Validation intelligente** : Validation dès que le bon nombre de chiffres est saisi (1 ou 2 selon la réponse)
- **Suivi en temps réel** : Tableau coloré montrant votre progression
  - 🔵 Bleu : À faire
  - 🟢 Vert : Réussi
  - 🔴 Rouge : Raté
- **Résultats détaillés** : Pourcentage de réussite et récapitulatif des erreurs

## 🚀 Technologies

- **React 18** avec TypeScript
- **Vite** pour un développement rapide
- **CSS moderne** avec design responsive
- **Hooks personnalisés** pour la gestion d'état

## 🛠️ Installation et lancement

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Compiler pour la production
npm run build
```

## 🎮 Utilisation

1. **Sélection** : Choisissez les tables que vous souhaitez travailler
2. **Jeu** : Répondez aux multiplications proposées
3. **Progression** : Suivez votre avancement dans le tableau à droite
4. **Résultats** : Consultez vos statistiques et erreurs à la fin

## 📱 Interface

L'application propose une interface moderne et intuitive :
- Design responsive pour tous les écrans
- Animations fluides et feedback visuel
- Validation automatique sans bouton "Valider"
- Code couleur clair pour le suivi des progrès

## 🧠 Logique de jeu

- **Pas de seconde chance** : Une multiplication ratée reste ratée
- **Ordre aléatoire** : Les questions sont mélangées pour un apprentissage optimal
- **Validation automatique** : Dès que vous tapez le bon nombre de chiffres
- **Feedback immédiat** : Réponse correcte ou affichage de la bonne réponse
