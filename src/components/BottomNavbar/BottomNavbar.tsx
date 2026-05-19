import { NavLink } from 'react-router-dom';
import { HiHomeModern } from "react-icons/hi2";
import { ImUpload } from "react-icons/im";
import { FaUserSecret } from "react-icons/fa";


import './BottomNavbar.css';

const BottomNavbar = () => {
  return (
    <nav className="bottom-navbar">
      {/* to="/" նշանակում է գլխավոր էջ (MainFeed) */}
      <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <HiHomeModern className="nav-icon" />
      </NavLink>

      {/* to="/upload" նշանակում է վերբեռնման էջ */}
      <NavLink to="/upload" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <ImUpload className="nav-icon" />
      </NavLink>

      {/* to="/profile" նշանակում է անձնական էջ */}
      <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <FaUserSecret className="nav-icon" />
      </NavLink>
    </nav>
  );
};

export default BottomNavbar;