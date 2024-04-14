import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';

const AllAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [animalId, setAnimalId] = useState('');
  const [animalSpeciesId, setAnimalSpeciesId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const delayDebounce = setTimeout(() => {
          fetchData();
      }, 500);

      return () => clearTimeout(delayDebounce);
  }, [animalId, animalSpeciesId, name]);

  const fetchData = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams({
          animalId: animalId,
          animalSpeciesId: animalSpeciesId,
          name: name
      });
    try {
      const response = await fetch(`http://localhost:8080/api/v1/animal/searchAnimal?${queryParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAnimals(data);
    } catch (error) {
      console.error('Error fetching AllAnimals data:', error);
    } finally {
        setLoading(false);
    }
  };

  const data = useMemo(() => animals, [animals]);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'animalSpecificId',
        accessor: 'animalSpecificId',
      },
      {
        Header: 'name',
        accessor: 'name',
      },
      {
        Header: 'enclosureId',
        accessor: 'enclosureId',
      },
      {
        Header: 'age',
        accessor: 'age',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <Link to={`/animalSpecific/${row.original.name}`} className="p-button p-button-text">
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
      <h3 className="section-title">All Animals</h3>

        <input
            type="text"
            value={animalId}
            onChange={e => setAnimalId(e.target.value)}
            placeholder="Search by Animal ID"
        />
        <input
            type="text"
            value={animalSpeciesId}
            onChange={e => setAnimalSpeciesId(e.target.value)}
            placeholder="Search by Animal Species Id"
        />
        <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Search by Animal Name"
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

export default AllAnimals;