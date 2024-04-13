import React, {useMemo} from 'react';
import {useSortBy, useTable} from 'react-table';
import {useQuery} from "react-query";
import axios from 'axios'
import {allCustomersColumns} from './allCustomersColumns';


const AllCustomersTable = () => {
    // const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        // return axios.get('http://localhost:8080/user')
        const response = await axios.get('http://localhost:8080/user');
        return response.data;
    }

    // const {isLoading, data: customers} = useQuery('allCustomers', fetchCustomers)
    const {isLoading, data: customers} = useQuery('allCustomers', fetchCustomers)

    const columns = useMemo(() => allCustomersColumns, [])
    //
    // useEffect(() => {
    //     // fetchCustomers();
    // }, []);


    // const fetchCustomers = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8080/user');
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         setCustomers(data);
    //     } catch (error) {
    //         console.error('Error fetching Customers data:', error);
    //     }
    // };


    // const data = useMemo(() => customers, [customers]);
    console.log(columns, customers);
    const tableInstance = useTable({columns, data: customers || []}, useSortBy);

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance;

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <h3 className="section-title">Customers</h3>
            <table {...getTableProps()} className="table">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps)}>
                                {column.render('Header')}
                                <span>
                                  {column.isSorted ? (column.isSortedDesc ? '>' : '<') : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default AllCustomersTable;