import React from "react";
import {
  Table,
  Button,
} from "react-bootstrap";

import { Icon } from "@iconify/react";

const Tables = ({columns,currentItems,handleEditClick,handleModalData,onDeleteClick}) => {

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
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.gender}</td>
                <td>{item.status}</td>
                <td>
                  <Button
                    onClick={() => {
                      handleEditClick(item.id);
                      handleModalData();
                    }}
                    className="edit-button btn-edit"
                  >
                    <Icon icon="material-symbols:edit-square-outline-rounded" />
                  </Button>
                </td>
                <td>
                  <button
                    onClick={() => onDeleteClick(item.id)}
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
