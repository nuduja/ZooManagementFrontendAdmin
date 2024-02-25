import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';

const AllAnimalSpecies = () => {
  const [animalsSpecies, setAnimalsSpecies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/animalspecies');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAnimalsSpecies(data);
    } catch (error) {
      console.error('Error fetching AllAnimalSpecies data:', error);
    }
  };

  const data = useMemo(() => animalsSpecies, [animalsSpecies]);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'animalId',
        accessor: 'animalId',
      },
      {
        Header: 'name',
        accessor: 'name',
      },
      {
        Header: 'taxonomy_kingdom',
        accessor: 'taxonomy_kingdom',
      },
      {
        Header: 'taxonomy_scientific_name',
        accessor: 'taxonomy_scientific_name',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <Link to={`/animal/${row.original.id}`} className="p-button p-button-text">
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
      <h3 className="section-title">AllAnimalSpecies</h3>
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

export default AllAnimalSpecies;