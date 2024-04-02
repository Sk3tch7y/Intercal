import React, { useState } from 'react';
import './styles/styles.css';
import Login from './login.jsx';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showLogin, setShowLogin] = useState(false); // Add this line

    const openMenu = () => {
        console.log('openMenu');
        setShowLogin(true); // Set showLogin to true when the button is clicked
    };
    const closeMenu = () => {
        setShowLogin(false); // Set showLogin to false when the button is clicked
    };

    let loggedIn = false;

    if (!loggedIn) {
        return (
            <div className='loginButt'>
            <button onClick={openMenu}>Login</button>
            {showLogin && <Login closeMenu={closeMenu} />}
            </div>
        );
    }
    else{
        return(
            <div className = 'loginButt'>
                <h1>Welcome, {username}</h1>
            </div>
        );
    }
     
}
export default UserLogin;