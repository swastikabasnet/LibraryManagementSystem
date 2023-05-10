import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './logout.css';

function Popup() {
  const [isOpen, setIsOpen] = useState(true);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div class="IssuedBook-body">
    <div class="main">
    <div className="popup-container">
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Logout</h2>
            <p>Would you like to logout?</p>
            <Link to="/admindashboard">
                <button onClick={closePopup}>Cancel</button>
            </Link>
            
            <Link to="/admin">
                <button onClick={closePopup}>Logout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
    </div>
</div>
  );
}

export default Popup;