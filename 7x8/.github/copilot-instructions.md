# Copilot Instructions pour l'Application Tables de Multiplication 7x8

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Contexte du Projet
Cette application React TypeScript reproduit les principes du logiciel éducatif 7x8 pour l'apprentissage des tables de multiplication.

## Fonctionnalités Principales
- **Sélection des tables** : L'utilisateur choisit les tables de 2 à 9 à travailler
- **Jeu de multiplication** : Questions aléatoires avec validation automatique (1 ou 2 chiffres)
- **Suivi en temps réel** : Tableau coloré montrant le progrès (bleu=à faire, rouge=raté, vert=réussi)
- **Résultats finaux** : Pourcentage de réussite et récapitulatif des erreurs

## Règles de Développement
- **Interface moderne** : Utiliser CSS moderne, design responsive et attrayant
- **TypeScript strict** : Types bien définis pour la logique métier
- **Validation automatique** : Dès que 1 ou 2 chiffres sont saisis selon la réponse attendue
- **Gestion d'état** : React hooks pour gérer l'état du jeu
- **Pas de re-tentative** : Une multiplication ratée reste ratée (pas de seconde chance)

## Structure Attendue
- Composants modulaires et réutilisables
- Logique de jeu séparée de l'interface utilisateur  
- Gestion claire des états (sélection, jeu, résultats)
- Interface utilisateur intuitive et moderne
