import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {QueryClientProvider, QueryClient} from 'react-query';
// import './index.css'; // or import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './components/profile';
import Admin from './components/allAdmins/AllAdmins.jsx';
import Customer from './components/allCustomers/AllCustomers.jsx';
import Ticket from './components/allTickets/AllTickets.jsx';
// import Event from './components/allEvents/AllEvents.jsx';
import Animals from './components/AllAnimals.jsx';
import AnimalSpecies from './components/AllAnimalSpecies.jsx';
import CreateAnimalSpecies from './components/createAnimalSpecies';
// import CreateAnimal from "./components/createAnimal.jsx";
import CreateCustomer from "./components/createCustomer.jsx";
import AdminSpecific from "./components/adminSpecific.jsx";
// import AnimalSpecific from "./components/animalSpecific.jsx";
import TicketSpecific from "./components/ticketSpecific.jsx";
// import CustomerSpecific from "./components/customerSpecific.jsx";
// import EventSpecific from "./components/eventSpecific.jsx";
// import AnimalSpeciesSpecific from "./components/animalSpeciesSpecific.jsx";
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
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/customers" element={<Customer/>}/>
                    <Route path="/tickets" element={<Ticket/>}/>
                    {/* <Route path="/events" element={<Event/>}/> */}
                    <Route path="/animals" element={<Animals/>}/>
                    <Route path="/animalspecies" element={<AnimalSpecies/>}/>
                    <Route path="/createanimalspecies" element={<CreateAnimalSpecies/>}/>
                    {/* <Route path="/createAnimal" element={<CreateAnimal/>}/> */}
                    <Route path="/createCustomer" element={<CreateCustomer/>}/>
                    <Route path="/createTicket" element={<CreateTicket/>}/>
                    {/* <Route path="/createEvent" element={<CreateEvent/>}/> */}
                    {/* <Route path="/adminSpecific/:username" element={<AdminSpecific/>}/> */}
                    {/* <Route path="/animalSpecific/:name" element={<AnimalSpecific/>}/> */}
                    {/* <Route path="/animalSpeciesSpecific/:name" element={<AnimalSpeciesSpecific/>}/> */}
                    <Route path="/ticketSpecific/:ticketId" element={<TicketSpecific/>}/>
                    {/* <Route path="/eventSpecific/:eventID" element={<EventSpecific/>}/> */}
                    {/* <Route path="/customerSpecific/:username" element={<CustomerSpecific/>}/> */}
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;