import s from "./UserMenu.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/auth/operations";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const UserMenu = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink to="/contacts" className={buildLinkClass}>
            Contacts
          </NavLink>
        </li>
        <li className={s.item}>
          <button className={s.btn} onClick={() => dispatch(logoutThunk())}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
