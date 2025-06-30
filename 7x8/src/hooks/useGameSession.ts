import { useState, useCallback } from 'react';
import type { GameSession, MultiplicationAttempt, GameResults, CustomTable } from '../types/game';
import { generateMultiplications, isAnswerCorrect, calculateResults, calculateTimeLimit } from '../utils/gameLogic';

export function useGameSession() {
  const [gameSession, setGameSession] = useState<GameSession>({
    selectedTables: [],
    customTables: [],
    multiplications: [],
    currentIndex: 0,
    state: 'selection'
  });

  const startGame = useCallback((selectedTables: number[], customTables: CustomTable[] = []) => {
    const multiplications = generateMultiplications(selectedTables, customTables);
    setGameSession({
      selectedTables,
      customTables,
      multiplications,
      currentIndex: 0,
      state: 'playing'
    });
  }, []);const submitAnswer = useCallback((userAnswer: number, responseTime?: number) => {
    setGameSession(prev => {
      const updatedMultiplications = [...prev.multiplications];
      const currentMultiplication = updatedMultiplications[prev.currentIndex];
      
      if (currentMultiplication) {        // -1 indique que le temps est écoulé
        if (userAnswer === -1) {
          currentMultiplication.userAnswer = undefined;
          currentMultiplication.isCorrect = false;
          currentMultiplication.isTimeout = true;
          currentMultiplication.responseTime = calculateTimeLimit(currentMultiplication.result) * 1000; // Temps complet en ms
        } else {
          currentMultiplication.userAnswer = userAnswer;
          currentMultiplication.isCorrect = isAnswerCorrect(currentMultiplication, userAnswer);
          currentMultiplication.isTimeout = false;
          currentMultiplication.responseTime = responseTime;
        }
        currentMultiplication.attempted = true;
      }

      const nextIndex = prev.currentIndex + 1;
      const isGameComplete = nextIndex >= prev.multiplications.length;

      return {
        ...prev,
        multiplications: updatedMultiplications,
        currentIndex: nextIndex,
        state: isGameComplete ? 'results' : 'playing'
      };
    });
  }, []);
  const resetGame = useCallback(() => {
    setGameSession({
      selectedTables: [],
      customTables: [],
      multiplications: [],
      currentIndex: 0,
      state: 'selection'
    });
  }, []);

  const getCurrentMultiplication = useCallback((): MultiplicationAttempt | null => {
    if (gameSession.state !== 'playing' || gameSession.currentIndex >= gameSession.multiplications.length) {
      return null;
    }
    return gameSession.multiplications[gameSession.currentIndex];
  }, [gameSession]);

  const getResults = useCallback((): GameResults => {
    return calculateResults(gameSession.multiplications);
  }, [gameSession.multiplications]);

  return {
    gameSession,
    startGame,
    submitAnswer,
    resetGame,
    getCurrentMultiplication,
    getResults
  };
}
