import React from "react";
import FoodCard from "./FoodCard";

const FoodGrid = ({ data,showAlert }) => {
  return (
    <div className="container mt-5 mb-5">
      <div className="container d-flex flex-wrap justify-content-center mt-1">
        {data.map((item) => {
          return <FoodCard showAlert={showAlert} key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default FoodGrid;
