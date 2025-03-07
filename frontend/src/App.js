import React from 'react';
import './App.css';
import GeneSearch from './components/GeneSearch';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Gene Expression Search</h1>
      </header>
      <main>
        <GeneSearch />
      </main>
    </div>
  );
}

export default App; 
