import SearchBar from './SearchBar.jsx';
import UserLogin from './UserLogin.jsx';
import app from './App.js'
import './styles/styles.css';
import './styles/header.css';

const header = ({setWatched}) => {
return(
        <div className = 'header'>
            <SearchBar setWatched={setWatched}></SearchBar>
            <UserLogin></UserLogin>
        </div> 
    );
}
export default header;