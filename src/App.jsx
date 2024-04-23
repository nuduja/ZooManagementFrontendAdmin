import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {QueryClientProvider, QueryClient} from 'react-query';
import {ProtectedRoute} from './validators/ProtectedRoute.jsx'
import Navbar from './components/navbar';
import Home from './components/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './components/profile';
import Admin from './components/allAdmins/AllAdmins.jsx';
import Customer from './components/allCustomers/AllCustomers.jsx';
import Ticket from './components/allTickets/AllTickets.jsx';
import Event from './components/allEvents/AllEvent.jsx';
import Animals from './components/allAnimals/AllAnimals.jsx';
import AnimalSpecies from './components/allAnimalSpecies/AllAnimalSpecies.jsx';
import CreateAnimalSpecies from './components/createAnimalSpecies';
import CreateAnimal from "./components/createAnimal.jsx";
import CreateCustomer from "./components/createCustomer.jsx";
import AdminSpecific from "./components/adminSpecific.jsx";
import AnimalSpecific from "./components/animalSpecific.jsx";
import TicketSpecific from "./components/ticketSpecific.jsx";
import CustomerSpecific from "./components/customerSpecific.jsx";
import EventSpecific from "./components/eventSpecific.jsx";
import AnimalSpeciesSpecific from "./components/animalSpeciesSpecific.jsx";
import CreateTicket from "./components/createTickets.jsx";
import CreateEvent from "./components/createEvent.jsx";
import Footer from './components/footer.jsx';
import EditTicket from './components/editTicket.jsx';
import EditAdmin from './components/editAdmin.jsx';
import EditCustomer from './components/editCustomer.jsx';
import EditAnimalSpeciesSpecific from './components/editAnimalSpeciesSpecific.jsx';
import EditAnimal from './components/editAnimal.jsx';
import AllEmployees from './components/AllEmployees.jsx';
import EmployeeSpecific from './components/employeeSpecific.jsx';
import EditEmployee from './components/editEmployee.jsx';
import QRUploader from "./components/QRUploader.jsx";
import QRCodeGenerator from "./components/QRCodeGenerator.jsx";
import QRScanner from "./components/QRScanner.jsx";
import EditEvent from './components/editEvent.jsx';
import EditProfile from "./components/editProfile.jsx";
import CreateEmployee from './components/createEmployee.jsx';
import ResetPassword from './components/resetPassword.jsx';
import ResetPasswordC from './components/resetPasswordC.jsx';
import ResetPasswordA from './components/resetPasswordA.jsx';
import MedicalRecordSpecific from './components/medicalRecordsSpecific.jsx';
import CreateMedicalRecord from './components/createmedicalrecord.jsx';
import AllMedicalRecords from './components/Allmedicalrecords.jsx';
import EditMedicalRecord from './components/editMedicalRecord.jsx';


const queryClient = new QueryClient()
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Home/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/editprofile" element={
                        <ProtectedRoute>
                            <EditProfile/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/qruploader" element={
                        <ProtectedRoute>
                            <QRUploader/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/qrscanner" element={
                        <ProtectedRoute>
                            <QRScanner/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/qrgenerator" element={
                        <ProtectedRoute>
                            <QRCodeGenerator/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <Admin/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/customers" element={
                        <ProtectedRoute>
                            <Customer/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/tickets" element={
                        <ProtectedRoute>
                            <Ticket/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/animals" element={
                        <ProtectedRoute>
                            <Animals/>
                        </ProtectedRoute>
                    }/>E
                    <Route path="/allemployees" element={
                        <ProtectedRoute>
                            <AllEmployees/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/createEmployee" element={
                        <ProtectedRoute>
                            <CreateEmployee/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/employeeSpecific/:employeeId" element={
                        <ProtectedRoute>
                            <EmployeeSpecific/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/employee/edit/:employeeId" element={
                        <ProtectedRoute>
                            <EditEmployee/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/animalspecies" element={
                        <ProtectedRoute>
                            <AnimalSpecies/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/createanimalspecies" element={
                        <ProtectedRoute>
                            <CreateAnimalSpecies/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/createAnimal" element={
                        <ProtectedRoute>
                            <CreateAnimal/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/createCustomer" element={
                        <ProtectedRoute>
                            <CreateCustomer/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/createTicket" element={
                        <ProtectedRoute>
                            <CreateTicket/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/createEvent" element={
                        <ProtectedRoute>
                            <CreateEvent/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/createmedicalrecord" element={
                        <ProtectedRoute>
                            <CreateMedicalRecord/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/adminSpecific/:adminId" element={
                        <ProtectedRoute>
                            <AdminSpecific/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/admin/edit/:adminId" element={
                        <ProtectedRoute>
                            <EditAdmin/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/animalSpecific/:animalId" element={
                        <ProtectedRoute>
                            <AnimalSpecific/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/animalEdit/:animalId" element={
                        <ProtectedRoute>
                            <EditAnimal/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/animalSpeciesSpecific/:animalSpeciesId" element={
                        <ProtectedRoute>
                            <AnimalSpeciesSpecific/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/animalspecies/edit/:animalSpeciesId" element={
                        <ProtectedRoute>
                            <EditAnimalSpeciesSpecific/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/ticketSpecific/:ticketId" element={
                        <ProtectedRoute>
                            <TicketSpecific/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/event" element={
                        <ProtectedRoute>
                            <Event/>
                        </ProtectedRoute>
                    }/>
                    
                    <Route path="/ticket/edit/:ticketId" element={
                        <ProtectedRoute>
                            <EditTicket/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/eventSpecific/:eventID" element={
                        <ProtectedRoute>
                            <EventSpecific/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/editEvent/:eventID" element={
                        <ProtectedRoute>
                            <EditEvent/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/customerSpecific/:userId" element={
                        <ProtectedRoute>
                            <CustomerSpecific/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/customer/edit/:userId" element={
                        <ProtectedRoute>
                            <EditCustomer/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/AllAnimalSpecies" element={
                        <ProtectedRoute>
                            <AnimalSpecies/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/resetPassword" element={
                    <ProtectedRoute>
                        <ResetPassword />
                    </ProtectedRoute>
                } />
                <Route path="/resetPasswordC" element={
                    <ProtectedRoute>
                        <ResetPasswordC />
                    </ProtectedRoute>
                } />
                 <Route path="/resetPasswordA" element={
                    <ProtectedRoute>
                        <ResetPasswordA />
                    </ProtectedRoute>
                } />
                <Route path="/medicalRecordsSpecific/:animalId" element={
                    <ProtectedRoute>
                        <MedicalRecordSpecific />
                    </ProtectedRoute>
                } />
                <Route path="/medicalrecord/edit/:medicalRecordId" element={
                        <ProtectedRoute>
                            <EditMedicalRecord/>
                        </ProtectedRoute>
                    }/>
                <Route path="/allmedicalrecords" element={
                        <ProtectedRoute>
                            <AllMedicalRecords/>
                        </ProtectedRoute>
                    }/>
                 {/* <Route path="/medicalRecordSpecific/:medicalRecordId" component={MedicalRecordSpecific} /> */}

                </Routes>
                <Footer/>
            </Router>
        </QueryClientProvider>
    );
}

export default App;