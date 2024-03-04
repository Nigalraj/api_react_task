import React from "react";
import {
  Table,
  Button,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

const Tables = ({columns,currentItems,handleEditClick,setModalData,onDeleteClick}) => {

  const showDeleteConfirmation = (itemId) => {
    Swal.fire({
      title: 'Are you sure you want to delete this ID?',
      text: `${itemId}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Done!", "", "success");
        onDeleteClick(itemId);
      }
      else{
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div>
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
                <td>
                  <Button
                    onClick={() => {
                      handleEditClick(item.id);
                      setModalData(true);
                    }}
                    className="edit-button btn-edit"
                  >
                    <Icon icon="material-symbols:edit-square-outline-rounded" />
                  </Button>
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    onClick={() => showDeleteConfirmation(item.id)}
                    className="delete-button p-1 px-2 border-0"
                  >
                    <Icon
                      icon="mdi:delete-outline"
                      width="1.2rem"
                      height="1.2rem"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
  );
};

export default Tables;
