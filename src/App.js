import "./App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { Row, Col } from "react-bootstrap";
import Dashboard from "./Components/Dashboard";
import Issue from "./Components/Issue";
import Attachment from "./Components/Attachment";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <>
        <Header />
        <Row className="mx-0">
          <Col lg={2} className="px-0 hi bg-side">

            <Sidebar />
          </Col>
          <Col lg={10} className="px-0">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/issue" element={<Issue />} />
              <Route path="/attachment" element={<Attachment />} />
            </Routes>
          </Col>
        </Row>
      </>
    </Router>
  );
}

export default App;
