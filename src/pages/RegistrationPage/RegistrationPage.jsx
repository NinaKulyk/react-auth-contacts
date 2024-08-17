import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { registerThunk } from "../../redux/auth/authOps";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(registerThunk(values));
    actions.resetForm();
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field name="name" placeholder="Enter your name" />
          <Field name="email" placeholder="Enter your email" />
          <Field
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <button type="submit">Sing Up</button>

          <p>
            You already have account?
            <NavLink to="/login">Login</NavLink>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
