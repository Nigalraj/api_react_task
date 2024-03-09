import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Adduser from "./AddUser";
import EditForm from "./EditUser";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import Table from "./Tables";
import {
  columns,
  headers,
  offcanvasTitleText,
  access,
  number,
} from "../utils/data";
import ApiServices from "../Constants/ApiServices";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const [state, setState] = useState({
    show: false,
    data: [],
    modalData: false,
    selectedRow: null,
    searchQuery: "",
    currentPage: number[0],
  });

  const [mouseMoved, setMouseMoved] = useState(false);
  
  const navigate = useNavigate();
    useEffect(() => {
      let timeoutId;
  
      const handleMouseMove = () => {
       
        setMouseMoved(true);
  
        clearTimeout(timeoutId);
  
        timeoutId = setTimeout(() => {
          // Use SweetAlert instead of the native alert
          Swal.fire({
            title: 'Mouse Inactivity',
            text: `Mouse has not moved for ${timeoutId} seconds!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Stay',
            cancelButtonText: 'Logout',
          }).then((result) => {
            if (result.isConfirmed) {
              
              setMouseMoved(false);
           
            } else {
             
              console.log('User logged out');
              navigate('/');
              
            }
          });
        }, 60000);
      };
  
     
      document.addEventListener('mousemove', handleMouseMove);
    
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(timeoutId);
        console.log("hi");
      };
    }, [navigate]);
  

  const itemsPerPage = number[1];

  const onDeleteClick = async (id) => {
    try {
      await ApiServices.deleteData(id)
      fetchData();
      const updatedData = state.data.filter((item) => item.id !== id);
      setState((prevState) => ({ ...prevState, data: updatedData }));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const onUpdateClick = async (id, updatedData) => {
    try {
      await ApiServices.putData(id,updatedData)
      const updatedDataList = state.data.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      );
      setState((prevState) => ({
        ...prevState,
        data: updatedDataList,
        selectedRow: null,
      }));
      console.log("Updated Data:", { id, updatedData });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await ApiServices.getData()
      setState((prevState) => ({ ...prevState, data: response.data }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = state.data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(state.searchQuery.toLowerCase())
    )
  );



  const indexOfLastItem = state.currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    setState((prevState) => ({
      ...prevState,
      currentPage: Math.min(prevState.currentPage + 1, totalPages),
    }));
  };

  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      show: false,
      modalData: false,
      selectedRow: null,
    }));
  };

  const handleEditClick = (id) => {
    setState((prevState) => ({ ...prevState, selectedRow: id }));
  };

  const handlePrevPage = () => {
    setState((prevState) => ({
      ...prevState,
      currentPage: Math.max(prevState.currentPage - 1, 1),
    }));
  };

  return (
    <>
    <Container>
      <div className="row d-md-flex justify-content-between my-3">
        <div className="col-6 col-md-5 mt-3">
          <InputGroup className="">
            <FormControl
              type="text"
              placeholder="Search "
              value={state.searchQuery}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  searchQuery: e.target.value,
                }))
              }
            />
          </InputGroup>
        </div>
        <div className="col-6 col-md-3">
          <Button
            variant="primary"
            onClick={() =>
              setState((prevState) => ({ ...prevState, show: true }))
            }
            className="btn-hover color m-0 w-100 text-white "
          >
            {offcanvasTitleText[1]}
          </Button>
          <Modal show={state.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{offcanvasTitleText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Adduser close={handleClose} fetchData={fetchData} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          currentItems={currentItems}
          handleEditClick={handleEditClick}
          setModalData={() =>
            setState((prevState) => ({ ...prevState, modalData: true }))
          }
          onDeleteClick={onDeleteClick}
          fetchData={fetchData}
        />
        {/* <Table columns={columns} currentItems={currentItems} handleEditClick={handleEditClick} setModalData={setModalData} onDeleteClick={onDeleteClick} fetchData={fetchData} /> */}
        <ul className="pagination">
          <li
            className={`page-item ${state.currentPage === 1 ? "disabled" : ""}`}
          >
            <button className="page-link" onClick={handlePrevPage}>
              {access[0]}
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                index + 1 === state.currentPage ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setState((prevState) => ({
                    ...prevState,
                    currentPage: index + 1,
                  }))
                }
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              state.currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button className="page-link" onClick={handleNextPage}>
              {access[1]}
            </button>
          </li>
        </ul>
      </div>
      <Modal show={state.modalData} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{access[2]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state.selectedRow && (
            <EditForm
              data={state.data.find((item) => item.id === state.selectedRow)}
              onUpdateClick={(updatedData) =>
                onUpdateClick(state.selectedRow, updatedData)
              }
              onCancel={handleClose}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
    </>
  );
};

export default MyComponent;
