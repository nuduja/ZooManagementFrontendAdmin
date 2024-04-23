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
            navigate(-1);
        } catch (error) {
            console.error('Error deleting Employee:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/employee/edit/${employeeId}`);
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20px',
        },
        title: {
            fontSize: '24px',
            marginBottom: '20px',
        },
        spinner: {
            width: '50px',
            height: '50px',
            marginBottom: '20px',
        },
        card: {
            width: '400px',
            marginBottom: '20px',
        },
        content: {
            padding: '10px',
        },
        item: {
            marginBottom: '10px',
        },
        actions: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Employee Specific Data</h1>
            {loading ? (
                <ProgressSpinner style={styles.spinner} />
            ) : (
                <Card style={styles.card}>
                    <div style={styles.content}>
                        <div style={styles.item}>
                            <strong>ID:</strong> {employeeData?.id}
                        </div>
                        <div style={styles.item}>
                            <strong>Employee ID:</strong> {employeeData?.employeeId}
                        </div>
                        <div style={styles.item}>
                            <strong>Name:</strong> {employeeData?.name}
                        </div>
                        <div style={styles.item}>
                            <strong>NIC:</strong> {employeeData?.nic}
                        </div>
                        <div style={styles.item}>
                            <strong>Position:</strong> {employeeData?.position}
                        </div>
                        <div style={styles.item}>
                            <strong>Gender:</strong> {employeeData?.gender}
                        </div>
                        <div style={styles.item}>
                            <strong>Address:</strong> {employeeData?.address}
                        </div>
                        <div style={styles.item}>
                            <strong>Phone:</strong> {employeeData?.phone}
                        </div>
                        <div style={styles.item}>
                            <strong>Date of Birth:</strong> {employeeData?.dob}
                        </div>
                    </div>
                    <div style={styles.actions}>
                        <Button label="Edit" icon="pi pi-pencil" className="p-button-primary" onClick={handleEdit} />
                        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={() => handleDelete(employeeData?.id)} />
                    </div>
                </Card>
            )}
        </div>
    );
};

export default EmployeeSpecific;
