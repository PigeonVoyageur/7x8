// Types pour l'application 7x8
export interface Multiplication {
  factor1: number;
  factor2: number;
  result: number;
}

export interface MultiplicationAttempt extends Multiplication {
  userAnswer?: number;
  isCorrect?: boolean;
  attempted: boolean;
  isTimeout?: boolean;
  responseTime?: number; // en millisecondes
}

export type GameState = 'selection' | 'playing' | 'results';

export interface CustomTable {
  id: string;
  value: number;
  label: string;
}

export interface GameSession {
  selectedTables: number[];
  customTables: CustomTable[];
  multiplications: MultiplicationAttempt[];
  currentIndex: number;
  state: GameState;
}

export interface GameResults {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  percentage: number;
  errors: MultiplicationAttempt[];
  averageResponseTime?: number; // en millisecondes, pour les bonnes réponses seulement
}
