import React from "react";
import image from "../images/salad.png";

function onclick() {}

const CartCard = () => {
    return (
        <div className='container rounded-5 shadow m-1 p-md-2 p-1 pe-md-4 d-flex flex-row align-items-center justify-content-between'>
            <img src={image} alt='item' width='100' height='100' />
            <h5 className='card-title'>Name</h5>
            <p className='number'>5</p>
            <p className='card-text'>Price</p>
            <button
                type='button'
                class='btn-close'
                data-bs-dismiss='alert'
                aria-label='Close'
                onClick={onclick}
            ></button>
        </div>
    );
};

export default CartCard;
