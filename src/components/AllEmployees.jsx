import React, { useEffect, useState, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const AllEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [name, setName] = useState('');
    const [nic, setNic] = useState('');
    const [position, setPosition] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [employeeId, name, nic, position, gender, first, rows]);

    const fetchData = async () => {
        setLoading(true);
        const queryParams = new URLSearchParams({
            employeeId: employeeId,
            name: name,
            nic: nic,
            position: position,
            gender: gender
        });
        try {
            const response = await fetch(`http://localhost:8080/api/v1/employee/searchEmployee?${queryParams}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching Employees data:', error);
        } finally {
            setLoading(false);
        }
    };

    const viewDetailsButton = (rowData) => {
        return (
            <Button
                label="View Details"
                className="p-button-secondary"
                onClick={() => viewDetails(rowData)}
            />
        );
    };
    

    const viewDetails = (rowData) => {
        navigate(`/employeeSpecific/${rowData.employeeId}`);
    };

    const handleDownload = () => {
        fetch('http://localhost:8080/api/v1/employee/pdf', {
            method: 'GET',
            headers: {
                'Accept': 'application/pdf',
            },
        }).then((response) => response.blob())
            .then((blob) => {
                const fileURL = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', 'employees.pdf');
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
            { field: 'employeeId', header: 'Employee ID', sortable: true },
            { field: 'name', header: 'Name', sortable: true },
            { field: 'nic', header: 'NIC', sortable: true },
            { field: 'position', header: 'Position', sortable: true },
            { field: 'gender', header: 'Gender', sortable: true },
            { header: 'Actions', body: viewDetailsButton, headerStyle: { width: '8rem' }, bodyStyle: { textAlign: 'center' } }
        ],
        []
    );

    return (
        <div className="p-grid p-fluid">
            <div className="p-col-12">
                <h3 className="section-title">All Employees</h3>
                <div className="p-grid p-formgrid">
                    <div className="p-col-3">
                        <InputText
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            placeholder="Employee ID"
                        />
                    </div>
                    <div className="p-col-3">
                        <InputText
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                    </div>
                    <div className="p-col-3">
                        <InputText
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                            placeholder="NIC"
                        />
                    </div>
                    <div className="p-col-3">
                        <InputText
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder="Position"
                        />
                    </div>
                    <div className="p-col-3">
                        <Dropdown
                            value={gender}
                            options={[
                                { label: 'MALE', value: 'MALE' },
                                { label: 'FEMALE', value: 'FEMALE' },
                                { label: 'OTHER', value: 'OTHER' }
                            ]}
                            onChange={(e) => setGender(e.target.value)}
                            placeholder="Select Gender"
                        />
                    </div>
                    <div className="p-col-12">
                        {loading && <ProgressSpinner />}
                        <DataTable 
                            value={employees} 
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
                                <Column key={col.field || col.header} field={col.field} header={col.header} sortable={col.sortable} body={col.body} headerStyle={col.headerStyle} bodyStyle={col.bodyStyle} />
                            ))}
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

export default AllEmployees;
