import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import userLoginIcon from '../../../public/icons8-user-30.png';
import userPasswordIcon from '../../../public/icons8-password-30.png';
import logo from '../../../public/icons8-photo-gallery-100.png';
import './SignUp.css';

export default function SignUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation logic can be added here
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <Layout>
            <div className="home-content">
                <div className="home-container">
                    <div className="image-homepage" />
                    <div className="signup-homepage">
                        <form className="form-signup" onSubmit={handleSubmit}>
                            <div className="image-title-form">
                                <img src={logo} alt="gallery" />
                                <p>MY MEMORIES</p>
                            </div>
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
