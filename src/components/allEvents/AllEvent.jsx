import React, { useEffect, useState, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const AllEvents = () => {
    const [events, setEvents] = useState([]);
    const [eventID, setEventID] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);

    useEffect(() => {
        fetchData();
    }, [eventID, eventLocation, first, rows]);

    const fetchData = async () => {
        setLoading(true);
        const queryParams = new URLSearchParams({
            eventID: eventID,
            eventLocation: eventLocation,
            first: first,
            rows: rows
        });
        try {
            const response = await fetch(`http://localhost:8080/api/v1/event/search?${queryParams}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching Event data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        fetch('http://localhost:8080/api/v1/event/pdf', {
            method: 'GET',
            headers: {
                'Accept': 'application/pdf',
            },
        }).then((response) => response.blob())
            .then((blob) => {
                const fileURL = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'events.pdf');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            });
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
            { field: 'eventID', header: 'Event ID', sortable: true },
            { field: 'eventName', header: 'Event Name', sortable: true },
            { field: 'eventDate', header: 'Event Date', sortable: true },
            { field: 'eventLocation', header: 'Location', sortable: true },
            { field: 'username', header: 'Username', sortable: true },
        ],
        []
    );

    return (
        <div className="p-grid p-fluid">
            <div className="p-col-12">
                <h3 className="section-title">All Events</h3>
                <div className="p-grid p-formgrid">
                    <div className="p-col-4">
                        <InputText
                            value={eventID}
                            onChange={(e) => setEventID(e.target.value)}
                            placeholder="Search by Event ID"
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="p-col-4">
                        <InputText
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
                            placeholder="Search by Event Location"
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="p-col-12">
                        {loading && <ProgressSpinner />}
                        <DataTable 
                            value={events} 
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
                                    <Link to={`/eventSpecific/${rowData.eventID}`} className="p-button p-button-text" style={{ width: '140px' }}>
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

export default AllEvents;
