import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

const AllAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [animalId, setAnimalId] = useState('');
  const [animalSpeciesId, setAnimalSpeciesId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  useEffect(() => {
    fetchData();
  }, [animalId, animalSpeciesId, name, first, rows]);

  const fetchData = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      animalId: animalId,
      animalSpeciesId: animalSpeciesId,
      name: name,
      first: first,
      rows: rows
    });
    try {
      const response = await fetch(`http://localhost:8080/api/v1/animal/searchAnimal?${queryParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAnimals(data);
    } catch (error) {
      console.error('Error fetching AllAnimals data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    fetch('http://localhost:8080/api/v1/animal/pdf', {
            method: 'GET',
            headers: {
                'Accept': 'application/pdf',
            },
        }).then((response) => response.blob())
            .then((blob) => {
                const fileURL = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'animals.pdf');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            });
    };

  const columns = useMemo(
    () => [
      { field: 'id', header: 'ID' },
      { field: 'animalId', header: 'Animal ID' },
      { field: 'animalSpeciesId', header: 'Species ID' },
      { field: 'animalSpeciesName', header: 'Species Name' },
      { field: 'name', header: 'Name' },
      { field: 'enclosureId', header: 'Enclosure ID' },
    ],
    []
  );

  const downloadButton = (
    <Button
      type="button"
      icon="pi pi-download"
      onClick={handleDownload}
      className="p-button-text"
    />
  );

  return (
    <div>
      <h3 className="section-title">All Animals</h3>

      <div className="p-grid p-justify-between p-mb-4">
        <div className="p-col-12 p-md-4">
          <InputText
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            placeholder="Search by Animal ID"
          />
        </div>
        <div className="p-col-12 p-md-4">
          <InputText
            value={animalSpeciesId}
            onChange={(e) => setAnimalSpeciesId(e.target.value)}
            placeholder="Search by Animal Species Id"
          />
        </div>
        <div className="p-col-12 p-md-4">
          <InputText
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search by Animal Name"
          />
        </div>
      </div>

      {loading && <div>Loading...</div>}
      <div className="p-d-flex p-jc-end p-mb-2">
        {downloadButton}
        <DataTable value={animals} loading={loading} className="table" paginator rows={rows} first={first} onPage={(e) => setFirst(e.first)} rowsPerPageOptions={[5, 10]} totalRecords={1000}>
          {columns.map(col => (
            <Column key={col.field} field={col.field} header={col.header} sortable />
          ))}
          <Column
            header="Actions"
            body={(rowData) => (
              <React.Fragment>
                <Link to={`../animalSpecific/${rowData.animalId}`} className="p-button p-button-text">
                  View Details
                </Link>
                <Link to={`../medicalRecords/${rowData.id}`} className="p-button p-button-text p-ml-2">
                  Medical Records
                </Link>
              </React.Fragment>
            )}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default AllAnimals;
