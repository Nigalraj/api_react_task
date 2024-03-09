import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import { Row, Col } from 'react-bootstrap';
import Issue from './Components/Issue';
import UserDetails from './Components/UserDetails';
import './App.css';
import Attachment from './Components/Attachment'
import LoginPage from './Components/Login';


function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    
      <>
        <Header className="bg-head"/>
        <Row className="mx-0">
          <Col lg={2} className="px-0 d-none d-lg-flex hi bg-side">
            <Sidebar onSelectUser={handleSelectUser}/>
          </Col>
          <Col lg={10} className="px-0">
            
            <Outlet/>
          </Col>
        </Row>
      </>
  
  );
}

export default App;
