import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { Bar, Pie } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // Import the date-fns adapter for Chart.js
import { Chart, CategoryScale, LinearScale, BarController, BarElement, PieController, ArcElement } from 'chart.js'; // Import necessary modules from Chart.js
import '../styles/home.css';

// Register necessary scale modules
Chart.register(CategoryScale, LinearScale, BarController, BarElement, PieController, ArcElement);

const AdminDashboard = () => {
    const [statistics, setStatistics] = useState(null);
    const weeklyIncomeGoal = 1000; // Example weekly income revenue goal

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

    const renderTicketTypeBarChart = () => {
      if (statistics && statistics["Count By Type"]) {
          const countByType = statistics["Count By Type"];
          const chartData = {
              labels: Object.keys(countByType),
              datasets: [
                  {
                      label: 'Ticket Types',
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
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
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(255, 206, 86, 0.2)',
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                      ],
                      borderWidth: 1,
                      hoverBackgroundColor: [
                          'rgba(255, 99, 132, 0.4)',
                          'rgba(54, 162, 235, 0.4)',
                          'rgba(255, 206, 86, 0.4)',
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
    <div className="admin-dashboard-container">
        <h1>Admin Dashboard</h1>
        {statistics ? (
            <div className="statistics-cards-container">
                <Card title="Ticket Statistics" className="statistics-card">
                    <div className="ticket-statistics">
                        <p>Total Tickets: {statistics["Total Tickets"]}</p>
                        <p>Total Income: ${statistics["Total Income"]}</p>
                    </div>
                </Card>
                <Card title="Ticket Charts" className="statistics-card">
                    <div className="chart-section">
                    <p>Ticket Type:</p>
                        <div className="chart">{renderTicketTypeBarChart()}</div>
                        <p>Ticket Status:</p>
                        <div className="chart">{renderTicketStatusPieChart()}</div>
                    </div>
                </Card>
                <Card title="Weekly Income Goal" className="statistics-card">
                    <div className="progress-bar-section">
                        <h2>Weekly Income Goal</h2>
                        <ProgressBar value={calculateProgress()} displayValueTemplate={(value) => `$${value.toFixed(2)}`} />
                    </div>
                </Card>
            </div>
        ) : (
            <p>Loading ticket statistics...</p>
        )}
    </div>
);

}
export default AdminDashboard;
