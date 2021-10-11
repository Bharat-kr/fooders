import React from "react";

const Alert = (props) => {
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} text-center m-1 rounded position-fixed top-0 start-50 translate-middle-x`}
        
        role="alert"
      >
        {props.alert.type === "success" ? (
          <i className="bi bi-check-circle-fill"> </i>
        ) : null}
        {props.alert.type === "info" ? (
          <i className="bi bi-info-circle-fill"> </i>
        ) : null}
        {props.alert.type === "warning" ? (
          <i className="bi bi-exclamation-circle-fill"> </i>
        ) : null}
        {props.alert.type === "danger" ? (
          <i className="bi bi-exclamation-circle-fill"> </i>
        ) : null}
        {props.alert.msg}
      </div>
    )
  );
};

export default Alert;
