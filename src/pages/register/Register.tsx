import './Register.css';
import logo from '../../assets/imgs/Cute_Elegant_Black_Video_Cinematography_Business_Logo__1_-removebg-preview.png';
import Card from '../../components/form/Card';
import Input from '../../components/inputs/Input';
import Button from '../../components/buttons/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth';

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(error);

    try {
      const response = await registerUser(name, email, password);
      console.log('User registered:', response);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      console.error('Registration error:', err);
    }
  }

  function handleGoToLogin() {
    navigate('/');
  }

  return (
    <Card image={logo}>
      <form className='register-form' onSubmit={handleSubmit}>
        <div className="inputs-position">
          <Input 
            label="Name" 
            name="name" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name" 
          />
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
        <Button text="REGISTER" type="submit" />
        <Button text="SIGN IN" type="button" onClick={handleGoToLogin} />
      </form>
    </Card>
  );
}

export default Register;
