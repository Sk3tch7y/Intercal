import SearchBar from './SearchBar.jsx';
import UserLogin from './UserLogin.jsx';
import './styles/styles.css';
import './styles/header.css';

export default function Header(){
    return(
        <div className = 'header'>
            <SearchBar></SearchBar>
            <UserLogin></UserLogin>
        </div> 
    );
}