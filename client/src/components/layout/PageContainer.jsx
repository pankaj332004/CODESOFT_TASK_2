import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export const PageContainer = ({
  children,
  hideNavbar = false,
  hideFooter = false,
  className = '',
  maxWidth = '1200px',
}) => {
  return (
    <div className="qm-app-layout">
      {!hideNavbar && <Navbar />}
      <main
        className={`qm-main-content ${className}`}
        style={{ maxWidth }}
      >
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default PageContainer;
