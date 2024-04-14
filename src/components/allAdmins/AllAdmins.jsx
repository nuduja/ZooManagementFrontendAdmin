import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';

const AllAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [adminId, setAdminId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchData();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [adminId, name, username]);

    const fetchData = async () => {
        setLoading(true);
        const queryParams = new URLSearchParams({
            adminId: adminId,
            name: name,
            username: username
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

    const columns = useMemo(
        () => [
            { field: 'name', header: 'Name' },
            { field: 'username', header: 'Username' },
            {
                header: 'Actions',
                body: ({ username }) => (
                    <Link to={`/adminSpecific/${username}`} className="p-button p-button-text">
                        View Details
                    </Link>
                ),
            },
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
                        <DataTable value={admins} loading={loading} emptyMessage="No data found">
                            {columns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} />
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
                </div>
            </div>
        </div>
    );
};

export default AllAdmins;
