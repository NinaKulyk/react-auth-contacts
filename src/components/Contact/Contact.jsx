import { useDispatch } from "react-redux";
import s from "./Contact.module.css";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { deleteContactThunk } from "../../redux/contacts/contactsOps";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();
  return (
    <div className={s.wrapper}>
      <div>
        <p>
          <FaUser />
          {name}
        </p>
        <p>
          <FaPhoneAlt />
          {number}
        </p>
      </div>
      <button
        id={id}
        type="button"
        onClick={() => dispatch(deleteContactThunk(id))}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
