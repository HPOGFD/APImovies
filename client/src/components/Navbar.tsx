import { NavLink } from 'react-router-dom';

const NavTabs = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/watchlist"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Watchlist
        </NavLink>
      </li>
    </ul>
  );
};

export default NavTabs;