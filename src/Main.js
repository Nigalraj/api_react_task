import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import React, { useEffect, useState, useSelector } from 'react';
import UserDetails from "./Components/UserDetails";
import Issue from "./Components/Issue";
import Attachment from "./Components/Attachment";
import LoginPage from "./Components/Login";
import PrivateRoute from "./Router/PrivateRoute";
import { composeWithDevTools } from 'redux-devtools-extension';



function Main() {
   const access = localStorage.getItem("accesstoken")
   
  const [isSignedIn,setIsSignedIn] = useState(access !==null);
  useEffect(()=>{localStorage.removeItem("accesstoken")},[]);
  
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage setIsSigned={setIsSignedIn}/>} />
        <Route path="/Home" element={<PrivateRoute isSignedIn={isSignedIn} ><App/></PrivateRoute>} >
          <Route path="/Home/UserDetails/:userId" element={<PrivateRoute isSignedIn={isSignedIn}><UserDetails /></PrivateRoute>} />
          <Route path="/Home/dashboard" element={<PrivateRoute isSignedIn={isSignedIn}><Issue /></PrivateRoute>} />
          <Route path="*" element={<Attachment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Main;
