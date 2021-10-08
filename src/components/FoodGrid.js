import React from "react";
import FoodCard from "./FoodCard";

const FoodGrid = ({ data }) => {
  return (
    <div className="container mt-5 mb-5">
      <div className="container d-flex flex-wrap mt-1">
        {data.map((item) => {
          return <FoodCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default FoodGrid;
