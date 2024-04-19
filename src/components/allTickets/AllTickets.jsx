import React, { useEffect, useState, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [ticketID, setTicketID] = useState('');
    const [ticketType, setTicketType] = useState('');
    const [ticketStatus, setTicketStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);

    useEffect(() => {
        fetchData();
    }, [ticketID, ticketType, ticketStatus, first, rows]);

    const fetchData = async () => {
        setLoading(true);
        const queryParams = new URLSearchParams({
            ticketID: ticketID,
            ticketType: ticketType,
            ticketStatus: ticketStatus,
            first: first,
            rows: rows
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

    const handleDownload = () => {
        const csvContent = 'Ticket ID,Ticket Type,Price,Status,Ticket Date,Username\n';
        tickets.forEach(row => {
            csvContent += `${row.ticketID},${row.ticketType},${row.price},${row.status},${row.ticketDate},${row.username}\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'tickets.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
            { field: 'ticketID', header: 'Ticket ID', sortable: true },
            { field: 'ticketType', header: 'Ticket Type', sortable: true },
            { field: 'price', header: 'Price', sortable: true },
            { field: 'status', header: 'Status', sortable: true },
            { field: 'ticketDate', header: 'Ticket Date', sortable: true },
            { field: 'username', header: 'Username', sortable: true },
        ],
        []
    );

    return (
        <div className="p-grid p-fluid">
            <div className="p-col-12">
                <h3 className="section-title">All Tickets</h3>
                <div className="p-grid p-formgrid">
                    <div className="p-col-4">
                        <InputText
                            value={ticketID}
                            onChange={(e) => setTicketID(e.target.value)}
                            placeholder="Search by Ticket ID"
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="p-col-4">
                        <Dropdown
                            value={ticketType}
                            options={[
                                { label: 'Select Ticket Type', value: '' },
                                { label: 'FOREIGN_ADULT', value: 'FOREIGN_ADULT' },
                                { label: 'FOREIGN_KID', value: 'FOREIGN_KID' },
                                { label: 'LOCAL_ADULT', value: 'LOCAL_ADULT' },
                                { label: 'LOCAL_KID', value: 'LOCAL_KID' },
                            ]}
                            onChange={(e) => setTicketType(e.value)}
                            placeholder="Select Ticket Type"
                            className="p-dropdown-sm"
                        />
                    </div>
                    <div className="p-col-4">
                        <Dropdown
                            value={ticketStatus}
                            options={[
                                { label: 'Select Status', value: '' },
                                { label: 'VALID', value: 'VALID' },
                                { label: 'INVALID', value: 'INVALID' },
                            ]}
                            onChange={(e) => setTicketStatus(e.value)}
                            placeholder="Select Status"
                            className="p-dropdown-sm"
                        />
                    </div>
                    <div className="p-col-12">
                        {loading && <ProgressSpinner />}
                        <DataTable 
                            value={tickets} 
                            loading={loading} 
                            emptyMessage="No data found" 
                            paginator 
                            rows={rows} 
                            first={first} 
                            onPage={(e) => setFirst(e.first)} 
                            rowsPerPageOptions={[5, 10]} 
                            totalRecords={1000}
                            className="custom-table"
                        >
                            {columns.map((col) => (
                                <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable} />
                            ))}
                            <Column
                                header="Actions"
                                body={(rowData) => (
                                    <Link to={`/ticketSpecific/${rowData.ticketID}`} className="p-button p-button-text">
                                        View Details
                                    </Link>
                                )}
                            />
                        </DataTable>
                    </div>
                    <div className="p-col-12 p-d-flex p-jc-start p-mt-2">
                        {downloadButton}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllTickets;
