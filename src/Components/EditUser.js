import React, { useState } from "react";
import { genderOptions,adduser,user } from "../utils/data";

const EditForm = ({ data, onUpdateClick, onCancel }) => {
  const [editedData, setEditedData] = useState({ ...data });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    onUpdateClick(editedData);
    onCancel(false)
  };

  return (
    <div className="edit-form-container">
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            {user.name}
          </label>
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            {user.email}
          </label>
          <input
            type="email"
            name="email"
            value={editedData.email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
           {user.gender}
          </label>
          <select
            name="gender"
            value={editedData.gender}
            onChange={handleInputChange}
            className="form-select"
          >
            {genderOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            {user.status}
          </label>
          <input
            type="text"
            name="status"
            value={editedData.status}
            onChange={handleInputChange}
            className="form-control"
          />

        </div>
        <button type="button" onClick={handleUpdateClick} className="btn btn-primary">
          {adduser.update}
        </button>
        <button type="button" onClick={onCancel} className=" ms-2 btn btn-secondary">
          {adduser.cancel}
        </button>
      </form>
    </div>
  );
};

export default EditForm;
