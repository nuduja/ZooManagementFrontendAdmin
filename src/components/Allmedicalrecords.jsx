import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const AllMedicalRecords = () => {
  const [medicalRecordId, setMedicalRecords] = useState([]);
  const [animalId, setAnimalId] = useState('');
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({
        medicalRecordId: medicalRecordId,
        animalId: animalId,
      });
    try {
      const response = await fetch(`http://localhost:8080/api/v1/medicalRecord/searchmedicalrecords?${queryParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMedicalRecords(data);
    } catch (error) {
      console.error('Error fetching All Medical Records data:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo(
    () => [
      { field: 'medicalRecordId', header: 'Medical Record ID' },
      { field: 'animalId', header: 'Animal ID' },
      { field: 'recordDate', header: 'Record Date' },
      { field: 'description', header: 'Description' },
    ],
    []
  );

  return (
    <div>
      <h3 className="section-title">All Medical Records</h3>

      {loading && <div>Loading...</div>}

      <DataTable value={medicalRecordId} loading={loading} className="table" paginator rows={rows} first={first} onPage={(e) => setFirst(e.first)} rowsPerPageOptions={[5, 10]} totalRecords={1000}>
        {columns.map(col => (
          <Column key={col.field} field={col.field} header={col.header} sortable />
        ))}
        <Column
          header="Actions"
          body={(rowData) => (
            <React.Fragment>
              <Link to={`../medicalRecordSpecific/${rowData.medicalRecordId}`} className="p-button p-button-text" style={{ width: '140px' }}>
                View Details
              </Link>
            </React.Fragment>
          )}
        />
      </DataTable>
    </div>
  );
};

export default AllMedicalRecords;
