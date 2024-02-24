import { NavLink, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, AccordionButton, AccordionCollapse } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Sidebar({ onSelectUser }) {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [isAccordionOpen, setIsAccordionOpen] = useState("");

  const toggleAccordion = (title) => {
    setIsAccordionOpen(title);
  };
  
  useEffect(() => {
    axios
      .get("https://gorest.co.in/public/v2/users?page=1&per_page=100", {
        headers: {
          Authorization: `Bearer 7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleUserSelection = (user) => {
    onSelectUser(user);
    navigate(`/UserDetails/${user.id}`);
  };

  return (
    <div className=" d-flex flex-column  vh-100 w-100">
      <NavLink
        to="/Search"
        className={`text-decoration-none text-dark p-3  ${isAccordionOpen === "search" ? 'open':'close'}`}
        onClick={() => toggleAccordion("search")}
      >
        Search
      </NavLink>
      <Accordion>
      <Accordion.Item eventKey="0" className="border-0 rounded-0">
      <AccordionButton
        as="div"
        className={`custom-accordion-button ${isAccordionOpen === "Id" ? 'open' : 'close'}`}
        onClick={() => toggleAccordion("Id")}
      >
        Id
      </AccordionButton>
      <AccordionCollapse eventKey="0">
        <Accordion.Body className="overflow-auto">
          <div className="user-list-container">
            <ul className="list-group">
              {users.map((user) => (
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
        Name
      </AccordionButton>
          <Accordion.Body className="overflow-auto">
            <div className="user-list-container">
              <ul className="list-group">
                {users.map((user) => (
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
        Email
      </AccordionButton>
          <Accordion.Body className="overflow-auto">
            <div className="user-list-container">
              <ul className="list-group">
                {users.map((user) => (
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
