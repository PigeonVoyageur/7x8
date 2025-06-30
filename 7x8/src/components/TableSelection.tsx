import { useState } from 'react';
import type { CustomTable } from '../types/game';
import './TableSelection.css';

interface TableSelectionProps {
  onStartGame: (selectedTables: number[], customTables: CustomTable[]) => void;
}

export function TableSelection({ onStartGame }: TableSelectionProps) {
  const [selectedTables, setSelectedTables] = useState<number[]>([]);
  const [customTables, setCustomTables] = useState<CustomTable[]>([]);
  const [newTableValue, setNewTableValue] = useState<string>('');
  
  const tables = [2, 3, 4, 5, 6, 7, 8, 9];
  
  const toggleTable = (table: number) => {
    setSelectedTables(prev => 
      prev.includes(table) 
        ? prev.filter(t => t !== table)
        : [...prev, table]
    );
  };
    const handleStartGame = () => {
    if (selectedTables.length > 0 || customTables.length > 0) {
      onStartGame(selectedTables, customTables);
    }
  };

  const addCustomTable = () => {
    const value = parseInt(newTableValue, 10);
    if (value && value >= 1 && value <= 1000000 && customTables.length < 10) {
      const newTable: CustomTable = {
        id: `custom-${Date.now()}`,
        value,
        label: `Table de ${value}`
      };
      setCustomTables(prev => [...prev, newTable]);
      setNewTableValue('');
    }
  };

  const removeCustomTable = (id: string) => {
    setCustomTables(prev => prev.filter(table => table.id !== id));
  };
  const selectAll = () => {
    setSelectedTables(tables);
  };

  const clearAll = () => {
    setSelectedTables([]);
    setCustomTables([]);
  };
  
  return (
    <div className="table-selection">
      <div className="header">
        <h1>Tables de Multiplication 7×8</h1>
        <p>Sélectionnez les tables que vous souhaitez travailler :</p>
      </div>
        <div className="tables-grid">
        {tables.map(table => (
          <button
            key={table}
            className={`table-button ${selectedTables.includes(table) ? 'selected' : ''}`}
            onClick={() => toggleTable(table)}
          >
            Table de {table}
          </button>
        ))}
      </div>

      <div className="custom-tables-section">
        <h3>Tables personnalisées</h3>
        <div className="custom-table-input">
          <input
            type="number"
            value={newTableValue}
            onChange={(e) => setNewTableValue(e.target.value)}
            placeholder="Entrez un nombre (1-1000000)"
            min="1"
            max="1000000"
            onKeyPress={(e) => e.key === 'Enter' && addCustomTable()}
          />
          <button 
            className="add-button"
            onClick={addCustomTable}
            disabled={!newTableValue || customTables.length >= 10}
          >
            Ajouter
          </button>
        </div>
        
        {customTables.length > 0 && (
          <div className="custom-tables-list">
            {customTables.map(table => (
              <div key={table.id} className="custom-table-item">
                <span>Table de {table.value}</span>
                <button 
                  className="remove-button"
                  onClick={() => removeCustomTable(table.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        
        {customTables.length >= 10 && (
          <p className="limit-message">Limite de 10 tables personnalisées atteinte</p>
        )}
      </div>
      
      <div className="selection-controls">
        <button className="control-button" onClick={selectAll}>
          Tout sélectionner
        </button>
        <button className="control-button" onClick={clearAll}>
          Tout déselectionner
        </button>
      </div>
        <div className="start-section">
        <p className="selection-summary">
          {selectedTables.length === 0 && customTables.length === 0
            ? "Aucune table sélectionnée"
            : `${selectedTables.length + customTables.length} table${selectedTables.length + customTables.length > 1 ? 's' : ''} sélectionnée${selectedTables.length + customTables.length > 1 ? 's' : ''}`
          }
        </p>
        <button 
          className="start-button"
          onClick={handleStartGame}
          disabled={selectedTables.length === 0 && customTables.length === 0}
        >
          Commencer le jeu
        </button>
      </div>
    </div>
  );
}
