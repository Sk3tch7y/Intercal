import React, { useState } from 'react';
import './styles/styles.css';
import './styles/login.css';
import UserLogin from './UserLogin.jsx';
const Login = ({closeMenu}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    

    const handleLogin = async () => {
        try {
            const response = await fetch('url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                console.log('Login successful');
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
            setError('An error occurred during login');
        }
    };

    return (
        <div className = 'loginForm'>
            <button className = 'close' onClick={closeMenu}>Close</button>
            <form>
                <h1>Login</h1>
                {error && <p>{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Lets Go!</button>
            </form>     
        </div>
    );
};

export default Login;