import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

const EmployeeSpecific = () => {
    const navigate = useNavigate();
    const { employeeId } = useParams();
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/employee/${employeeId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployeeData(data);
            } catch (error) {
                console.error('Error fetching Employee data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, [employeeId]);

    const handleDelete = async (employeeID) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/employee/${employeeID}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete Employee');
            }
            navigate('/employees');
        } catch (error) {
            console.error('Error deleting Employee:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/employee/edit/${employeeId}`);
    };

    return (
        <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
            <h1>Employee Specific Data</h1>
            {loading ? (
                <ProgressSpinner style={{ width: '50px', height: '50px' }} />
            ) : (
                <Card style={{ width: '400px' }} className="p-mb-2">
                    <div className="p-grid p-dir-col p-p-2">
                        <div className="p-col">
                            <strong>ID:</strong> {employeeData?.id}
                        </div>
                        <div className="p-col">
                            <strong>Employee ID:</strong> {employeeData?.employeeId}
                        </div>
                        <div className="p-col">
                            <strong>Name:</strong> {employeeData?.name}
                        </div>
                        <div className="p-col">
                            <strong>NIC:</strong> {employeeData?.nic}
                        </div>
                        <div className="p-col">
                            <strong>Position:</strong> {employeeData?.position}
                        </div>
                        <div className="p-col">
                            <strong>Gender:</strong> {employeeData?.gender}
                        </div>
                        <div className="p-col">
                            <strong>Address:</strong> {employeeData?.address}
                        </div>
                        <div className="p-col">
                            <strong>Phone:</strong> {employeeData?.phone}
                        </div>
                        <div className="p-col">
                            <strong>Date of Birth:</strong> {employeeData?.dob}
                        </div>
                    </div>
                    <div className="p-col">
                        <Button label="Edit" icon="pi pi-pencil" className="p-button-primary p-mr-2" onClick={handleEdit} />
                        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDelete(employeeData?.id)} />
                    </div>
                </Card>
            )}
        </div>
    );
};

export default EmployeeSpecific;
