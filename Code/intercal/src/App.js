
import './/styles/styles.css';
import './/styles/app.css'
import Sidebar from './/Sidebar.jsx';
import Dashboard from './/dashboard.jsx';
<<<<<<< Updated upstream
=======
import SearchBar from './SearchBar.jsx';
>>>>>>> Stashed changes

function App() {

  return (
    <div className="App">
      <Sidebar></Sidebar>
<<<<<<< Updated upstream
      <Dashboard></Dashboard>
=======
      <div className ='rightSide'>
        <SearchBar></SearchBar>
        <Dashboard></Dashboard>
      </div>
      
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
