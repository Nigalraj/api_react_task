
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; 
import Header from './Header';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../redux/actions/LoginAction';


const LoginPage = ({setIsSigned}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const data = useSelector((state)=>state.Loginstore.LoginModel)
    
  console.log(data,"gfhj");
   const handleLogin = async () => {
    try {
      let payload ={email: email,
           password: password}
      dispatch(LoginAction(payload))
      
      // const response = await axios.post('https://6da5-2405-201-e059-b805-e5d0-6c8c-c766-33be.ngrok-free.app/api/v1/login', {
      //   email: email,
      //   password: password,
      // });
      // if (response.status === 200) {
       
      //   const token =localStorage.setItem('accesstoken',response.data.token);
      //   console.log(response.data.token,"v");
      //   setIsSigned(true);
      //   navigate('/Home/dashboard');
      // } else {
        
      //   alert('Invalid credentials');
      // }
    } catch (error) {
     
      console.error('Error during login:', error);
      alert('Error during login. Please try again.');
    }
  };
  
  useEffect(()=>{
    if(data && data.data){
      if(data.data.status===200)
      {
       setIsSigned(true);
       navigate('/Home/dashboard');
      }
      else {
         alert('Invalid credentials');
       }
    }
     
  },[data])
    const handleLogout = () => {

      setEmail(''); 
      setPassword('');
    };
  
    return (
      <>
        <Header />
        <div className='d-flex justify-content-center'>
          <div className='card m-5 p-5'>
            
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
          
          </div>
        </div>
      </>
    );
  };


  export default LoginPage;


  