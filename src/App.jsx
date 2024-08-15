import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactsThunk } from "./redux/contactsOps";
import { selectLoading } from "./redux/contactsSlice";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import "./App.css";

function App() {
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  return (
    <>
      <h1 className="title">Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
      {isLoading && (
        <div className="loader">
          <ClimbingBoxLoader />
        </div>
      )}
    </>
  );
}

export default App;
