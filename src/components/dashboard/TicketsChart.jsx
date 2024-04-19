import React from 'react';
import { Pie } from 'react-chartjs-2';

const TicketsChart = () => {
    const data = {
        labels: ['Local Tickets', 'Foreign Tickets'],
        datasets: [
            {
                data: [300, 200], // Replace these with your actual data
                backgroundColor: ['#FF6384', '#36A2EB'],
            }
        ]
    };

    return <Pie data={data} />;
};

export default TicketsChart;
