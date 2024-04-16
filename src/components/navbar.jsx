import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import 'primeicons/primeicons.css'; // Import PrimeIcons library

export default function TemplateDemo() {
  const items = [
    { label: 'Home', icon: 'pi pi-home', url: '/' },
    { label: 'Book Ticket', icon: 'pi pi-ticket', url: '/createTicket' },
    { label: 'Profile', icon: 'pi pi-user', url: '/profile' },
    { label: 'All Customers', icon: 'pi pi-users', url: '/customers' },
    { label: 'All Admins', icon: 'pi pi-user-plus', url: '/admin' },
    { label: 'AllTickets', icon: 'pi pi-ticket', url: '/tickets' },
    { label: 'Animals', icon: 'pi pi-paw', url: '/animals' },
    { label: 'AnimalSpecies', icon: 'pi pi-image', url: '/AllAnimalSpecies' },
    { label: 'Create Animal Species', icon: 'pi pi-paw', url: '/createanimalspecies' },
    { label: 'Create Animal', icon: 'pi pi-plus', url: '/createAnimal' },
    { label: 'Create Customer', icon: 'pi pi-user-plus', url: '/createCustomer' }
  ];

  const end = (
    <div className="flex align-items-center">
      <Link to="/login" className="p-menuitem-link">
        <i className="pi pi-sign-in"></i>
        <span>Log In</span>
      </Link>
      <Link to="/logout" className="p-menuitem-link">
        <i className="pi pi-sign-out"></i>
        <span>Log Out</span>
      </Link>
      <Link to="/signup" className="p-menuitem-link">
        <i className="pi pi-user-plus"></i>
        <span>Sign up</span>
      </Link>
    </div>
  );

  return (
    <div className="card" style={{ width: '100%', position: '', top: 0, zIndex: 1000 , margin: 0 }}>
      <Menubar model={items} end={end} />
    </div>
  );
}
