import React, { useEffect, useState, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';

const AllAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [adminId, setAdminId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5); // Change pagination step to 5

    useEffect(() => {
        fetchData();
    }, [adminId, name, username, first, rows]);

    const fetchData = async () => {
        setLoading(true);
        const queryParams = new URLSearchParams({
            adminId: adminId,
            name: name,
            username: username,
            first: first,
            rows: rows
        });
        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/searchAdmin?${queryParams}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAdmins(data);
        } catch (error) {
            console.error('Error fetching Admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        fetch('http://localhost:8080/api/v1/admin/pdf', {
            method: 'GET',
            headers: {
                'Accept': 'application/pdf',
            },
        }).then((response) => response.blob())
            .then((blob) => {
                const fileURL = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'admins.pdf');
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
            { field: 'id', header: 'ID', sortable: true },
            { field: 'name', header: 'Name', sortable: true },
            { field: 'username', header: 'Username', sortable: true },
            { field: 'adminId', header: 'Admin Id', sortable: true },
        ],
        []
    );

    return (
        <div className="p-grid p-fluid">
            <div className="p-col-12">
                <h3 className="section-title">All Admins</h3>
                <div className="p-grid p-formgrid">
                    <div className="p-col-4">
                        <InputText
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)}
                            placeholder="Search by Admin ID"
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="p-col-4">
                        <InputText
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Search by Admin username"
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="p-col-4">
                        <InputText
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Search by Admin Name"
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="p-col-12">
                        {loading && <ProgressSpinner />}
                        <DataTable 
                            value={admins} 
                            loading={loading} 
                            emptyMessage="No data found" 
                            paginator 
                            rows={rows} 
                            first={first} 
                            onPage={(e) => setFirst(e.first)} 
                            rowsPerPageOptions={[5, 10]} 
                            totalRecords={1000}
                            className="custom-table"
                        >
                            {columns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable} />
                            ))}
                            <Column
                                header="Actions"
                                body={(rowData) => (
                                    <Link to={`/adminSpecific/${rowData.username}`} className="p-button p-button-text">
                                        View Details
                                    </Link>
                                )}
                            />
                        </DataTable>
                    </div>
                    <div className="p-col-12 p-d-flex p-jc-start p-mt-2">
                        {downloadButton}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllAdmins;
