import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; // Assuming you have some custom styles
import Logo from '../assets/welcome.jpg'; // Path to your logo image

export default function AdminNavbar() {
  const items = [
    { label: 'Dashboard', icon: 'pi pi-home', url: '/' },
    { label: 'Manage Tickets', icon: 'pi pi-ticket', url: '/createtickets' },
    { label: 'Manage Events', icon: 'pi pi-star', url: '/events' }, // Changed icon name
    { label: 'Profile', icon: 'pi pi-user', url: '/profile' },
    { label: 'All Customers', icon: 'pi pi-users', url: '/customers' }, // Changed icon name
    { label: 'All Admins', icon: 'pi pi-users', url: '/admin' }, // Changed icon name
    { label: 'All Tickets', icon: 'pi pi-ticket', url: '/tickets' }, // Changed icon name
    { label: 'All Animals', icon: 'pi pi-paw', url: '/animals' }, // Changed icon name
    { label: 'All Animal Species', icon: 'pi pi-clone', url: '/animalspecies' }, // Changed icon name
  ];

  const start = (
    <img
      alt="logo"
      src={Logo}
      height="40"
      className="mr-2"
    />
  );

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
        <i className="pi pi-user-plus"></i> {/* Changed icon name */}
        <span>Sign up</span>
      </Link>
    </div>
  );

  return (
    <div className="navbar-container">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
