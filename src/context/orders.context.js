import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useProfile } from "./profile.context";

const OrderContext = createContext();

export const OrdersProvider = ({ children }) => {
  const { isLoading, profile } = useProfile();
  const [orders, setOrders] = useState(null);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);

  const loadOrders = useCallback(() => {
    axios
      .get(`/orders/${profile.userId}`)
      .then((result) => {
        setOrders(result.data.order);
        setIsOrdersLoading(false);
      })
      .catch((err) => console.error(err));
  }, [profile]);

  useEffect(() => {
    if (!isLoading && profile) {
      loadOrders();
    }
  }, [isLoading, profile, loadOrders]);

  return (
    <OrderContext.Provider
      value={{ isOrdersLoading, loadOrders, orders, setOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
