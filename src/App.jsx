import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactsThunk } from "./redux/contacts/contactsOps";
import { selectLoading } from "./redux/contacts/contactsSlice";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route index element={<HomePage />} />
          <Route path="contacts" element={<ContactsPage />} />
          {/* <Route path="logout" element={<LoginPage />} /> */}
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isLoading && (
        <div className="loader">
          <ClimbingBoxLoader />
        </div>
      )}
    </>
  );
}

export default App;
