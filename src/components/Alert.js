import React from "react";

const Alert = (props) => {
  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      <i className="bi bi-check-circle-fill"></i>
      <strong>Holy guacamole!</strong> You should check in on some of those
      fields below.
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
