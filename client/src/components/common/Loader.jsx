import React from 'react';

export const Loader = ({ message = 'Loading...', fullScreen = false }) => {
  return (
    <div className={`qm-loader-container ${fullScreen ? 'full-screen' : ''}`}>
      <div className="qm-loader-orb">
        <div className="qm-orb-core"></div>
      </div>
      {message && <p className="qm-loader-text">{message}</p>}
    </div>
  );
};

export default Loader;
