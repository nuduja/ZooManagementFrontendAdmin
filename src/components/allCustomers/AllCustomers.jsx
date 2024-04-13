// import React from 'react';
// import AllCustomersTable from "./AllCustomersTable.jsx";
//
// const AllCustomers = () => {
//     return(
//         <AllCustomersTable/>
//     )
// };
//
// export default AllCustomers;


import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';

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
            const response = await fetch(`http://localhost:8080/api/v1/user/searchUser?${queryParams}`);;
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

    const data = useMemo(() => customers, [customers]);

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <Link to={`/customerSpecific/${row.original.username}`} className="p-button p-button-text">
                        View Details
                    </Link>
                ),
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <div>
            <h3 className="section-title">All Customers</h3>
            <input
                type="text"
                value={userId}
                onChange={e => setAdminId(e.target.value)}
                placeholder="Search by User ID"
            />
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Search by User username"
            />
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Search by User Name"
            />
            {loading && <div>Loading...</div>}
            <table {...getTableProps()} className="table">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.length > 0 ? (
                    rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })
                ) : (
                    <tr>
                        <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                            No data available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AllCustomers;