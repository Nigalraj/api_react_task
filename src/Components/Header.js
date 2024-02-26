import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import imagepath from "../Asset/images.png";

function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="bg-head d-flex justify-content-between align-items-center px-2">
        <div>
          <img src={imagepath} alt="Logo" width="150" />
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
              <Sidebar/>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </>
  );
}

export default Header;
