import type { GameResults } from '../types/game';
import './GameResults.css';

interface GameResultsProps {
  results: GameResults;
  onRestart: () => void;
}

export function GameResults({ results, onRestart }: GameResultsProps) {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'excellent';
    if (percentage >= 70) return 'good';
    if (percentage >= 50) return 'average';
    return 'needs-improvement';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent travail ! 🎉';
    if (percentage >= 70) return 'Bon travail ! 👍';
    if (percentage >= 50) return 'C\'est un bon début ! 💪';
    return 'Continue à t\'entraîner ! 📚';
  };

  const formatTime = (timeMs: number) => {
    return `${(timeMs / 1000).toFixed(1)}s`;
  };

  const timeoutErrors = results.errors.filter(e => e.isTimeout);
  const incorrectErrors = results.errors.filter(e => !e.isTimeout);

  return (
    <div className="game-results">
      <div className="results-header">
        <h1>Résultats</h1>
        <div className={`score-display ${getScoreColor(results.percentage)}`}>
          <div className="percentage">{results.percentage}%</div>
          <div className="score-details">
            {results.correctAnswers} / {results.totalQuestions} correct
          </div>
        </div>
        <p className="score-message">{getScoreMessage(results.percentage)}</p>
      </div>

      <div className="results-summary">
        <div className="summary-cards">
          <div className="summary-card correct">
            <div className="card-icon">✓</div>
            <div className="card-value">{results.correctAnswers}</div>
            <div className="card-label">Réussies</div>
          </div>
          
          <div className="summary-card incorrect">
            <div className="card-icon">✗</div>
            <div className="card-value">{incorrectErrors.length}</div>
            <div className="card-label">Ratées</div>
          </div>

          <div className="summary-card timeout">
            <div className="card-icon">⏰</div>
            <div className="card-value">{timeoutErrors.length}</div>
            <div className="card-label">Temps écoulé</div>
          </div>
          
          <div className="summary-card total">
            <div className="card-icon">∑</div>
            <div className="card-value">{results.totalQuestions}</div>
            <div className="card-label">Total</div>
          </div>

          {results.averageResponseTime && (
            <div className="summary-card time">
              <div className="card-icon">⏱️</div>
              <div className="card-value">{formatTime(results.averageResponseTime)}</div>
              <div className="card-label">Temps moyen</div>
            </div>
          )}
        </div>
      </div>      {results.errors.length > 0 && (
        <div className="errors-section">
          <h3>Révisions recommandées :</h3>
          <div className="errors-container">
            {incorrectErrors.length > 0 && (
              <div className="error-category">
                <h4>❌ Réponses incorrectes</h4>
                <div className="errors-grid">
                  {incorrectErrors.map((error, index) => (
                    <div key={index} className="error-item incorrect">
                      <div className="error-equation">
                        {error.factor1} × {error.factor2} = 
                        <span className="user-answer">{error.userAnswer}</span>
                      </div>
                      <div className="correct-answer">
                        ✓ <strong>{error.result}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {timeoutErrors.length > 0 && (
              <div className="error-category">
                <h4>⏰ Temps écoulé</h4>
                <div className="errors-grid">
                  {timeoutErrors.map((error, index) => (
                    <div key={index} className="error-item timeout">
                      <div className="error-equation">
                        {error.factor1} × {error.factor2} = 
                        <span className="timeout-label">⏰</span>
                      </div>
                      <div className="correct-answer">
                        ✓ <strong>{error.result}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="actions">
        <button className="restart-button" onClick={onRestart}>
          Recommencer
        </button>
      </div>
    </div>
  );
}
