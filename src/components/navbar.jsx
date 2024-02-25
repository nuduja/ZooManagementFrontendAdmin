import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
// import Logo from '../assets/welcome.jpg';

export default function TemplateDemo() {
  const items = [
    { label: 'Home', icon: 'pi pi-home', url: '/' },
    { label: 'Book Ticket', icon: 'pi pi-ticket', url: '/createticket' },
    { label: 'Book Event', icon: 'pi pi-star-fill', url: '/event' },
    { label: 'Profile', icon: 'pi pi-user', url: '/profile' },
    { label: 'Contact', icon: 'pi pi-envelope', url: '/contact' },
    { label: 'About Us', icon: 'pi pi-info-circle', url: '/about' },
    { label: 'All Customers', icon: 'pi pi-info-circle', url: '/customers' },
    { label: 'All Admins', icon: 'pi pi-info-circle', url: '/admin' },
    { label: 'AllTickets', icon: 'pi pi-info-circle', url: '/tickets' },
    { label: 'AllAnimals', icon: 'pi pi-info-circle', url: '/animals' },
    { label: 'AllAnimalSpecies', icon: 'pi pi-info-circle', url: '/animalspecies' },
    { label: 'CreateAnimalSpecies', icon: 'pi pi-info-circle', url: '/createanimalspecies' },
  ];

  // const start = (
  //   <img
  //     alt="logo"
  //     src={Logo}
  //     height="40"
  //     className="mr-2"
  //   ></img>
  // );

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
        <i className="pi pi-angle-up"></i>
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