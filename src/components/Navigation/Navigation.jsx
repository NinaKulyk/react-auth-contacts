import s from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  return (
    <div>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/contacts" className={buildLinkClass}>
            Contacts
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
