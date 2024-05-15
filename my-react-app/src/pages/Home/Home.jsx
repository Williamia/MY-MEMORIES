import React, { useState } from "react"
import Layout from "../../components/Layout/Layout"
import userLoginIcon from '../../../public/icons8-user-30.png'
import userPasswordIcon from '../../../public/icons8-password-30.png'
import logo from '../../../public/icons8-photo-gallery-100.png'
import './Home.css'

export default function Home() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Username:', username);
        console.log('Password:', password);

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
                                <img src={logo} alt="galery"/>
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
                            <button type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}