import { useSelector } from "react-redux";
import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import s from "./AppBar.module.css";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/authSlice";
import { Outlet } from "react-router-dom";

const AppBar = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <header className={s.header}>
        <Navigation />
        <h3 className={s.username}>{user.name}</h3>
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </header>
      <Outlet />
    </div>
  );
};

export default AppBar;
