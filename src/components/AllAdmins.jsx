import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Link } from 'react-router-dom';

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error('Error fetching Admindata:', error);
    }
  };

  return (
    <div>
        <h3 className="section-title">Admins</h3>
        {admins.map(admin => (
          <Card key={admin.id} title={admin.name} subTitle={`Price: ${admin.username}`} className="ticket-card">
            <div className="p-mb-2">
              <Link to={`/admin/${admin.username}`} className="p-button p-button-text">
                View Details
              </Link>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default AllAdmins;