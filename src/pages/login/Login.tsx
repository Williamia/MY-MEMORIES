import './Login.css';
import logo from '../../assets/imgs/Cute_Elegant_Black_Video_Cinematography_Business_Logo__1_-removebg-preview.png';
import Card from '../../components/form/Card';
import Input from '../../components/inputs/Input';
import Button from '../../components/buttons/Button';
import { loginUser } from '../../services/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   
    const navigate = useNavigate();
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        try {
            const response = await loginUser(email, password);
            console.log('Login successful:', response);
            navigate('/register'); 
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
            console.error('Login error:', err);
        }
    }

  return (
        <Card image={logo}> 
            <form className='login-form' onSubmit={handleSubmit}>
                <div className="inputs-position">
            <Input 
                label="Email" 
                name="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
            />
            <Input 
                label="Password" 
                name="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
            />
                </div>
            <Button text='SIGN IN' type="submit" />   
            </form>
        </Card>
  );
}  

export default Login;