import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {columns_1}  from '../utils/data';

const UserDetails = () => {
  
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    if (userId) {
      axios.get(`https://gorest.co.in/public/v2/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer 7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7`,
          },
        })
        .then(response => {
            setUserDetails(response.data)
        })
        .catch(error => console.error('Error fetching user details:', error));
    }
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }


  return (
    <div className="container mt-5">
      <h2>User Details</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
        <thead className="thead-dark">
      <tr>
        {columns_1.map((column) => (
          <th key={column.key} scope="col">
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
          <tbody>
            <tr>
              <td>{userDetails.id}</td>
              <td>{userDetails.name}</td>
              <td>{userDetails.email}</td>
              <td>{userDetails.gender}</td>
              <td>{userDetails.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetails;
