import React from "react";
import axios from "axios";
import { useOrders } from "../context/orders.context";

const PastOrderCard = ({ order }) => {
  const { loadOrders } = useOrders();

  const reviewOrder = (e) => {
    e.preventDefault();
    axios
      .patch(`/orders/${order._id}`, {
        review: e.target[0].value,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          loadOrders();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="container rounded-5 shadow m-1 p-md-2 p-1 pe-md-4 d-flex flex-row align-items-center justify-content-between">
        <img src={order.food.img} alt="item" width="100" height="100" />
        <h5 className="card-title">{order.food.name}</h5>
        <p className="number">{order.quantity}</p>
        <p className="card-text">₹ {order.food.price * order.quantity}</p>

        {order.review && order.review.length > 0 ? (
          <button type="button" disabled className="btn btn-primary">
            Reviewd Already
          </button>
        ) : (
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#Review"
            className="btn btn-primary"
          >
            Review
          </button>
        )}
      </div>

      {/* Review Modal */}
      <div
        className="modal fade"
        id="Review"
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
                Review order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={reviewOrder}>
                <div className="mb-3">
                  <label className="form-label">Give a review</label>
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
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PastOrderCard;
