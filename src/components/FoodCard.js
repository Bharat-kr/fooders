import axios from "axios";
import React from "react";
import { useProfile } from "../context/profile.context";

const FoodCard = ({ item }) => {
  const { profile } = useProfile();


  const createOrder = (e) => {
    e.preventDefault();

    axios
      .post("/orders", { user: profile.userId, foodId: item.id })
      .then((res) => {
        console.log("fetched successfully");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="card m-1">
      <img src={item.img} className="card-img-top" alt="fooditem" />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <div className="row mt-2 mb-2">
          <div className="col-8">
            <p className="card-text">{item.price} ₹</p>
          </div>
        </div>
        <button className="btn btn-outline-success" onClick={createOrder}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
