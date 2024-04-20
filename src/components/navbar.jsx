import React from 'react';
import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import 'primeicons/primeicons.css'; // Import PrimeIcons library

export default function TemplateDemo() {
    let navigate = useNavigate();

    const isLoggedIn = sessionStorage.getItem('loginStatus') === 'true';
    const logedUser = sessionStorage.getItem('username');

  const items = [
    { label: 'Home', icon: 'pi pi-home', url: '/' },
    { label: 'Book Ticket', icon: 'pi pi-ticket', url: '/createTicket' },
    { label: 'Book Event', icon: 'pi pi-star-fill', url: '/createEvent' },
    { label: 'Profile', icon: 'pi pi-user', url: '/profile' },
    { label: 'All Customers', icon: 'pi pi-users', url: '/customers' },
    { label: 'All Admins', icon: 'pi pi-user-plus', url: '/admin' },
    { label: 'AllTickets', icon: 'pi pi-ticket', url: '/tickets' },
    { label: 'AllEvents', icon: 'pi pi-ticket', url: '/event' },
    { label: 'Animals', icon: 'pi pi-paw', url: '/animals' },
    { label: 'AnimalSpecies', icon: 'pi pi-image', url: '/AllAnimalSpecies' },
    { label: 'All Employees', icon: 'pi pi-image', url: '/allemployees' },
    { label: 'Create Animal Species', icon: 'pi pi-paw', url: '/createanimalspecies' },
    { label: 'Create Animal', icon: 'pi pi-plus', url: '/createAnimal' },
    { label: 'Create Customer', icon: 'pi pi-user-plus', url: '/createCustomer' },
    { label: 'QR Scanner', icon: 'pi pi-user-plus', url: '/qrscanner' },
    { label: 'QR Generator', icon: 'pi pi-user-plus', url: '/qrgenerator' },
    { label: 'QR Uploader', icon: 'pi pi-user-plus', url: '/qruploader' }
  ];

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

  const end = (
      <div className="flex align-items-center">

          {!isLoggedIn ? (
              <>
                  <Link to="/login" className="p-menuitem-link">
                      <i className="pi pi-sign-in"></i>
                      <span>Log In</span>
                  </Link>
                  <Link to="/signup" className="p-menuitem-link">
                      <i className="pi pi-angle-up"></i>
                      <span>Sign up</span>
                  </Link>

              </>
          ) : (
              <>

                  <div onClick={handleLogout} className="p-menuitem-link" style={{ cursor: 'pointer' }}>
                      <i className="pi pi-sign-out"></i>
                      <span>Log Out</span>
                  </div>
                  <Link to="/profile" className="p-menuitem-link">
                      <i className="pi pi-user"></i>

                      <span>{logedUser}</span>
                  </Link>
              </>
          )}
      </div>
  );

  return (
    <div className="card" style={{ width: '100%', position: '', top: 0, zIndex: 1000 , margin: 0 }}>
      <Menubar model={items} end={end} />
    </div>
  );
}
