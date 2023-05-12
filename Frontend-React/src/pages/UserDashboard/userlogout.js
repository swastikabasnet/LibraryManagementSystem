import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../../UserDashboardcss/logout.css';

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
                <Link to="/dashboard">
                  <button onClick={closePopup}>Cancel</button>
                </Link>

                <Link
                  onClick={() => {
                    localStorage.clear(); // clear all items in localStorage
                    sessionStorage.clear(); // clear all items in sessionStorage
                  }}
                  to="/login/*">
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