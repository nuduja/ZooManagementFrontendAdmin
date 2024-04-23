import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import '../styles/editEmployee.css'; // Import CSS file

const EditEmployee = () => {
    const navigate = useNavigate();
    const { employeeId } = useParams();
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editedEmployeeData, setEditedEmployeeData] = useState({
        name: '',
        position: '',
        nic: '',
        address: '',
        phone: '',
        gender: '',
        dob: '',
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        position: '',
        nic: '',
        address: '',
        phone: '',
        gender: '',
        dob: '',
    });

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/employee/${employeeId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployeeData(data);
                setEditedEmployeeData({
                    name: data.name,
                    position: data.position,
                    nic: data.nic,
                    address: data.address,
                    phone: data.phone,
                    gender: data.gender,
                    dob: data.dob,
                });
            } catch (error) {
                console.error('Error fetching Employee data:', error);
                setErrorMsg('Failed to fetch Employee data');
                setShowErrorDialog(true);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, [employeeId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEmployeeData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Validate each field individually
        switch (name) {
            case 'name':
                setValidationErrors(prevErrors => ({
                    ...prevErrors,
                    name: value.trim() ? '' : 'Name is required',
                }));
                break;
            case 'position':
                setValidationErrors(prevErrors => ({
                    ...prevErrors,
                    position: value.trim() ? '' : 'Position is required',
                }));
                break;
            case 'nic':
                setValidationErrors(prevErrors => ({
                    ...prevErrors,
                    nic: value.trim() ? '' : 'NIC is required',
                }));
                break;
            case 'address':
                setValidationErrors(prevErrors => ({
                    ...prevErrors,
                    address: value.trim() ? '' : 'Address is required',
                }));
                break;
            case 'phone':
                setValidationErrors(prevErrors => ({
                    ...prevErrors,
                    phone: /^\d{10}$/.test(value) ? '' : 'Phone number must be 10 digits',
                }));
                break;
            case 'gender':
                setValidationErrors(prevErrors => ({
                    ...prevErrors,
                    gender: value.trim() ? '' : 'Gender is required',
                }));
                break;
            case 'dob':
                setValidationErrors(prevErrors => ({
                    ...prevErrors,
                    dob: value.trim() ? '' : 'Date of birth is required',
                }));
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if there are any validation errors before submitting the form
        const isValid = Object.values(validationErrors).every(error => !error);
        if (!isValid) {
            setErrorMsg('Please fill in all required fields correctly');
            setShowErrorDialog(true);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1/employee/updatebyemployeeid/${employeeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedEmployeeData),
            });

            if (!response.ok) {
                throw new Error('Failed to update Employee data');
            }

            setSuccessMsg('Employee data updated successfully');
            setErrorMsg('');
            setShowSuccessDialog(true);
        } catch (error) {
            console.error('Error updating Employee data:', error);
            setErrorMsg('Failed to update Employee data');
            setShowErrorDialog(true);
        }
    };

    const onHideDialog = () => {
        setShowSuccessDialog(false);
        setShowErrorDialog(false);
        if (successMsg) {
            navigate(-1);
        }
    };

    return (
        <div className="edit-employee-container">
            <h1>Edit Employee Data</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form className="edit-employee-form" onSubmit={handleSubmit}>
                    <div className="p-field">
                        <label htmlFor="name">Name:</label>
                        <InputText
                            id="name"
                            name="name"
                            value={editedEmployeeData.name}
                            onChange={handleInputChange}
                            className={validationErrors.name ? 'p-invalid' : ''}
                        />
                        <small className="p-error">{validationErrors.name}</small>
                    </div>
                    <div className="p-field">
                        <label htmlFor="position">Position:</label>
                        <InputText
                            id="position"
                            name="position"
                            value={editedEmployeeData.position}
                            onChange={handleInputChange}
                            className={validationErrors.position ? 'p-invalid' : ''}
                        />
                        <small className="p-error">{validationErrors.position}</small>
                    </div>
                    <div className="p-field">
                        <label htmlFor="nic">NIC:</label>
                        <InputText
                            id="nic"
                            name="nic"
                            value={editedEmployeeData.nic}
                            onChange={handleInputChange}
                            className={validationErrors.nic ? 'p-invalid' : ''}
                        />
                        <small className="p-error">{validationErrors.nic}</small>
                    </div>
                    <div className="p-field">
                        <label htmlFor="address">Address:</label>
                        <InputText
                            id="address"
                            name="address"
                            value={editedEmployeeData.address}
                            onChange={handleInputChange}
                            className={validationErrors.address ? 'p-invalid' : ''}
                        />
                        <small className="p-error">{validationErrors.address}</small>
                    </div>
                    <div className="p-field">
                        <label htmlFor="phone">Phone:</label>
                        <InputText
                            id="phone"
                            name="phone"
                            value={editedEmployeeData.phone}
                            onChange={handleInputChange}
                            className={validationErrors.phone ? 'p-invalid' : ''}
                        />
                        <small className="p-error">{validationErrors.phone}</small>
                    </div>
                    <div className="p-field">
                        <label htmlFor="gender">Gender:</label>
                        <Dropdown
                            id="gender"
                            name="gender"
                            value={editedEmployeeData.gender}
                            options={['MALE', 'FEMALE', 'OTHER']}
                            onChange={handleInputChange}
                            placeholder="Select Gender"
                            className={validationErrors.gender ? 'p-invalid' : ''}
                        />
                        <small className="p-error">{validationErrors.gender}</small>
                    </div>
                    <div className="p-field">
                        <label htmlFor="dob">Date of Birth:</label>
                        <InputText
                            id="dob"
                            name="dob"
                            value={editedEmployeeData.dob}
                            onChange={handleInputChange}
                            className={validationErrors.dob ? 'p-invalid' : ''}
                        />
                        <small className="p-error">{validationErrors.dob}</small>
                    </div>
                    <Button type="submit" label="Update" />
                </form>
            )}

            <Dialog
                visible={showSuccessDialog}
                onHide={onHideDialog}
                header="Success"
                footer={<Button label="OK" onClick={onHideDialog} />}
            >
                <p>{successMsg}</p>
            </Dialog>

            <Dialog
                visible={showErrorDialog}
                onHide={onHideDialog}
                header="Error"
                footer={<Button label="OK" onClick={onHideDialog} />}
            >
                <p>{errorMsg}</p>
            </Dialog>
        </div>
    );
};

export default EditEmployee;
