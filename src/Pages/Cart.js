import React from "react";
import {Link} from 'react-router-dom'
import CartCard from "../components/CartCard";
import PastOrderCard from "../components/PastOrderCard";
import MainPageLayout from "../components/MainPageLayout";

const Cart = () => {
    return (
        <MainPageLayout>
            <div className='container mt-4 mb-3'>
                <h3>Your Cart</h3>
                <div className='d-flex flex-wrap'>
                    <CartCard />
                    <CartCard />
                </div>
                <div className='container m-1'>
                    <div className="row">
                        <div className="col-4 col-md-6"><h6 className='m-1 mt-2'>
                        <Link to="/" className='link-dark'><i class='bi bi-arrow-left'></i> Back to Store</Link>
                    </h6></div>
                        <div className="col-8 col-md-6 text-end"><p className='card-title d-inline me-3 me-md-5'>Total: 4000 ₹</p><button type="button" className='btn btn-success'>
                        Checkout
                    </button></div>
                    </div>
                    
                    
                    
                    
                </div>
            </div>
            <div className='container mt-4 mb-3'>
                <h3>Past Orders</h3>
                <div className='d-flex flex-wrap'>
                    <PastOrderCard />
                    <PastOrderCard />
                </div>
            </div>
        </MainPageLayout>
    );
};

export default Cart;
