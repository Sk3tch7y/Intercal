
import './/styles/styles.css';
import './/styles/app.css'
import React, { useState } from 'react';
import Sidebar from './/Sidebar.jsx';
import Dashboard from './/dashboard.jsx';
import SearchBar from './SearchBar.jsx';
import GraphWrapper from './GraphWrapper.jsx';


function App() {
  const [watched, setWatched] = useState([]);

  return (
    <div className="App">
      <Sidebar />
      <div className ='rightSide'>
        <SearchBar setWatched={setWatched} />
        <Dashboard watched={watched} setWatched={setWatched} />
      </div>
    </div>
  );
}

export default App;