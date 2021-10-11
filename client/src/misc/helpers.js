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
