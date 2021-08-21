import React from "react";
import { Switch, Route } from "react-router-dom"; //to switch between pages
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";

function App() {
    return (
        <div>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/cart'>
                    <Cart/>
                </Route>
                <Route>
                    <div>Not Found</div>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
