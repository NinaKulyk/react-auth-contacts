import { useDispatch, useSelector } from "react-redux";
import s from "./Contact.module.css";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { deleteContactThunk } from "../../redux/contacts/contactsOps";
import {
  openModal,
  setModalType,
  setSelectedContactId,
} from "../../redux/contacts/contactsSlice";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(setSelectedContactId(id));
    dispatch(setModalType("edit"));
    dispatch(openModal());
  };

  const handleConfirmDelete = () => {
    dispatch(setSelectedContactId(id));
    dispatch(setModalType("confirm"));
    dispatch(openModal());
  };

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
      <div className={s.btnWrapper}>
        <button id={id} type="button" onClick={handleEditClick}>
          Edit
        </button>
        <button id={id} type="button" onClick={handleConfirmDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Contact;
