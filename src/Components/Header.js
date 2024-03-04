import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import imagePaths from "../Asset/index";

function Header() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="bg-head d-flex justify-content-between align-items-center px-2">
        <div>
          <img src={imagePaths.logo} alt="Logo" width="150" />
        </div>
        <div className="d-lg-none">
          <Button onClick={()=> setShow(true)} className="bg-head border-0">
            <Icon icon="humbleicons:bars" width="30px" height="30px" />
          </Button>
          <Offcanvas show={show} onHide={() => setShow(false)}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>offcanvas</Offcanvas.Title>
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
