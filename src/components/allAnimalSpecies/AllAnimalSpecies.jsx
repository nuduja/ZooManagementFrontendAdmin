import React, { useEffect, useState, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const AllAnimalSpecies = () => {
  const [animalsSpecies, setAnimalsSpecies] = useState([]);
  const [animalSpeciesId, setAnimalSpeciesId] = useState('');
  const [animalSpeciesName, setAnimalSpeciesName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const delayDebounce = setTimeout(() => {
          fetchData();
      }, 500);

      return () => clearTimeout(delayDebounce);
  }, []);

  const fetchData = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams({
          animalSpeciesId: animalSpeciesId,
          animalSpeciesName: animalSpeciesName
      });
    try {
      const response = await fetch(`http://localhost:8080/api/v1/animalspecies/searchAnimalSpecies?${queryParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAnimalsSpecies(data);
    } catch (error) {
      console.error('Error fetching AllAnimalSpecies data:', error);
    }
  };

  const columns = useMemo(
    () => [
      { field: 'id', header: 'ID' },
      { field: 'animalSpeciesId', header: 'Animal Species ID' },
      { field: 'animalSpeciesName', header: 'Animal Species Name' },
      { field: 'actions', header: 'Actions' },
    ],
    []
  );

  const actionTemplate = (rowData) => (
    
    <Link to={`/animalSpeciesSpecific/${rowData.animalSpeciesId}`} className="p-button p-button-text">
      View Details
    </Link>
  );

  return (
    <div>
      <h3 className="section-title">AllAnimalSpecies</h3>
      <DataTable value={animalsSpecies}>
        {columns.map((column) => (
          <Column key={column.field} field={column.field} header={column.header} />
        ))}
        <Column body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default AllAnimalSpecies;
