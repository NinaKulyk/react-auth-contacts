import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { loginThunk } from "../../redux/auth/authOps";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(loginThunk(values));
    actions.resetForm();
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field name="email" placeholder="Enter your email" />
          <Field
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <button type="submit">Login</button>

          <p>
            You don't have account yet?
            <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
