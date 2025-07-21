import './Login.css';
import Card from '../../components/form/Card';
import Input from '../../components/inputs/Input';
import Button from '../../components/buttons/Button';
import { useState } from 'react';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');   

  return (
        <Card> 
            <form>
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
            <Button text='Login' type="submit" />
            </form>
        </Card>
  );
}  

export default Login;