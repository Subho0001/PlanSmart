import React, { useState } from 'react';
import { API_BASE_URL } from '../configurations/config';
import '../static/Signup.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  //const [userUid, setUserUid] = useState('');  // Assuming `user_uid` is provided or generated elsewhere
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [cityTown, setCityTown] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Clear any previous error message if passwords match
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_uid: email,
          first_name: firstName,
          last_name: lastName,
          password:password,
          address:address,
          city_town: cityTown,
          state:state,
          pincode:pincode,
        }),
      });

      if (response.status === 201) {  // Assuming 201 status for successful registration
        const data = await response.json();
        console.log('Registration successful:', data);
        setSuccessMessage('Registration successful! You can now log in.');

        // Clear the form
        //setUserUid('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAddress('');
        setCityTown('');
        setState('');
        setPincode('');
      } else if (response.status === 400) {
        setErrorMessage('Registration failed. Please check your details and try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Failed to connect to server. Please try again later.');
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <img src="./logo.png" className="logo" alt="PlanSmart Logo" />
        <h1>Sign Up</h1>
        
        <form onSubmit={handleSubmit}>
          {/* <div className="form-group">
            <label htmlFor="userUid">User ID</label>
            <input 
              type="text" 
              id="userUid" 
              name="userUid" 
              value={userUid}
              onChange={(e) => setUserUid(e.target.value)}
              required 
            />
          </div> */}

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="cityTown">City/Town</label>
            <input 
              type="text" 
              id="cityTown" 
              name="cityTown" 
              value={cityTown}
              onChange={(e) => setCityTown(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input 
              type="text" 
              id="state" 
              name="state" 
              value={state}
              onChange={(e) => setState(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input 
              type="text" 
              id="pincode" 
              name="pincode" 
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* <div className="social-login">
          <img src="./Google.png" alt="Sign up with Google" />
          <img src="./Facebook.png" alt="Sign up with Facebook" />
        </div> */}

        <div className="login-link">
          Already have an account? <Link to="/login"><a>Login</a></Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
