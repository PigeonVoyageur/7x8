import type { Multiplication, MultiplicationAttempt, GameResults, CustomTable } from '../types/game';

// Générer toutes les multiplications pour les tables sélectionnées (y compris personnalisées)
export function generateMultiplications(selectedTables: number[], customTables: CustomTable[]): MultiplicationAttempt[] {
  const multiplications: MultiplicationAttempt[] = [];
  
  // Tables standards (2-9)
  selectedTables.forEach(table => {
    for (let i = 2; i <= 9; i++) {
      multiplications.push({
        factor1: table,
        factor2: i,
        result: table * i,
        attempted: false
      });
    }
  });

  // Tables personnalisées
  customTables.forEach(customTable => {
    for (let i = 2; i <= 9; i++) {
      multiplications.push({
        factor1: customTable.value,
        factor2: i,
        result: customTable.value * i,
        attempted: false
      });
    }
  });
  
  // Mélanger aléatoirement
  return shuffleArray(multiplications);
}

// Fonction pour mélanger un tableau (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Vérifier si une réponse est correcte
export function isAnswerCorrect(multiplication: Multiplication, userAnswer: number): boolean {
  return multiplication.result === userAnswer;
}

// Calculer les résultats du jeu
export function calculateResults(multiplications: MultiplicationAttempt[]): GameResults {
  const attemptedMultiplications = multiplications.filter(m => m.attempted);
  const correctAnswers = attemptedMultiplications.filter(m => m.isCorrect).length;
  const incorrectAnswers = attemptedMultiplications.length - correctAnswers;
  const percentage = attemptedMultiplications.length > 0 
    ? Math.round((correctAnswers / attemptedMultiplications.length) * 100) 
    : 0;

  // Calculer le temps de réponse moyen pour les bonnes réponses seulement
  const correctAnswersWithTime = attemptedMultiplications.filter(m => 
    m.isCorrect && m.responseTime !== undefined && !m.isTimeout
  );
  
  const averageResponseTime = correctAnswersWithTime.length > 0
    ? correctAnswersWithTime.reduce((sum, m) => sum + (m.responseTime || 0), 0) / correctAnswersWithTime.length
    : undefined;
  
  return {
    totalQuestions: attemptedMultiplications.length,
    correctAnswers,
    incorrectAnswers,
    percentage,
    errors: attemptedMultiplications.filter(m => !m.isCorrect),
    averageResponseTime
  };
}

// Déterminer le nombre de chiffres attendus pour la réponse
export function getExpectedDigitCount(result: number): number {
  return result.toString().length;
}

// Calculer le temps alloué basé sur le nombre de digits du résultat
export function calculateTimeLimit(result: number): number {
  const digitCount = getExpectedDigitCount(result);
  return Math.max(5, 5 * (digitCount - 1)); // Minimum 5 secondes
}

// Vérifier si l'utilisateur a saisi assez de chiffres pour valider
export function shouldValidateAnswer(userInput: string, expectedResult: number): boolean {
  if (!userInput || userInput.length === 0) return false;
  
  const expectedDigits = getExpectedDigitCount(expectedResult);
  const inputLength = userInput.length;
  
  // Valider si on a le bon nombre de chiffres
  if (inputLength === expectedDigits) {
    return true;
  }
    // Pour les nombres à plusieurs chiffres, valider de manière plus intelligente
  if (expectedDigits > 1 && inputLength < expectedDigits) {
    const inputNumber = parseInt(userInput, 10);
    const minPossibleWithNextDigit = Math.pow(10, inputLength);
    
    // Si le nombre saisi est déjà plus grand que le résultat attendu,
    // ou si même en ajoutant des chiffres on ne peut pas atteindre le résultat
    if (inputNumber > expectedResult || minPossibleWithNextDigit > expectedResult) {
      return true;
    }
  }
  
  return false;
}
