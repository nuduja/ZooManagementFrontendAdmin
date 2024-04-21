import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';

const AllAnimalSpecies = () => {
    const [animalSpecies, setAnimalSpecies] = useState([]);
    const [animalSpeciesId, setAnimalSpeciesId] = useState('');
    const [animalSpeciesName, setAnimalSpeciesName] = useState('');
    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);

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
            setAnimalSpecies(data);
        } catch (error) {
            console.error('Error fetching Animal Species data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        fetch('http://localhost:8080/api/v1/animalspecies/pdf', {
            method: 'GET',
            headers: {
                'Accept': 'application/pdf',
            },
        }).then((response) => response.blob())
            .then((blob) => {
                const fileURL = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'animalspecies.pdf');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            });
    };

    const downloadButton = (
        <Button
            type="button"
            icon="pi pi-download"
            onClick={handleDownload}
            className="p-button-text"
        />
    );

    const columns = useMemo(
        () => [
            { field: 'animalSpeciesId', header: 'Animal Species ID' },
            { field: 'animalSpeciesName', header: 'Animal Species Name' },
        ],
        []
    );

    return (
        <div className="p-grid p-fluid">
            <div className="p-col-12">
                <h3 className="section-title">All Animal Species</h3>
                <div className="p-grid p-formgrid">
                    <div className="p-col-4">
                        <InputText
                            value={animalSpeciesId}
                            onChange={(e) => setAnimalSpeciesId(e.target.value)}
                            placeholder="Search by Species ID"
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="p-col-4">
                        <InputText
                            value={animalSpeciesName}
                            onChange={(e) => setAnimalSpeciesName(e.target.value)}
                            placeholder="Search by Species Name"
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="p-col-12">
                        {loading && <ProgressSpinner />}
                        <DataTable
                            value={animalSpecies}
                            loading={loading}
                            emptyMessage="No data found"
                            paginator
                            rows={rows}
                            first={first}
                            onPage={(e) => setFirst(e.first)}
                            rowsPerPageOptions={[5, 10]}
                            totalRecords={1000}
                        >
                            {columns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} />
                            ))}
                            <Column
                                header="Actions"
                                body={(rowData) => (
                                    <Link to={`/animalSpeciesSpecific/${rowData.animalSpeciesId}`} className="p-button p-button-text" style={{ width: '140px' }}>
                                        View Details
                                    </Link>
                                )}
                            />
                        </DataTable>
                    </div>
                    <div className="p-col-12 p-d-flex p-jc-end p-mb-2">
                        {downloadButton}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllAnimalSpecies;
