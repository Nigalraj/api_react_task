import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../Asset/images.png";
import { Icon } from "@iconify/react";
import Sidebar from "./Sidebar";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="bg-head d-flex justify-content-between align-items-center px-2">
        <div>
          <img src={logo} alt="Logo" width="150" />
        </div>
        <div className="d-lg-none">
          <Button onClick={handleShow} className="bg-head border-0">
            <Icon icon="humbleicons:bars" width="30px" height="30px" />
          </Button>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="d-flex flex-column vh-100">
                <NavLink
                  to="/dashboard"
                  className={`text-decoration-none text-dark p-3  ${
                    location.pathname === "/dashboard" ? "bg-light" : ""
                  }`}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/issue"
                  className={`text-decoration-none text-dark p-3  ${
                    location.pathname === "/issue" ? "bg-light" : ""
                  }`}
                >
                  Issue
                </NavLink>
                <NavLink
                  to="/attachment"
                  className={`text-decoration-none text-dark p-3  ${
                    location.pathname === "/attachment" ? "bg-light" : ""
                  }`}
                >
                  Attachment
                </NavLink>
                <NavLink
                  to="/status"
                  className={`text-decoration-none text-dark p-3  ${
                    location.pathname === "/status" ? "bg-light" : ""
                  }`}
                >
                  Status
                </NavLink>
                <NavLink
                  to="/review"
                  className={`text-decoration-none text-dark p-3  ${
                    location.pathname === "/review" ? "bg-light" : ""
                  }`}
                >
                  Review
                </NavLink>
                <NavLink
                  to="/denied"
                  className={`text-decoration-none text-dark p-3  ${
                    location.pathname === "/denied" ? "bg-light" : ""
                  }`}
                >
                  Denied
                </NavLink>
                <NavLink
                  to="/pending"
                  className={`text-decoration-none text-dark p-3  ${
                    location.pathname === "/pending" ? "bg-light" : ""
                  }`}
                >
                  Pending
                </NavLink>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </>
  );
}

export default Header;
