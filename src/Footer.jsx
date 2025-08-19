import React from 'react';


const Footer = () => {

  return (
    // <div>
      <footer className="footer bg-gray-900">
        <div className="footer-content py-1">
          <p className="footer-logo">PacificWebsite</p>
          <p className="copyright">© {new Date().getFullYear()} PacificWebsite. All rights reserved.</p>
        </div>
      </footer>
    // </div>
  );
};

export default Footer;
