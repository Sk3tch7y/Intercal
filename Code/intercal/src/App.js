
import './/styles/styles.css';
import './/styles/app.css'
import { ProvideSharedState } from './useSharedState.js';
import React, { useState, useEffect } from 'react';
import Sidebar from './/Sidebar.jsx';
import Dashboard from './/dashboard.jsx';
import Header from './header.jsx';



function App() {

  const [watched, setWatched] = useState([]);

  return (
    <div className="App">
    <ProvideSharedState>
        <Sidebar />
        <div className ='rightSide'>
          <Header setWatched={setWatched}></Header>
          <Dashboard watched={watched} setWatched={setWatched} />
        </div>
    </ProvideSharedState>
    </div>
  );
}

export default App;