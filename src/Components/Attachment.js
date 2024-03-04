import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpider, faCog } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

function Attachment() {
  return (
    <div className="d-flex justify-content-center">
      <div className="">
      <div className="d-flex align-items-center">
        <div className="spider">
          <FontAwesomeIcon icon={faSpider} />
        </div>
        <Container>
          <h1>
            <span className="num">4</span>
            <FontAwesomeIcon icon={faCog} />
            <span className="num">4</span>
          </h1>
          <p>Oops, Page not found</p>
        </Container>
      </div>
    </div>
    </div>
  );
}

export default Attachment;
