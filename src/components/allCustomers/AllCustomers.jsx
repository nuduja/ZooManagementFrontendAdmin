import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';

const AllCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [userId, setAdminId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchData();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [userId, name, username]);

    const fetchData = async () => {
        setLoading(true);
        const queryParams = new URLSearchParams({
            userId: userId,
            name: name,
            username: username
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

    const columns = useMemo(
        () => [
            { field: 'name', header: 'Name' },
            { field: 'username', header: 'Username' },
            {
                header: 'Actions',
                body: ({ username }) => (
                    <Link to={`/customerSpecific/${username}`} className="p-button p-button-text">
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
                <h3 className="section-title">All Customers</h3>
                <div className="p-grid p-formgrid">
                    <div className="p-col-4">
                        <InputText
                            value={userId}
                            onChange={(e) => setAdminId(e.target.value)}
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
                        <DataTable value={customers} loading={loading} emptyMessage="No data found">
                            {columns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} />
                            ))}
                            <Column
                                header="Actions"
                                body={(rowData) => (
                                    <Link to={`/customerSpecific/${rowData.username}`} className="p-button p-button-text">
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

export default AllCustomers;
