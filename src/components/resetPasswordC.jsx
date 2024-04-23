import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import '../styles/resetPassword.css';

const ResetPassword = () => {
    let navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleResetPassword = () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }

        // Implement your password reset logic here
        console.log("Resetting password...");
        setError('');
        navigate('/profile');
    };

    return (
        <div className="reset-password-container">
            <Card title="Reset Password" className="reset-password-card">
                {error && <p className="error-message">{error}</p>}
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="oldPassword">Old Password</label>
                        <InputText id="oldPassword" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="newPassword">New Password</label>
                        <InputText id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <InputText id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="p-field">
                        <Button label="Reset Password" onClick={handleResetPassword} />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ResetPassword;
