import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartCard from "../components/CartCard";
import PastOrderCard from "../components/PastOrderCard";
import Footer from "../components/Footer";
import MainPageLayout from "../components/MainPageLayout";
import { useOrders } from "../context/orders.context";
import axios from "axios";

const Cart = () => {
  const { isOrdersLoading, loadOrders, orders } = useOrders();

  const [total, setTotal] = useState(0);
  const [placed, setPlaced] = useState(null);
  const [notPlaced, setNotPlaced] = useState(null);
  useEffect(() => {
    let array = [];
    let array2 = [];
    let sum = 0;
    if (!isOrdersLoading) {
      orders.forEach((element) => {
        if (element.status) {
          array.push(element);
        } else {
          array2.push(element);
          sum += element.food.price * element.quantity;
        }
      });
    }
    setTotal(sum);
    setPlaced(array);
    setNotPlaced(array2);
  }, [orders, isOrdersLoading]);

  const placeOrders = (e) => {
    e.preventDefault();
    if (notPlaced && notPlaced.length > 0) {
      let placingorders = [];
      notPlaced.forEach((element) => {
        placingorders.push(
          axios.patch(`/orders/${element._id}`, { status: true })
        );
      });

      axios
        .all(placingorders)
        .then((res) => {
          console.log("Done");
          loadOrders();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <MainPageLayout>
      <div className="container mt-4 mb-3">
        <h3>Your Cart</h3>
        <div className="d-flex flex-wrap justify-content-center">
          {notPlaced && notPlaced.length
            ? notPlaced.map((order) => {
                return <CartCard key={order._id} order={order} />;
              })
            : "No orders Yet"}
        </div>
        <div className="container m-1">
          <div className="row">
            <div className="col-4 col-md-6">
              <h6 className="m-1 mt-2">
                <Link to="/" className="link-dark">
                  <i className="bi bi-arrow-left"></i> Back to Store
                </Link>
              </h6>
            </div>
            <div className="col-8 col-md-6 text-end">
              <p className="card-title d-inline me-3 me-md-5">
                Total: ₹ {total}
              </p>
              <button
                type="button"
                className="btn btn-success"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4 mb-3">
        <h3>Past Orders</h3>
        <div className="d-flex flex-wrap justify-content-center">
          {placed && placed.length
            ? placed.map((order) => {
                return <PastOrderCard key={order._id} order={order} />;
              })
            : "No orders Yet"}
        </div>
      </div>
      <Footer />

      {/* Payment Side Bar */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Payment</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* payment Body */}
          <form onSubmit={placeOrders}>
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input
                type="number"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Expiry Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">CVV</label>
              <input type="number" className="form-control" />
            </div>
            <p className="fs-6">
              <mark>
                * Dont worry this is not going to be stored or if left this
                empty it would be fine as this is a project not a real website.
                Just click the proceed button
              </mark>
            </p>
            <button
              type="submit"
              data-bs-dismiss="offcanvas"
              className="btn btn-success"
            >
              Proceed
            </button>
          </form>
        </div>
      </div>
    </MainPageLayout>
  );
};

export default Cart;
