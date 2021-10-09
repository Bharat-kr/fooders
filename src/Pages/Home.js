import React, { useState } from "react";
import FoodGrid from "../components/FoodGrid";
import Footer from "../components/Footer";
import MainPageLayout from "../components/MainPageLayout";
import SearchBox from "../components/SearchBox";
import CallBack from "../components/CallBack";
import axios from "axios";
import Alert from "../components/Alert";

const Home = () => {
  const [data, setData] = React.useState(null);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  React.useEffect(() => {
    axios
      .get("/foods")
      .then((result) => {
        setData(result.data.products);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <MainPageLayout>
      <Alert alert={alert} />
      <SearchBox />
      <section id="categories">
        <div className="container">
          <h2 className="text-center mt-3 mb-3 fs-1 fw-normal">
            Explore the Your favourite Dish
          </h2>
        </div>
        {!data ? "Loading..." : <FoodGrid showAlert={showAlert} data={data} />}
      </section>
      <CallBack />
      <Footer />
    </MainPageLayout>
  );
};

export default Home;
