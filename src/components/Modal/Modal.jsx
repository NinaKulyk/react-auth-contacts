import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./Modal.module.css";
import ReactModal from "react-modal";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  selectContactById,
  selectIsModalOpen,
  selectSelectedContactId,
} from "../../redux/contacts/contactsSlice";
import { editContactThunk } from "../../redux/contacts/contactsOps";

ReactModal.setAppElement("#root");

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required!")
    .min(3, "Name must be more than 3 chars!")
    .max(20, "Name must be less than 20 chars!"),
  number: Yup.number()
    .typeError("It's not a number!")
    .required("Number is required!"),
});

const Modal = ({ id }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const selectedContactId = useSelector(selectSelectedContactId);
  const contact = useSelector((state) =>
    selectContactById(state, selectedContactId)
  );

  const initialValues = {
    name: contact?.name || "",
    number: contact?.number || "",
  };

  const handleSubmit = (values) => {
    dispatch(editContactThunk({ id: selectedContactId, ...values }));
    dispatch(closeModal());
  };

  console.log("isModalOpen", isModalOpen);
  console.log("selectedContactId", selectedContactId);
  console.log("contact", contact);

  return (
    <div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => dispatch(closeModal())}
        shouldCloseOnOverlayClick={true}
        overlayClassName={s.overlay}
        contentLabel="Contact Modal"
        className={s.modal}
      >
        <div className={s.formWrapper}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className={s.form}>
              <label htmlFor="name">
                <span>Name</span>
                <Field className={s.formInput} id="name" name="name" />
                <ErrorMessage
                  className={s.error}
                  name="name"
                  component="span"
                />
              </label>
              <label htmlFor="number">
                <span>Number</span>
                <Field className={s.formInput} id="number" name="number" />
                <ErrorMessage
                  className={s.error}
                  name="number"
                  component="span"
                />
              </label>
              <button id={id} type="submit">
                Save
              </button>
            </Form>
          </Formik>
        </div>
      </ReactModal>
    </div>
  );
};

export default Modal;
