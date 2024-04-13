import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Chart } from 'primereact/chart';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Dashboard = () => {
  // Sample data for the chart
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Number of Visitors',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: '#42A5F5',
      },
    ],
  };

  const visitors = [
    { name: 'John', email: 'john@example.com', date: '2024-04-13' },
    { name: 'Jane', email: 'jane@example.com', date: '2024-04-14' },
    { name: 'Doe', email: 'doe@example.com', date: '2024-04-15' },
  ];

  return (
    <div className="p-grid p-fluid">
      <div className="p-col-12 p-md-6 p-lg-3">
        <Card title="Statistics" className="p-shadow-4">
          <ul className="p-d-flex p-flex-column">
            <li>Total Animals: 150</li>
            <li>Total Visitors: 5000</li>
            <li>Upcoming Events: 3</li>
          </ul>
        </Card>
      </div>
      <div className="p-col-12 p-md-6 p-lg-9">
        <Panel header="Visitor Statistics" className="p-shadow-4">
          <Chart type="line" data={chartData} />
        </Panel>
      </div>
      <div className="p-col-12 p-md-6 p-lg-6">
        <Panel header="Recent Activities" className="p-shadow-4">
          <ul className="p-d-flex p-flex-column">
            <li>Added new animal: Lion</li>
            <li>Updated enclosure details</li>
            <li>Booked tickets for an event</li>
          </ul>
        </Panel>
      </div>
      <div className="p-col-12 p-md-6 p-lg-6">
        <Panel header="Quick Links" className="p-shadow-4">
          <Button label="Manage Animals" className="p-button-rounded p-mr-2 p-mb-2" />
          <Button label="Manage Enclosures" className="p-button-rounded p-mr-2 p-mb-2" />
          <Button label="Manage Events" className="p-button-rounded p-mr-2 p-mb-2" />
          <Button label="View Reports" className="p-button-rounded p-mr-2 p-mb-2" />
        </Panel>
      </div>
      <div className="p-col-12 p-lg-12">
        <Panel header="Progress" className="p-shadow-4">
          <ProgressBar value={60} displayValueTemplate={displayValueTemplate} />
        </Panel>
      </div>
      <div className="p-col-12 p-lg-12">
        <Panel header="Calendar" className="p-shadow-4">
          <Calendar value={new Date()} />
        </Panel>
      </div>
      <div className="p-col-12 p-lg-12">
        <Panel header="Visitor Data" className="p-shadow-4">
          <DataTable value={visitors}>
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="date" header="Date"></Column>
          </DataTable>
        </Panel>
      </div>
    </div>
  );
};

const displayValueTemplate = (value) => {
  return `${value}%`;
};

export default Dashboard;
