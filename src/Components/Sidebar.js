import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-100 d-flex flex-column d-none d-lg-flex vh-100">
      <NavLink to="/dashboard" className={`text-decoration-none text-dark p-3  ${location.pathname === "/dashboard" ? "bg-light" : ""}`}>Dashboard</NavLink>
      <NavLink to="/issue" className={`text-decoration-none text-dark p-3  ${location.pathname === "/issue" ? "bg-light" : ""}`}>Issue</NavLink>
      <NavLink to="/attachment" className={`text-decoration-none text-dark p-3  ${location.pathname === "/attachment" ? "bg-light" : ""}`}>Attachment</NavLink>
      <NavLink to="/status" className={`text-decoration-none text-dark p-3  ${location.pathname === "/status" ? "bg-light" : ""}`}>Status</NavLink>
      <NavLink to="/review" className={`text-decoration-none text-dark p-3  ${location.pathname === "/review" ? "bg-light" : ""}`}>Review</NavLink>
      <NavLink to="/denied" className={`text-decoration-none text-dark p-3  ${location.pathname === "/denied" ? "bg-light" : ""}`}>Denied</NavLink>
      <NavLink to="/pending" className={`text-decoration-none text-dark p-3  ${location.pathname === "/pending" ? "bg-light" : ""}`}>Pending</NavLink>
    </div>
  );
}

export default Sidebar;
