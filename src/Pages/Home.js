import React from "react";
import FoodGrid from "../components/FoodGrid";
import Footer from "../components/Footer";
import MainPageLayout from "../components/MainPageLayout";
import SearchBox from "../components/SearchBox";
import CallBack from "../components/CallBack";
import axios from "axios";

const Home = () => {
  const [data, setData] = React.useState(null);

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
      <SearchBox />
      <section id="categories">
        <div className="container">
          <h2 className="text-center mt-3 mb-3 fs-1 fw-normal">
            Explore the Your favourite Dish
          </h2>
        </div>
        {!data ? "Loading..." : <FoodGrid data={data} />}
      </section>
      <CallBack />
      <Footer />
    </MainPageLayout>
  );
};

export default Home;
