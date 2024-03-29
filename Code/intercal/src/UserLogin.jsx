import React, { useState } from 'react';
import './styles/styles.css';
const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const openMenu = () =>{
       
    };
    
    let loggedIn = false;
    
    if(!loggedIn){
        return(
            <div className = 'loginButt'>
                <button onClick={openMenu()}>Login</button>
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