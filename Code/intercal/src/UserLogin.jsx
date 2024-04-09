import React, { useState, useEffect } from 'react';
import './styles/styles.css';
import Login from './login.jsx';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showLogin, setShowLogin] = useState(false); // Add this line
    const [showButton, setShowButton] = useState(true); // Add this line
    useEffect(() => {
        const usernameCookie = document.cookie.split('; ').find(row => row.startsWith('username='));
        if (usernameCookie) {
            const username = usernameCookie.split('=')[1];
            setUsername(username);
            setShowButton(false); // Set showButton to false if the cookie is found
        }
    }, []);
    const openMenu = () => {
        console.log('openMenu');
        setShowLogin(true); // Set showLogin to true when the button is clicked
    };
    const closeMenu = () => {
        setShowLogin(false); // Set showLogin to false when the button is clicked
    };

    let loggedIn = false;

    const logOut = () => {
        document.cookie = 'username=; max-age=0';
        window.location.reload();
    };

    if (!loggedIn) {
        return (
            <div className='loginButt'>
            {showButton && <button onClick={openMenu}>Login</button>}
            {!showButton && <button onClick={logOut}>{username}</button>}
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