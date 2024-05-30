import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import userLoginIcon from '../../../public/icons8-user-30.png';
import userPasswordIcon from '../../../public/icons8-password-30.png';
import logo from '../../../public/image-logo.png';
import approved from '../../../public/icons8-success-48.png';
import failed from '../../../public/icons8-cancel-48.png';
import './SignUp.css';

export default function SignUp() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

    
        setError('');
        setSuccess('');


        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setSuccess('User registered successfully!');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Layout>
            <div className="home-content">
                <div className="home-container">
                    <div className="image-homepage" />
                    <div className="signup-homepage">
                        <form className="form-signup" onSubmit={handleSubmit}>
                            <div className="image-title-form signup">
                                <img src={logo} alt="gallery" />
                            </div>
                            {error && <div className="notice error"> <img src={failed} alt="error" /> <p>{error}</p> </div>}
                            {success && <div className="notice success"> <img src={approved} alt="success" /> <p>{success}</p> </div>}
                            <div className="div-label username-signup">
                                <label htmlFor="username"><img src={userLoginIcon} alt="User Login" />Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            <div className="div-label password-signup">
                                <label htmlFor="password"><img src={userPasswordIcon} alt="User Password" />Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="********"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className="div-label confirm-password">
                                <label htmlFor="confirm-password"><img src={userPasswordIcon} alt="Confirm Password" />Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="********"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
