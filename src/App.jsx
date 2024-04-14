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
// import Event from './components/allEvents/AllEvents.jsx';
import Animals from './components/allAnimals/AllAnimals.jsx';
import AnimalSpecies from './components/allAnimalSpecies/AllAnimalSpecies.jsx';
import CreateAnimalSpecies from './components/createAnimalSpecies';
import CreateAnimal from "./components/createAnimal.jsx";
import CreateCustomer from "./components/createCustomer.jsx";
import AdminSpecific from "./components/adminSpecific.jsx";
import AnimalSpecific from "./components/animalSpecific.jsx";
import TicketSpecific from "./components/ticketSpecific.jsx";
import CustomerSpecific from "./components/customerSpecific.jsx";
// import EventSpecific from "./components/eventSpecific.jsx";
import AnimalSpeciesSpecific from "./components/animalSpeciesSpecific.jsx";
import CreateTicket from "./components/createTickets.jsx";
// import CreateEvent from "./components/createEvent.jsx";

const queryClient = new QueryClient()
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile/>
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
                    {/* <Route path="/events" element={
                        <ProtectedRoute>
                            <Event/>
                        </ProtectedRoute>
                    }/> */}
                    <Route path="/animals" element={
                        <ProtectedRoute>
                            <Animals/>
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
                    {/* <Route path="/createEvent" element={
                        <ProtectedRoute>
                            <CreateEvent/>
                        </ProtectedRoute>
                    }/> */}
                    <Route path="/adminSpecific/:username" element={
                        <ProtectedRoute>
                            <AdminSpecific/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/animalSpecific/:name" element={
                        <ProtectedRoute>
                            <AnimalSpecific/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/animalSpeciesSpecific/:animalSpeciesId" element={
                        <ProtectedRoute>
                            <AnimalSpeciesSpecific/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/ticketSpecific/:ticketId" element={
                        <ProtectedRoute>
                            <TicketSpecific/>
                        </ProtectedRoute>
                    }/>
                    {/* <Route path="/eventSpecific/:eventID" element={
                        <ProtectedRoute>
                            <EventSpecific/>
                        </ProtectedRoute>
                    }/> */}
                    <Route path="/customerSpecific/:username" element={
                        <ProtectedRoute>
                            <CustomerSpecific/>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;