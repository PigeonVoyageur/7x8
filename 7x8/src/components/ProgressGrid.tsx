import type { MultiplicationAttempt } from '../types/game';
import './ProgressGrid.css';

interface ProgressGridProps {
  multiplications: MultiplicationAttempt[];
}

export function ProgressGrid({ multiplications }: ProgressGridProps) {
  // Créer une grille organisée par tables dynamiquement basée sur les multiplications
  const getMultiplicationStatus = (table: number, factor: number): 'pending' | 'correct' | 'incorrect' | 'timeout' => {
    const multiplication = multiplications.find(m => 
      m.factor1 === table && m.factor2 === factor
    );
    
    if (!multiplication || !multiplication.attempted) return 'pending';
    if (multiplication.isTimeout) return 'timeout';
    return multiplication.isCorrect ? 'correct' : 'incorrect';
  };
  
  // Extraire dynamiquement les tables et facteurs des multiplications
  const allTables = [...new Set(multiplications.map(m => m.factor1))].sort((a, b) => a - b);
  const allFactors = [...new Set(multiplications.map(m => m.factor2))].sort((a, b) => a - b);
  
  return (
    <div className="progress-grid">
      <h3>Progression</h3>      <div className="grid-container">
        <div className="grid-header">
          <div className="corner-cell">×</div>
          {allFactors.map(factor => (
            <div key={factor} className="header-cell">{factor}</div>
          ))}
        </div>
        {allTables.map(table => (
          <div key={table} className="grid-row">
            <div className="row-header">{table}</div>
            {allFactors.map(factor => {
              const status = getMultiplicationStatus(table, factor);
              return (
                <div 
                  key={`${table}-${factor}`}
                  className={`grid-cell ${status}`}
                  title={`${table} × ${factor} = ${table * factor}`}
                >
                  {status !== 'pending' && (
                    <span className="cell-content">
                      {(() => {
                        const multiplication = multiplications.find(m => 
                          m.factor1 === table && m.factor2 === factor
                        );
                        return multiplication?.userAnswer || table * factor;
                      })()}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color pending"></div>
          <span>À faire</span>
        </div>
        <div className="legend-item">
          <div className="legend-color correct"></div>
          <span>Réussi</span>
        </div>        <div className="legend-item">
          <div className="legend-color incorrect"></div>
          <span>Raté</span>
        </div>
        <div className="legend-item">
          <div className="legend-color timeout"></div>
          <span>Temps écoulé</span>
        </div>
      </div>
    </div>
  );
}
