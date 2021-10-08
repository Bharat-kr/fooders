import React from "react";
import NavBar from "./NavBar";

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default MainPageLayout;
