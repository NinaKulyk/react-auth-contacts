import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactsThunk } from "./redux/contacts/contactsOps";
import {
  selectIsModalOpen,
  selectLoading,
} from "./redux/contacts/contactsSlice";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { getMeThunk } from "./redux/auth/authOps";
import { selectIsLoggedIn, selectIsRefreshing } from "./redux/auth/authSlice";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { PublicRoute } from "./Routes/PublicRoute";
import Loading from "./components/Loading/Loading";

const AppBar = lazy(() => import("./components/AppBar/AppBar"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const ClimbingBoxLoader = lazy(() =>
  import("react-spinners/ClimbingBoxLoader")
);
const Modal = lazy(() => import("./components/Modal/Modal"));

function App() {
  const isLoading = useSelector(selectLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContactsThunk());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    dispatch(getMeThunk());
  }, [dispatch]);

  console.log("isModalOpen:", isModalOpen);

  return isRefreshing ? (
    <Loading />
  ) : (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<AppBar />}>
            <Route index element={<HomePage />} />
            <Route
              path="contacts"
              element={
                <PrivateRoute>
                  <ContactsPage />
                </PrivateRoute>
              }
            />
          </Route>
          {/* <Route
            path="contacts/:contactId"
            element={<PrivateRoute>{isModalOpen && <Modal />}</PrivateRoute>}
          ></Route> */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {isLoading && (
          <div className="loader">
            <ClimbingBoxLoader />
          </div>
        )}
        {isModalOpen && <Modal />}
      </Suspense>
    </>
  );
}

export default App;
