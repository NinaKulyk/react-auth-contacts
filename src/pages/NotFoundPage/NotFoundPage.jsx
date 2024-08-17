import s from "./NotFoundPage.module.css";
import { FaRegSadTear } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={s.wrapper}>
      <FaRegSadTear size="200" />
      <p className={s.text}>Page is not found</p>
      <button type="button">
        <NavLink className={s.link} to="/">
          Back Home
        </NavLink>
      </button>
    </div>
  );
};

export default NotFoundPage;
