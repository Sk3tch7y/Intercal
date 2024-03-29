
import './/styles/styles.css';
import './/styles/app.css'
import Sidebar from './/Sidebar.jsx';
import Dashboard from './/dashboard.jsx';
import Header from './header.jsx';
import GraphWrapper from './GraphWrapper.jsx';


function App() {

  return (
    <div className="App">
      <Sidebar></Sidebar>
      <div className ='rightSide'>
        <Header></Header>
        <Dashboard></Dashboard>
      </div>
      
    </div>
  );
}


export default App;
