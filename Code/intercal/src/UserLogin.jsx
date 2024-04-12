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
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
        window.location.reload();
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