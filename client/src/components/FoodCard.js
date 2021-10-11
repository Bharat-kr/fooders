import axios from "axios";
import React from "react";
import { useProfile } from "../context/profile.context";

const FoodCard = ({ item, showAlert }) => {
  const { profile } = useProfile();

  const createOrder = (e) => {
    e.preventDefault();

    axios
      .post("/orders", { user: profile.userId, foodId: item.id })
      .then((res) => {
        if (res.status === 201) {
          showAlert("Order Created", "success");
        }
        if (res.status === 204) {
          showAlert("Same order Pls Update in cart", "warning");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="card m-1">
      <img src={item.img} className="card-img-top" alt="fooditem" />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <div className="row mt-3 mb-2 align-items-baseline">
          <div className="col-4">
            <p className="card-text">{item.price} ₹</p>
          </div>
          <div className="col-8">
            <button className="btn btn-outline-success" onClick={createOrder}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
