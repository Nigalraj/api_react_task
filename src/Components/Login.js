
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; 
import Header from './Header';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
const LoginPage = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    
  
   const handleLogin = async () => {
    try {
      
      const response = await axios.post(' https://53da-2405-201-e059-b805-6dd6-a3fe-125d-950.ngrok-free.app/api/v1/login', {
        email: email,
        password: password,
      },{
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzLCJlbWFpbCI6IlRlc3RqQGdtYWlsLmNvbSIsImlhdCI6MTcwOTg3NzUyNiwiZXhwIjoxNzA5ODc5MzI2fQ.rRSHlNSPEYQ-2Gm2-InIsK_W3nP023JVOghfGWbz01M',
          'Content-Type': 'application/json',
        },
      });


      if (response.status === 200) {
        onLogin(response.data.token)
        setLoggedIn(true);
        navigate('/Home/dashboard');
      } else {
        
        alert('Invalid credentials');
      }
    } catch (error) {
     
      console.error('Error during login:', error);
      alert('Error during login. Please try again.');
    }
  };
  
    const handleLogout = () => {
      setLoggedIn(false);
      setEmail(''); 
      setPassword('');
    };
  
    return (
      <>
        <Header />
        <div className='d-flex justify-content-center'>
          <div className='card m-5 p-5'>
            {loggedIn ? (
              <div>
                <h2>Welcome, {email}!</h2>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <h2>Login</h2>
                <Form>
                  <Form.Group controlId="formBasicEmail"> 
                    <Form.Label>Email:</Form.Label> 
                    <Form.Control
                      type="email"
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleLogin} className='mt-3'>
                    Login
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };


  export default LoginPage;


  