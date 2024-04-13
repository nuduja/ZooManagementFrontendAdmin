import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';

const AllCustomers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/user');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching Customers data:', error);
        }
    };

    const data = useMemo(() => customers, [customers]);

    return (
        <div>
            <h3 className="section-title">All Customers</h3>
            <DataTable value={data} className="p-datatable-striped">
                <Column field="name" header="Name"></Column>
                <Column field="username" header="Username"></Column>
                <Column
                    header="Actions"
                    body={(rowData) => (
                        <Link to={`/customerSpecific/${rowData.username}`} className="p-button p-button-text">
                            View Details
                        </Link>
                    )}
                ></Column>
            </DataTable>
        </div>
    );
};

export default AllCustomers;
