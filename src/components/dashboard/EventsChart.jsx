import React from 'react';
import { Bar } from 'react-chartjs-2';

const EventsChart = () => {
    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [
            {
                label: 'Sold Tickets',
                data: [50, 75, 150, 125, 225], // Replace these with your actual data
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Booked Events',
                data: [30, 45, 100, 80, 120], // Replace these with your actual data
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            }
        ]
    };

    return <Bar data={data} />;
};

export default EventsChart;
