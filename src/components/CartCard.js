import axios from "axios";
import { useOrders } from "../context/orders.context";

const CartCard = ({ order, showAlert }) => {
  // console.log(order);
  const { loadOrders } = useOrders();

  const updateOrder = (e) => {
    e.preventDefault();
    if (e.target.outerText === "+") {
      axios
        .patch(`/orders/${order._id}`, {
          quantity: order.quantity + 1,
        })
        .then((res) => {
          if (res.status === 200) {
            loadOrders();
          }
        })
        .catch((err) => console.error(err));
    }
    if (e.target.outerText === "-" && order.quantity > 1) {
      axios
        .patch(`/orders/${order._id}`, {
          quantity: order.quantity - 1,
        })
        .then((res) => {
          if (res.status === 200) {
            loadOrders();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const deleteOrder = (e) => {
    e.preventDefault();

    axios
      .delete(`/orders/${order._id}`)
      .then((res) => {
        showAlert("Item Removed", "warning");
        loadOrders();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container rounded-5 shadow m-1 p-md-2 p-1 pe-md-4">
      <div className="row">
        <div className="col-2 d-flex align-items-center justify-content-center">
          <img src={order.food.img} className="rounded img-fluid" alt="item" />
        </div>
        <div className="col d-flex align-items-center">
          <h5 className="card-title fs-6">{order.food.name}</h5>
        </div>
        <div className="col d-flex flex-row align-items-center">
          <button className="btn btn-outline-dark m-2" onClick={updateOrder}>
            <strong>-</strong>
          </button>
          <p className="number m-4">{order.quantity}</p>
          <button className="btn btn-outline-dark m-2" onClick={updateOrder}>
            <strong>+</strong>
          </button>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <p className="card-text">₹ {order.quantity * order.food.price}</p>
        </div>
        <div className="col col-md-1 d-flex align-items-center justify-content-end">
          <button
            type="button"
            className="btn-close pe-4 pe-md-0"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={deleteOrder}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
