import React from "react";
import Logo from "../images/salad.png";
import { useProfile } from "../context/profile.context";
import { Link } from "react-router-dom";
import { signup } from "../misc/helpers";
import axios from "axios";

const LINKS = [
  { to: "/", text: "Home" },
  { to: "/cart", text: "Cart" },
];

const NavBar = ({ showAlert }) => {
  const { profile, setProfile, loadProfile } = useProfile();
  const login = (e) => {
    e.preventDefault();
    axios
      .post("/user/login", {
        email: e.target[0].value,
        password: e.target[1].value,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("jwt", res.data.token);

          const decodedJwt = JSON.parse(atob(res.data.token.split(".")[1]));
          const userData = {
            userId: decodedJwt.userId,
            name: decodedJwt.name,
            email: decodedJwt.email,
            address: decodedJwt.address,
          };
          setProfile(userData);
          showAlert("Logged In", "info");
        }
      })
      .catch((err) => showAlert("Invalid Credentials", "danger"));
  };

  const updateAddress = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    const decodedJwt = JSON.parse(atob(token.split(".")[1]));
    axios
      .patch(`/user/${decodedJwt.userId}`, { address: e.target[0].value })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("jwt", res.data.token);
          showAlert("Update sucessfully", "success");
          loadProfile();
        }
      })
      .catch((err) => {
        showAlert(err.message, "danger");
      });
  };

  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem("jwt");
    setProfile(null);
    showAlert("Logged Out", "info");
  };

  const deleteAccount = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    const decodedJwt = JSON.parse(atob(token.split(".")[1]));
    axios
      .delete(`/user/${decodedJwt.userId}`)
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("jwt");
          setProfile(null);
          showAlert("Account Deleted", "success");
        }
      })
      .catch((err) => showAlert(err.message, "danger"));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand ms-2" href="/">
            <img src={Logo} alt="show" width="34" height="34" />
            <span className="ms-2 fw-bold text-success">Fooders</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {LINKS.map((item) => (
                <li key={item.to} className="nav-item">
                  <Link
                    to={item.to}
                    className="nav-link active ms-sm-2 me-sm-2 m-1"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
              {!profile && (
                <li className="nav-item">
                  <button
                    className="btn btn-success ms-sm-2 me-sm-2 m-1"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#Login"
                  >
                    Login
                  </button>
                </li>
              )}
              {!profile && (
                <li className="nav-item">
                  <button
                    className="btn btn-outline-success ms-sm-2 m-1"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#SignUp"
                  >
                    Create Account
                  </button>
                </li>
              )}
              {profile && (
                <li className="dropdown dropstart" role="button">
                  <h5
                    className="nav-link active ms-sm-2 me-sm-2 m-1 text-success"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                  >
                    {profile.name}
                  </h5>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <div
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#Address"
                      >
                        Edit Address
                      </div>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        target="_blank"
                        rel="noreferrer"
                        href="https://bharat-kr.github.io/Profile/contacts.html"
                      >
                        Contact Me
                      </a>
                    </li>
                    <li>
                      <div
                        className="dropdown-item text-danger"
                        onClick={logout}
                      >
                        Logout
                      </div>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <div
                        className="dropdown-item text-danger"
                        onClick={deleteAccount}
                      >
                        Delete Account
                      </div>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* login Modal */}
      <div
        className="modal fade"
        id="Login"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Welcome Back!
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={login}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* signUp modal */}
      <div
        className="modal fade"
        id="SignUp"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                New User ? Create an Account Here !
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={signup}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    name="name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    name="email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    aria-describedby="emailHelp"
                    name="password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address for Delivery</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    name="address"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  SignUp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* update Address Modal */}
      <div
        className="modal fade"
        id="Address"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Change your address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={updateAddress}>
                <div className="mb-3">
                  <label className="form-label">New Address</label>
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    name="email"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
