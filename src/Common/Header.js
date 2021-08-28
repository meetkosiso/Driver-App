import React from "react";

function Header({ logout }) {
  return (
    <div className="container-header">
      <p className="header-item">Driver APP</p>
      <button
        id="logout-button"
        onClick={() => logout({ returnTo: window.location.origin })}
        className="right-header-item"
      >
        Logout
      </button>
    </div>
  );
}

export default Header;
