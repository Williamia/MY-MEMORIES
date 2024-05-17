import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Layout from "../../components/Layout/Layout";
import userLoginIcon from '../../../public/icons8-user-30.png';
import userPasswordIcon from '../../../public/icons8-password-30.png';
import logo from '../../../public/icons8-photo-gallery-100.png';
import './SignIn.css';

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

      
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
         
                navigate('/home');
            } else {
                setError(data.message || 'Failed to login');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred. Please try again.');
        }
        
        setUsername('');
        setPassword('');
    };

    return (
        <Layout>
            <div className="home-content">
                <div className="home-container">
                    <div className="image-homepage" />
                    <div className="login-homepage">
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="image-title-form">
                                <img src={logo} alt="gallery" />
                                <p>MY MEMORIES</p>
                            </div>
                            <div className="div-label username">
                                <label htmlFor="username"><img src={userLoginIcon} alt="User Login" />Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Login"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            <div className="div-label password">
                                <label htmlFor="password"><img src={userPasswordIcon} alt="User Password" />Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="********"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            {error && <p className="error">{error}</p>}
                            <button type="submit">Sign in</button>
                            <Link className="button-link-signup" to="/signup">
                                <button type="button">Sign Up</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
