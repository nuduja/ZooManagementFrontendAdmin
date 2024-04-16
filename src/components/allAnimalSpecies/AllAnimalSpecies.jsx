import React, { useEffect, useState, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';

const AllAnimalSpecies = () => {
  const [animalsSpecies, setAnimalsSpecies] = useState([]);
  const [animalSpeciesId, setAnimalSpeciesId] = useState('');
  const [animalSpeciesName, setAnimalSpeciesName] = useState('');
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5); // Change pagination step to 5

  useEffect(() => {
    fetchData();
  }, [animalSpeciesId, animalSpeciesName, first, rows]);

  const fetchData = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      animalSpeciesId: animalSpeciesId,
      animalSpeciesName: animalSpeciesName,
      first: first,
      rows: rows
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
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      { field: 'id', header: 'ID' },
      { field: 'animalSpeciesId', header: 'Animal Species ID', sortable: true },
      { field: 'animalSpeciesName', header: 'Animal Species Name', sortable: true },
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
      <h3 className="section-title">All Animal Species</h3>
      <DataTable
        value={animalsSpecies}
        loading={loading}
        paginator
        first={first}
        rows={rows}
        totalRecords={1000} // Set the total number of records here
        onPage={(e) => setFirst(e.first)}
        rowsPerPageOptions={[5, 10, 20]} // Customize pagination options
      >
        {columns.map((column) => (
          <Column key={column.field} field={column.field} header={column.header} sortable={column.sortable} />
        ))}
        <Column body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default AllAnimalSpecies;
