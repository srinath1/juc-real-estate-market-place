import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const active = false;
  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            className={`nav-link h5 ${active ? " bg-success" : ""} `}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={`nav-link h5 ${active ? " bg-success" : ""} `}
            to="/user/wishlist"
          >
            Wishlist
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={`nav-link h5 ${active ? " bg-success" : ""} `}
            to="/user/enquiries"
          >
            Enquiries
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link h5" to="/ad/create">
            Create Ad
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link h5" to="/user/profile">
            Update Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link h5" to="/user/settings">
            Settings
          </NavLink>
        </li>
      </ul>
    </>
  );
}
