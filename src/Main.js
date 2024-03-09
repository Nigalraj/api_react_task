import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import React, { useState } from 'react';
import UserDetails from "./Components/UserDetails";
import Issue from "./Components/Issue";
import Attachment from "./Components/Attachment";
import LoginPage from "./Components/Login";
import PrivateRoute from "./Router/PrivateRoute";

function Main() {

  const [token, setToken] = useState(null);

  const handleLogin = (userToken) => {
    setToken(userToken);
    
  };
// isAuthenticated={token !== null}

  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage onLogin={handleLogin}/>} />
        <Route path="/Home" element={<App />} >
          <Route path="/Home/UserDetails/:userId" element={<UserDetails />} />
          <Route path="/Home/dashboard" element={<Issue />} />
          <Route path="*" element={<Attachment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Main;
