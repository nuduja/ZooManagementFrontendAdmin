import React, { useEffect, useState, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
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
      console.error('Error fetching Admin data:', error);
    }
  };

  const data = useMemo(() => admins, [admins]);

  return (
    <div>
      <h3 className="section-title">All Admins</h3>
      <DataTable value={data} className="p-datatable-striped">
        <Column field="name" header="Name"></Column>
        <Column field="username" header="Username"></Column>
        <Column
          header="Actions"
          body={(rowData) => (
            <Link to={`/adminSpecific/${rowData.username}`} className="p-button p-button-text">
              View Details
            </Link>
          )}
        ></Column>
      </DataTable>
    </div>
  );
};

export default AllAdmins;
