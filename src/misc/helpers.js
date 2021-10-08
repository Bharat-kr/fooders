import axios from "axios";

export function signup(e) {
  e.preventDefault();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .post(
      "/user/signup",
      {
        name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
        address: e.target[3].value,
      },
      config
    )
    .then((res) => {
      console.log("user created");
    })
    .catch((err) => console.error(err));
}

export function deleteOrder(e) {
  e.preventDefault();
  const token = localStorage.getItem("jwt");
  const decodedJwt = JSON.parse(atob(token.split(".")[1]));

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + JSON.stringify(token),
    },
  };

  axios
    .delete(`/user/${decodedJwt.userId}`, config)
    .then((res) => {
      console.log(res);
      localStorage.removeItem("jwt");
    })
    .catch((err) => console.error(err));
}

export function updateOrder(e) {
  e.preventDefault();
  const token = localStorage.getItem("jwt");
  const decodedJwt = JSON.parse(atob(token.split(".")[1]));

  const headers = {
    Authorization: "bearer " + token,
  };

  axios
    .delete(`/user/${decodedJwt.userId}`, headers)
    .then((res) => {
      console.log(res);
      localStorage.removeItem("jwt");
    })
    .catch((err) => console.error(err));
}

export const checkValid = (arr, key) => {


};
