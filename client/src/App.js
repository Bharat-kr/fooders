import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProfileProvider } from "./context/profile.context";
import { OrdersProvider } from "./context/orders.context";
import PrivateRoute from "./components/RoutesHandlers/PrivateRoute";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";

function App() {
  return (
    <div>
      <ProfileProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <OrdersProvider>
            <PrivateRoute path="/cart">
              <Cart />
            </PrivateRoute>
          </OrdersProvider>
          <Route>
            <div>Not Found</div>
          </Route>
        </Switch>
      </ProfileProvider>
    </div>
  );
}

export default App;
