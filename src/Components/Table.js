import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditForm from "./EditUser";

const Table = ({ data, onDeleteClick, onUpdateClick }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const handleClose = () => {
    setShow(false);
    setSelectedRow(null);
  };
  const handleShow = () => setShow(true);

  const columns = ["id", "name", "email", "gender", "status", "Edit", "Delete"];

  const handleEditClick = (id) => {
    setSelectedRow(id);
  };

  const handleCancelEdit = () => {
    setSelectedRow(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.data?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container" style={{ overflowX: "auto" }}>
      <table className="table table-bordered mt-4">
        <thead className="thead-dark">
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((value) => (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.gender}</td>
                <td>{value.status}</td>

                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleEditClick(value.id);
                      handleShow();
                    }}
                    className="edit-button"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </td>

                <td>
                  <button
                    onClick={() => onDeleteClick(value.id)}
                    className="delete-button"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      
      {/* Pagination Controls */}
      <div className="pagination">
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-2">{currentPage}</span>
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= data?.data?.length}
        >
          Next
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <EditForm
              data={data.data.find((item) => item.id === selectedRow)}
              onUpdateClick={(updatedData) =>
              onUpdateClick(selectedRow, updatedData)
              }
              onCancel={handleClose}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Table;
