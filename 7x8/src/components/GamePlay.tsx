import { useState, useEffect, useRef } from 'react';
import type { MultiplicationAttempt } from '../types/game';
import { shouldValidateAnswer, calculateTimeLimit } from '../utils/gameLogic';
import { ProgressGrid } from './ProgressGrid';
import './GamePlay.css';

interface GamePlayProps {
  currentMultiplication: MultiplicationAttempt;
  allMultiplications: MultiplicationAttempt[];
  currentIndex: number;
  totalQuestions: number;
  onSubmitAnswer: (answer: number, responseTime?: number) => void;
}

export function GamePlay({ 
  currentMultiplication, 
  allMultiplications,
  currentIndex,
  totalQuestions,
  onSubmitAnswer 
}: GamePlayProps) {
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [initialTime, setInitialTime] = useState(5);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);  useEffect(() => {
    const timeLimit = calculateTimeLimit(currentMultiplication.result);
    setUserInput('');
    setIsAnswered(false);
    setShowFeedback(false);
    setTimeLeft(timeLimit);
    setInitialTime(timeLimit);
    setIsTimeUp(false);
    setStartTime(Date.now()); // Enregistrer le temps de début
    
    // Focus automatique sur l'input à chaque nouvelle question
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    // Démarrer le timer avec le temps calculé
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimeUp(true);
          setIsAnswered(true);
          setShowFeedback(true);
          // Temps écoulé, considérer comme une réponse incorrecte
          setTimeout(() => {
            onSubmitAnswer(-1); // -1 indique que le temps est écoulé
          }, 800); // Transition plus rapide pour timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Nettoyer le timer quand on quitte le composant
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentMultiplication, onSubmitAnswer]);useEffect(() => {
    if (userInput && !isAnswered && !isTimeUp && shouldValidateAnswer(userInput, currentMultiplication.result)) {
      const answer = parseInt(userInput, 10);
      const responseTime = Date.now() - startTime;
      setIsAnswered(true);
      setShowFeedback(true);
      
      // Arrêter le timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Transition plus rapide vers la question suivante
      setTimeout(() => {
        onSubmitAnswer(answer, responseTime);
      }, 800);
    }
  }, [userInput, currentMultiplication.result, onSubmitAnswer, isAnswered, isTimeUp, startTime]);  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAnswered || isTimeUp) return;
    
    const value = e.target.value;
    // Permettre seulement les chiffres, sans limite de longueur
    if (/^\d*$/.test(value)) {
      setUserInput(value);
    }
  };

  const isCorrect = isAnswered && !isTimeUp && parseInt(userInput, 10) === currentMultiplication.result;

  return (
    <div className="game-play">      <div className="game-header">
        <h2>Tables de Multiplication</h2>
        <div className="header-info">
          <div className="progress-indicator">
            Question {currentIndex + 1} sur {totalQuestions}
          </div>          <div className={`timer ${timeLeft <= Math.max(2, initialTime * 0.3) ? 'urgent' : ''}`}>
            ⏱️ {timeLeft}s
          </div>
        </div>
      </div>

      <div className="game-content">
        <div className="question-section">
          <div className="multiplication-display">
            <div className="equation">
              <span className="factor">{currentMultiplication.factor1}</span>
              <span className="operator">×</span>
              <span className="factor">{currentMultiplication.factor2}</span>
              <span className="equals">=</span>
              <div className="answer-container">                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}                  className={`answer-input ${isAnswered ? (isCorrect ? 'correct' : 'incorrect') : ''} ${isTimeUp ? 'timeout' : ''}`}
                  placeholder="?"
                  disabled={isAnswered || isTimeUp}
                />
                {showFeedback && (
                  <div className={`feedback ${isTimeUp ? 'timeout' : (isCorrect ? 'correct' : 'incorrect')}`}>
                    {isTimeUp ? `⏰ ${currentMultiplication.result}` : (isCorrect ? '✓' : `✗ ${currentMultiplication.result}`)}
                  </div>
                )}
              </div>
            </div>
          </div>          <div className="question-info">
            <p>Tapez votre réponse. Temps alloué : {initialTime} secondes !</p>
          </div>
        </div>        <div className="progress-section">
          <ProgressGrid 
            multiplications={allMultiplications}
          />
        </div>
      </div>
    </div>
  );
}
