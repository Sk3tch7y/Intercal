
import './/styles/styles.css';
import './/styles/app.css'
import React, { useState } from 'react';
import Sidebar from './/Sidebar.jsx';
import Dashboard from './/dashboard.jsx';
import Header from './header.jsx';
function App() {
  const [watched, setWatched] = useState([]);

  return (
    <div className="App">
      <Sidebar />
      <div className ='rightSide'>
        <Header setWatched={setWatched}></Header>
        <Dashboard watched={watched} setWatched={setWatched} />
      </div>
    </div>
  );
}

export default App;