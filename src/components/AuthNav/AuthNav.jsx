import s from "./AuthNav.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const AuthNav = () => {
  return (
    <div>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink to="/register" className={buildLinkClass}>
            Sign Up
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="login" className={buildLinkClass}>
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AuthNav;
