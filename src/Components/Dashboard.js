import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Adduser from "./AddUser";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from "./Table";

function Dashboard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState();
  const [selectedRow, setSelectedRow] = useState(null);

  const [authToken, setAuthToken] = useState('7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7');

  useEffect(() => {
       axios.get('https://gorest.co.in/public/v2/users?page=1&per_page=100').then(res=>{
           setData(res)
            console.log(res.data,"response")
        })
  },[]);
  const handleAddUser = (newUserData) => {
    setData((prevData) => [...prevData, newUserData]);
  };

  const onDeleteClick = async (id) => {
    try {
      
      await axios.delete(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: {
          Authorization: `Bearer 7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7`,
        },
      });

      const updatedData = data.data.filter((item) => item.id !== id);
      setData({ data: updatedData });
      
    } catch (error) {
      console.error("Error deleting item:", error);

    }
  };

  const onUpdateClick = async (id, updatedData) => {
    try {
      
      await axios.put(`https://gorest.co.in/public/v2/users/${id}`,updatedData, {
        headers: {
          Authorization: `Bearer 7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7`,
        },
      });

      const updatedDataList = data.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      );
      setData(updatedDataList);

      setSelectedRow(null);
      console.log("Updated Data:", { id, updatedData });

    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row  justify-content-center justify-content-lg-start">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-none"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="search-addon"
              >
              <i className="bi bi-search" style={{ color: 'black' }}></i>
              </button>
            </div>
          </div>
          <div className="col-md-6 mt-3 mt-md-0">
            <Button
              variant="primary"
              onClick={handleShow}
              className="btn bg-primary w-100 text-white "
            >
              Add New User
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Adduser onAddUser={handleAddUser} authToken={authToken} close={handleClose}/>
              </Modal.Body>
              {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer> */}
            </Modal>
          </div>
        </div>
        <Table data={data}  onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick}
        selectedRow={selectedRow}/>
      </div>
    </>
  );
}

export default Dashboard;
