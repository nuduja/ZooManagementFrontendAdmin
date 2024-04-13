import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const AllAnimals = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/animal');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAnimals(data);
    } catch (error) {
      console.error('Error fetching AllAnimals data:', error);
    }
  };

  const columns = useMemo(
    () => [
      { field: 'id', header: 'ID' },
      { field: 'animalSpecificId', header: 'Animal Specific ID' },
      { field: 'name', header: 'Name' },
      { field: 'enclosureId', header: 'Enclosure ID' },
      { field: 'age', header: 'Age' },
      {
        field: 'actions',
        body: (rowData) => (
          <Link to={`/animal/${rowData.id}`} className="p-button p-button-text">
            View Details
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <div className="p-mb-4">
      <h3 className="section-title">All Animals</h3>
      <DataTable value={animals} className="p-datatable-striped">
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} body={col.body} />
        ))}
      </DataTable>
    </div>
  );
};

export default AllAnimals;
