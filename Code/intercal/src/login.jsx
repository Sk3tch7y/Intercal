import React, { useState } from 'react';
import './styles/styles.css';
import './styles/login.css';
import UserLogin from './UserLogin.jsx';
const Login = ({closeMenu}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // New state variable

    //added this comment because I couldnt commit the casesensitive name change without it
    const toggleSignUp = (e) => {
        e.preventDefault();
        setIsSignUp(!isSignUp);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            }).then((response) => response.json()).then((data) => {
                if(data.isValid){
                    console.log('Login successful');
                    document.cookie = `username=${username}; max-age=${7 * 24 * 60 * 60}`;
                    //trigger page refresh
                    window.location.reload();

                } else {
                    setError('Invalid username or password');
                }
            });
        }catch (error) {
            console.error('Error occurred during login:', error);
            setError('An error occurred during login');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            if(password !== confirmPassword){
                setError('Passwords do not match');
                return;
            }
            
            const response = await fetch('http://localhost:8080/createAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            }); 
    
            if (response.ok) {
                const data = await response.json();
                if(data.status !== 'Success'){
                    setError('Username already exists');
                    return;
                }
                console.log('Sign up successful');
                handleLogin(e);
                //TODO: set loggedIn to true and create login cookie
            } else {
                setError('An error occurred during sign up');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const formFormer = () => {
        if(!isSignUp){
            return(
            <div className = 'loginForm'>
                <button className = 'close' onClick={closeMenu}>Close</button>
                <form action=''>
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
                    <button onClick={toggleSignUp}>Sign Up</button>
                </form>     
            </div>
            );
        } 
        else {
            return(
            <div className = 'loginForm'>
                <button className = 'close' onClick={closeMenu}>Close</button>
                <form action='http://localhost:8081/createAccount' method='get'>
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
                    <input 
                        type="password" 
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={handleSignUp}>Lets Go!</button>
                    <button onClick={toggleSignUp}>Sign in</button>
                </form>     
            </div>
            );
        }
    }
    return (
        formFormer()
    );
};
export default Login;
