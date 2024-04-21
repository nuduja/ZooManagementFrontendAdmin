import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { Bar, Pie } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // Import the date-fns adapter for Chart.js
import { Chart, CategoryScale, LinearScale, BarController, BarElement, PieController, ArcElement } from 'chart.js'; // Import necessary modules from Chart.js

// Register necessary scale modules
Chart.register(CategoryScale, LinearScale, BarController, BarElement, PieController, ArcElement);

const AdminDashboard = () => {
    const [statistics, setStatistics] = useState(null);
    const [weeklyIncomeGoal, setWeeklyIncomeGoal] = useState(1000); // Example weekly income revenue goal
    const [newIncomeGoal, setNewIncomeGoal] = useState(''); // State to track the new income goal entered by the user

    useEffect(() => {
        fetchTicketStatistics();
    }, []);

    const fetchTicketStatistics = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/ticket/statistics');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStatistics(data);
        } catch (error) {
            console.error('Error fetching ticket statistics:', error);
        }
    };

    const calculateProgress = () => {
        if (statistics && statistics["Total Income"]) {
            const totalIncome = statistics["Total Income"];
            return (totalIncome / weeklyIncomeGoal) * 100;
        }
        return 0;
    };

    const handleIncomeGoalChange = () => {
        // Convert newIncomeGoal to a number and update the weeklyIncomeGoal state
        setWeeklyIncomeGoal(parseFloat(newIncomeGoal));
    };

    const renderTicketTypeBarChart = () => {
        if (statistics && statistics["Count By Type"]) {
            const countByType = statistics["Count By Type"];
            const chartData = {
                labels: Object.keys(countByType),
                datasets: [
                    {
                        label: 'Ticket Types',
                        backgroundColor: 'rgba(75, 192, 192, 0.8)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                        hoverBorderColor: 'rgba(75, 192, 192, 1)',
                        data: Object.values(countByType),
                    },
                ],
            };

            // Custom options to increase the size of the chart
            const options = {
                maintainAspectRatio: false,
                responsive: true,
                aspectRatio: 2, // Adjust the aspect ratio as needed
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            };

            return <Bar data={chartData} options={options} />;
        }
        return null;
    };

    const renderTicketStatusPieChart = () => {
        if (statistics && statistics["Count By Status"]) {
            const countByStatus = statistics["Count By Status"];
            const chartData = {
                labels: Object.keys(countByStatus),
                datasets: [
                    {
                        label: 'Ticket Statuses',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                        hoverBackgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                        ],
                        hoverBorderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        data: Object.values(countByStatus),
                    },
                ],
            };

            // Custom options to increase the size of the chart
            const options = {
                maintainAspectRatio: false,
                responsive: true,
                aspectRatio: 2, // Adjust the aspect ratio as needed
            };

            return <Pie data={chartData} options={options} />;
        }
        return null;
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Admin Dashboard</h1>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'stretch', flexWrap: 'wrap' }}>
                <div style={{ margin: '10px', flex: '1 1 300px' }}>
                    <Card title="Ticket Statistics" style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px' }}>
                        <div>
                            <p style={{ fontSize: '18px' }}>Total Tickets: {statistics ? statistics["Total Tickets"] : '-'}</p>
                            <p style={{ fontSize: '18px' }}>Total Income: ${statistics ? statistics["Total Income"] : '-'}</p>
                        </div>
                    </Card>
                </div>
                <div style={{ margin: '10px', flex: '1 1 300px' }}>
                    <Card title="Ticket Charts" style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px' }}>
                        <div>
                            <p style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>Ticket Type:</p>
                            <div>{renderTicketTypeBarChart()}</div>
                            <p style={{ fontSize: '20px', marginBottom: '10px', color: '#333' }}>Ticket Status:</p>
                            <div>{renderTicketStatusPieChart()}</div>
                        </div>
                    </Card>
                </div>
                <div style={{ margin: '10px', flex: '1 1 300px' }}>
                    <Card title="Weekly Income Goal" style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px' }}>
                        <div>
                            <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>Weekly Income Goal</h2>
                            <ProgressBar value={calculateProgress()} displayValueTemplate={(value) => `$${value.toFixed(2)}`} style={{ marginBottom: '20px' }} />
                            <div>
                                <input type="number" value={newIncomeGoal} onChange={(e) => setNewIncomeGoal(e.target.value)} style={{ padding: '5px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '150px' }} />
                                <button onClick={handleIncomeGoalChange} style={{ padding: '7px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>Set Goal</button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
