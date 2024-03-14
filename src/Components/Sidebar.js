import { NavLink} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, AccordionButton, AccordionCollapse } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import {headers, user} from '../utils/data'
import ApiServices from "../Constants/ApiServices";

function Sidebar({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isAccordionOpen, setIsAccordionOpen] = useState("search");

  const toggleAccordion = (title) => {
    fetch();
    setIsAccordionOpen(title);
  };
  
const fetch = () =>{
 ApiServices.getIdData()
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
}

  useEffect(() => {
    fetch();
  }, []);

  const handleUserSelection = (user) => {
    onSelectUser(user);
    navigate(`/Home/UserDetails/${user.id}`);
  };

  return (
    <div className=" d-flex flex-column  vh-100 w-100">
      <NavLink
        to="/Home/dashboard"
        className={`text-decoration-none  p-3  ${isAccordionOpen === "search" ? 'open':'close'}`}
        onClick={() => toggleAccordion("search")}
      >
        {user.dashboard}
      </NavLink>
      <Accordion>
      <Accordion.Item eventKey="0" className="border-0 rounded-0">
      <AccordionButton
        as="div"
        className={`custom-accordion-button ${isAccordionOpen === "Id" ? 'open' : 'close'}`}
        onClick={() => toggleAccordion("Id")}
      >
       {user.id}
      </AccordionButton>
      <AccordionCollapse eventKey="0">
        <Accordion.Body className="overflow-auto">
          <div className="user-list-container">
            <ul className="list-group">
              {users?.map((user) => (
                <li key={user.id} className="list-group-item overflow-auto">
                  <div className="form-check">
                    <input
                      type="radio"
                      name="user"
                      id={`user-${user.id}`}
                      className="form-check-input"
                      onChange={() => handleUserSelection(user)}
                    />
                    <label htmlFor={`user-${user.id}`} className="form-check-label">
                      {user.id}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Accordion.Body>
      </AccordionCollapse>
    </Accordion.Item>
        <Accordion.Item eventKey="1" className="border-0 rounded-0">
        <AccordionButton
        as="div"
        className={`custom-accordion-button ${isAccordionOpen === "Name" ? 'open' : 'close'}`}
        onClick={ () =>toggleAccordion("Name")}
      >
        {user?.name}
      </AccordionButton>
          <Accordion.Body className="overflow-auto">
            <div className="user-list-container">
              <ul className="list-group">
                {users?.map((user) => (
                  <li key={user.id} className="list-group-item">
                    <div className="form-check">
                      <input
                        type="radio"
                        name="user"
                        id={`user-${user.id}`}
                        className="form-check-input"
                        onChange={() => handleUserSelection(user)}
                      />
                      <label
                        htmlFor={`user-${user.id}`}
                        className="form-check-label"
                      >
                        {user.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className="border-0 rounded-0">
        <AccordionButton
        as="div"
        className={`custom-accordion-button ${isAccordionOpen === "Email" ? 'open' : 'close'}`}
        onClick={ () =>toggleAccordion("Email")}
      >
        {user.email}
      </AccordionButton>
          <Accordion.Body className="overflow-auto">
            <div className="user-list-container">
              <ul className="list-group">
                {users?.map((user) => (
                  <li key={user.id} className="list-group-item overflow-auto">
                    <div className="form-check">
                      <input
                        type="radio"
                        name="user"
                        id={`user-${user.id}`}
                        className="form-check-input"
                        onChange={() => handleUserSelection(user)}
                      />
                      <label
                        htmlFor={`user-${user.id}`}
                        className="form-check-label"
                      >
                        {user.email}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Sidebar;
