import React, { useState } from "react";

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
            Name:
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
            Email:
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
            Gender:
          </label>
          <select
            name="gender"
            value={editedData.gender}
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status:
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
          Update
        </button>
        <button type="button" onClick={onCancel} className=" ms-2 btn btn-secondary">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditForm;
