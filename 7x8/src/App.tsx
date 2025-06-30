import { useGameSession } from './hooks/useGameSession';
import { TableSelection } from './components/TableSelection';
import { GamePlay } from './components/GamePlay';
import { GameResults } from './components/GameResults';
import './App.css';

function App() {
  const {
    gameSession,
    startGame,
    submitAnswer,
    resetGame,
    getCurrentMultiplication,
    getResults
  } = useGameSession();

  const renderCurrentScreen = () => {
    switch (gameSession.state) {
      case 'selection':
        return <TableSelection onStartGame={startGame} />;
      
      case 'playing':
        const currentMultiplication = getCurrentMultiplication();
        if (!currentMultiplication) return null;
        
        return (
          <GamePlay
            currentMultiplication={currentMultiplication}
            allMultiplications={gameSession.multiplications}
            currentIndex={gameSession.currentIndex}
            totalQuestions={gameSession.multiplications.length}
            onSubmitAnswer={submitAnswer}
          />
        );
      
      case 'results':
        return (
          <GameResults
            results={getResults()}
            onRestart={resetGame}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;
