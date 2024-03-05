import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { columns_1, headers, access } from '../utils/data';

const UserDetails = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = () => {
    if (userId) {
      axios
        .get(`https://gorest.co.in/public/v2/users/${userId}`, headers)
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => console.error('Error fetching user details:', error));
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{access[3]}</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              {columns_1?.map((column) => (
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
