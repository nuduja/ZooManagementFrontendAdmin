import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketID, setTicketID] = useState('');
  const [ticketType, setTicketType] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const delayDebounce = setTimeout(() => {
          fetchData();
      }, 500);

      return () => clearTimeout(delayDebounce);
  }, [ticketID, ticketType, ticketStatus]);

  const fetchData = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams({
          ticketID: ticketID,
          ticketType: ticketType,
          ticketStatus: ticketStatus
      });
    try {
      const response = await fetch(`http://localhost:8080/api/v1/ticket/search?${queryParams}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching Tickets data:', error);
    } finally {
        setLoading(false);
    }
  };

  const data = useMemo(() => tickets, [tickets]);

  const columns = useMemo(
    () => [
      {
        Header: 'TicketID',
        accessor: 'ticketID',
      },
      {
        Header: 'TicketType',
        accessor: 'ticketType',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <Link to={`/ticketSpecific/${row.original.ticketID}`} className="p-button p-button-text">
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
      <h3 className="section-title">All Tickets</h3>
        <input
            type="text"
            value={ticketID}
            onChange={e => setTicketID(e.target.value)}
            placeholder="Search by Ticket ID"
        />
        <select value={ticketType} onChange={e => setTicketType(e.target.value)}>
            <option value="">Select Ticket Type</option>
            <option value="FOREIGN_ADULT">FOREIGN_ADULT</option>
            <option value="FOREIGN_KID">FOREIGN_KID</option>
            <option value="LOCAL_ADULT">LOCAL_ADULT</option>
            <option value="LOCAL_KID">LOCAL_KID</option>
        </select>
        <select value={ticketStatus} onChange={e => setTicketStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="VALID">VALID</option>
            <option value="INVALID">INVALID</option>
        </select>
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

export default AllTickets;