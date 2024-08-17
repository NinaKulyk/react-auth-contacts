import { Outlet } from "react-router-dom";
import Header from "./components/AppBar/AppBar";

const Layout = () => {
  return (
    <div>
      <App />
      <Outlet />
    </div>
  );
};

export default Layout;
