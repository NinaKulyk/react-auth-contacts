import s from "./UserMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/slice";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={s.container}>
      <h3 className={s.username}>{user.name}</h3>
      <ul className={s.list}>
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
