import React ,{useState,useContext} from 'react';
import '../static/Login.css';
import { API_BASE_URL } from '../configurations/config';
import {Link,useNavigate} from "react-router-dom"
import { UserContext } from '../UserContext';

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_uid : email,password : password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('user', JSON.stringify(data));
        // Handle successful login, e.g., redirect or save token
        //window.location.reload()
        login(data);
        navigate('/');
        
      } else if (response.status === 401) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Failed to connect to server. Please try again later.');
    }
  };

  return (
    <div className="login-body">
      <div className="container">
        <img src="/logo.png" className="logo" alt="PlanSmart Logo" />
        <h1>PLANSMART</h1>
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-Mail</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="abc@gmail.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="********" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button type="submit" className="login-btn">
            Login
          </button>
          
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>

        {/* <div className="divider">OR</div> */}
        
        {/* <div className="social-login">
          <img src="/Google.png" alt="Google Login" />
          <img src="/Facebook.png" alt="Facebook Login" />
        </div> */}
        
        <div className="signup-text">
          Don&apos;t have an account?<Link to="/signup"> <a>Sign Up</a></Link>
        </div>
      </div>
    </div>
  );
};


export default Login;