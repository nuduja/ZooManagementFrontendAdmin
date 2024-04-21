import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';

const AllCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);

    useEffect(() => {
        fetchData();
    }, [userId, name, username, first, rows]);

    const fetchData = async () => {
        setLoading(true);
        const queryParams = new URLSearchParams({
            userId: userId,
            name: name,
            username: username,
            first: first,
            rows: rows
        });
        try {
            const response = await fetch(`http://localhost:8080/api/v1/user/searchUser?${queryParams}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching Customers data:', error);
        } finally {
            setLoading(false);
        }
    };
    

    const handleDownload = () => {
        fetch('http://localhost:8080/api/v1/user/pdf', {
            method: 'GET',
            headers: {
                'Accept': 'application/pdf',
            },
        }).then((response) => response.blob())
            .then((blob) => {
                const fileURL = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'users.pdf');
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
            { field: 'userId', header: 'User ID' },
            { field: 'name', header: 'Name' },
            { field: 'username', header: 'Username' },
            { field: 'phone', header: 'Phone' },
            { field: 'email', header: 'Email' },
        ],
        []
    );

    return (
        <div className="p-grid p-fluid">
            <div className="p-col-12">
                <h3 className="section-title">All Customers</h3>
                <div className="p-grid p-formgrid">
                    <div className="p-col-4">
                        <InputText
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Search by User ID"
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="p-col-4">
                        <InputText
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Search by Username"
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="p-col-4">
                        <InputText
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Search by Name"
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="p-col-12">
                        {loading && <ProgressSpinner />}
                        <DataTable 
                            value={customers} 
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
                                    <Link to={`/customerSpecific/${rowData.userId}`} className="p-button p-button-text" style={{ width: '140px' }}>
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

export default AllCustomers;
