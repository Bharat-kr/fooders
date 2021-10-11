import React, { useState } from "react";
import Alert from "./Alert";
import NavBar from "./NavBar";

const MainPageLayout = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <div>
      <NavBar showAlert={showAlert} />
      <Alert alert={alert} />
      {children}
    </div>
  );
};

export default MainPageLayout;
