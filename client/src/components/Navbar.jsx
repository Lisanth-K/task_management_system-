import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <LayoutDashboard size={24} />
        <span>TaskFlow</span>
      </div>
      <div>
        {/* Future expansion: User profile or settings */}
      </div>
    </nav>
  );
};

export default Navbar;
