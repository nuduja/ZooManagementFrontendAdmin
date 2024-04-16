// import React from 'react';
// import { Card } from 'primereact/card';
// import { Divider } from 'primereact/divider';
// import { Button } from 'primereact/button';
// import { ListBox } from 'primereact/listbox';
// import '../styles/footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-cards-container">
//         <Card className="footer-card" title="About Us">
//           <p>Discover the wonders of wildlife at our zoo. Learn about our mission, history, and conservation efforts.</p>
//         </Card>
//         <Divider />
//         <Card className="footer-card" title="Visit Us">
//           <p>Plan your visit and get directions to our zoo. Check our opening hours and admission prices.</p>
//         </Card>
//         <Divider />
//         <Card className="footer-card" title="Contact Us">
//           <p>Get in touch with us for inquiries, feedback, and support. Follow us on social media for the latest updates.</p>
//         </Card>
//       </div>
//       <div className="footer-bottom">
//         <p>&copy; 2024 Zoo Name. All rights reserved.</p>
//         <Button label="Terms of Service" className="p-button-text" />
//         <Button label="Privacy Policy" className="p-button-text" />
//         <Button label="Accessibility" className="p-button-text" />
//       </div>
//     </footer>
//   );
// };


// export default Footer;

import React from 'react';
import '../styles/footer.css'; // Import your CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__parralax">
        <div className="footer__parralax-trees"></div>
        <div className="footer__parralax-moto"></div>
        <div className="footer__parralax-secondplan"></div>
        <div className="footer__parralax-premierplan"></div>
        <div className="footer__parralax-voiture"></div>
      </div>
      <div className="container">
        <div className="footer__columns">
          <div className="footer__col">
            <h3 className="footer__col-title">
              <i data-feather="shopping-bag"></i> <span>La boutique</span></h3>
            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <a href="" className="footer__nav-link">
                    Privacy Policy
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="" className="footer__nav-link">
                    Terms & Conditions
                  </a>
                </li>
                {/* <li className="footer__nav-item">
                  <a href="" className="footer__nav-link">
                    CGV
                  </a>
                </li> */}
                <li className="footer__nav-item">
                  <a href="" className="footer__nav-link">
                    Legal Notices
                  </a>
                </li>
                {/* <li className="footer__nav-item">
                  <a href="" className="footer__nav-link">
                    Règlement concours
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">
              <i data-feather="share-2"></i> <span>Social Media</span></h3>
            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <a href="" className="footer__nav-link">
                    <i data-feather="youtube"></i><span>Youtube</span>
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="" className="footer__nav-link">
                    <i data-feather="facebook"></i><span>Facebook</span>
                  </a>
                </li>
                <li className="footer__nav-item">
                  <a href="" className="footer__nav-link">
                    <i data-feather="instagram"></i><span>Instagram</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer__col">
            <h3 className="footer__col-title">
              <i data-feather="send"></i> <span>Contact</span></h3>
            <nav className="footer__nav">
              <ul className="footer__nav-list">
                <li className="footer__nav-item">
                  <a href="mailto:contact.laboiserie@gmail.com" className="footer__nav-link">
                    contactZoo@gmail.com
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* <div className="footer__copyrights">
          <p>Réalisé par <a href="https://twitter.com/silvereledev" target="_blank">@SilvereLeDev</a></p>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;