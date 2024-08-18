import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./RegistrationPage.module.css";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { registerThunk } from "../../redux/auth/operations";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required!")
    .min(3, "Name must be more than 3 chars!")
    .max(20, "Name must be less than 20 chars!"),
  email: Yup.string()
    .required("Email is required!")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 chars!")
    .max(30, "Password must be less than 30 chars!"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const RegistrationPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(registerThunk(values));
    actions.resetForm();
  };

  return (
    <div className={s.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <label htmlFor="name">
            <span>Name</span>
            <Field
              className={s.formInput}
              name="name"
              placeholder="Enter your name"
            />
            <ErrorMessage name="name" component="span" className={s.error} />
          </label>
          <label htmlFor="email">
            <span>Email</span>
            <Field
              className={s.formInput}
              name="email"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component="span" className={s.error} />
          </label>
          <label htmlFor="password">
            <span>Password</span>
            <Field
              className={s.formInput}
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              component="span"
              className={s.error}
            />
          </label>
          <button type="submit">Sing Up</button>

          <div className={s.text}>
            You already have account?
            <div className={s.linkWrapper}>
              <NavLink className={s.link} to="/login">
                Login
              </NavLink>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
