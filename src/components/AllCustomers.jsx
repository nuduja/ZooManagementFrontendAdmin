import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AllCustomers.css'; // Import custom styles

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/user');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching Customers data:', error);
    }
  };

  return (
    <div>
      <h3 className="section-title">Customers</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.username}>
                <td>{customer.name}</td>
                <td>{customer.username}</td>
                <td>
                  <Link to={`/admin/${customer.username}`} className="p-button p-button-text">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCustomers;
