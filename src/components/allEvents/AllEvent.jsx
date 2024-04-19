import React, { useEffect, useState, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [eventID, setEventID] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const delayDebounce = setTimeout(() => {
          fetchData();
      }, 500);

      return () => clearTimeout(delayDebounce);
  }, [eventID, eventLocation]);

  const fetchData = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams({
          eventID: eventID,
          eventLocation: eventLocation,
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

  const viewDetailsButton = (rowData) => {
    return (
      <Link to={`/eventSpecific/${rowData.eventID}`} className="p-button p-button-text">
        View Details
      </Link>
    );
  };

  const columns = useMemo(
    () => [
      { field: 'eventID', header: 'EventID' },
      { field: 'eventName', header: 'Event Name' },
      { field: 'eventDate', header: 'Event Date' },
      { field: 'eventLocation', header: 'Location' },
      { field: 'username', header: 'Username' },
      { header: 'Actions', body: viewDetailsButton },
    ],
    []
  );

  return (
    <div>
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
      </div>

      {loading && <div>Loading...</div>}
      <DataTable value={events} loading={loading} emptyMessage="No data available">
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} body={col.body} />
        ))}
      </DataTable>
    </div>
  );
};

export default AllEvents;
