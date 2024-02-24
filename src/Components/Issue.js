import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Adduser from "./AddUser";
import EditForm from "./EditUser";
import {
  Container,
  Table,
  InputGroup,
  FormControl,
  Button,
  ModalBody,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const MyComponent = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState(false);
  const handleShow = () => setShow(true);
  const handleModalData = () => setModalData(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const columns = ["id", "name", "email", "gender", "status", "Edit", "Delete"];

  const onDeleteClick = async (id) => {
    try {
      await axios.delete(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: {
          Authorization: `Bearer 7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7`,
        },
      });

      const updatedData = data.data.filter((item) => item.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const onUpdateClick = async (id, updatedData) => {
    try {
      await axios.put(
        `https://gorest.co.in/public/v2/users/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer 7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7`,
          },
        }
      );

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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://gorest.co.in/public/v2/users?page=1&per_page=100",
        {
          headers: {
            Authorization: `Bearer 7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleClose = () => {
    setShow(false);
    setModalData(false)
    setSelectedRow(null);
  };

  const handleEditClick = (id) => {
    setSelectedRow(id);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Container>
      <div className="row my-3">
        <div className="col-6">
          <InputGroup className="">
            <FormControl
              type="text"
              placeholder="Search "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-6">
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
              <Adduser close={handleClose} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <Table striped bordered hover>
          <thead className="thead-dark">
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.status}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleEditClick(item.id);
                      handleModalData();
                    }}
                    className="edit-button"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </td>

                <td>
                  <button
                    onClick={() => onDeleteClick(item.id)}
                    className="delete-button"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={handlePrevPage}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                index + 1 === currentPage ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </div>
      <Modal show={modalData} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <EditForm
              data={data.find((item) => item.id === selectedRow)}
              onUpdateClick={(updatedData) =>
              onUpdateClick(selectedRow, updatedData)
              }
              onCancel={handleClose}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MyComponent;
