import s from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addContactThunk } from "../../redux/contactsOps";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("This field is required!")
    .min(3, "Name must be more than 3 chars!")
    .max(20, "Name must be less than 20 chars!"),
  number: Yup.number()
    .typeError("It's not a number!")
    .required("This field is required!"),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContactThunk({ name: values.name, number: values.number }));
    actions.resetForm();
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={s.formWrapper}>
        <label htmlFor="name">
          <span>Name</span>
          <Field className={s.formInput} id="name" name="name"></Field>
          <ErrorMessage name="name" component="span" className={s.error} />
        </label>
        <label htmlFor="number">
          <span>Number</span>
          <Field className={s.formInput} id="number" name="number"></Field>
          <ErrorMessage name="number" component="span" className={s.error} />
        </label>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
