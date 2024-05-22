import React, { useState } from 'react';
import './App.css';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function App() {
  const [outputString, setOutputString] = useState('');

  const handleTileClick = (letter) => {
    let newOutputString = outputString + letter;
    
    // Check for consecutive letters and replace them with underscores
    newOutputString = newOutputString.replace(/(.)\1{2,}/g, match => '_'.repeat(match.length / 3));

    setOutputString(newOutputString);
  };

  return (
    <div className="App">
    
      <div className="grid">
        {alphabet.map(letter => (
          <div key={letter} className="tile" onClick={() => handleTileClick(letter)}>
            {letter}
          </div>
        ))}
      </div>
      <div id="outputString">{outputString}</div> 
    </div>

  );
}

export default App;
