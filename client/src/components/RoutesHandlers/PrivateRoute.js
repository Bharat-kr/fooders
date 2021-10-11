import React from "react";
import { Redirect } from "react-router";
import { useProfile } from "../../context/profile.context";

const PrivateRoute = ({ children, ...routeProps }) => {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return <div>Loading...</div>;
  }

  if (!profile && !isLoading) {
    return <Redirect to="/" />;
  }
  return <div {...routeProps}>{children}</div>;
};

export default PrivateRoute;
