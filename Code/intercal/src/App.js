
import './/styles/styles.css';
import './/styles/app.css'
import Sidebar from './/Sidebar.jsx';
import Dashboard from './/dashboard.jsx';
import SearchBar from './SearchBar.jsx';
import GraphWrapper from './GraphWrapper.jsx';

function App() {

  return (
    <div className="App">
      <Sidebar></Sidebar>
      <div className ='rightSide'>
        <SearchBar></SearchBar>
        <Dashboard></Dashboard>
      </div>
      
    </div>
  );
}


export default App;
