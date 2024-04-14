import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';

const AllAnimalSpecies = () => {
  const [animalsSpecies, setAnimalsSpecies] = useState([]);
  const [animalSpeciesId, setAnimalSpeciesId] = useState('');
  const [animalSpeciesName, setAnimalSpeciesName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const delayDebounce = setTimeout(() => {
          fetchData();
      }, 500);

      return () => clearTimeout(delayDebounce);
  }, []);

  const fetchData = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams({
          animalSpeciesId: animalSpeciesId,
          animalSpeciesName: animalSpeciesName
      });
    try {
      const response = await fetch(`http://localhost:8080/api/v1/animalspecies/searchAnimalSpecies?${queryParams}`);
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
          <Link to={`/animalSpeciesSpecific/${row.original.animalSpeciesId}`} className="p-button p-button-text">
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
        <input
            type="text"
            value={animalSpeciesId}
            onChange={e => setAnimalSpeciesId(e.target.value)}
            placeholder="Search by Animal Species Id"
        />
        <input
            type="text"
            value={animalSpeciesName}
            onChange={e => setAnimalSpeciesName(e.target.value)}
            placeholder="Search by Animal Species Name"
        />
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

export default AllAnimalSpecies;