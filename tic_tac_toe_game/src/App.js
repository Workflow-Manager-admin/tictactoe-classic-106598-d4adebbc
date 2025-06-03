import React from 'react';
import './App.css';
import TicTacToeMain from './TicTacToeMain';

/**
 * App entry - hosts the TicTacToe Classic main container.
 */
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" tabIndex={-1} style={{ opacity: 0.35, pointerEvents: "none" }}>
              Template Button
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "80vh" }}>
          <TicTacToeMain />
        </div>
      </main>
    </div>
  );
}

export default App;