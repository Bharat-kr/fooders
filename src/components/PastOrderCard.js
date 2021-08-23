import React from "react";
import image from "../images/salad.png";

function onclick() {}

const PastOrderCard = () => {
    return (
        <div className='container rounded-5 shadow m-1 p-md-2 p-1 pe-md-4 d-flex flex-row align-items-center justify-content-between'>
            <img src={image} alt='item' width='100' height='100' />
            <h5 className='card-title'>Name</h5>
            <p className='number'>5</p>
            <p className='date'>7 Aug 2021</p>
            <p className='card-text'>Price</p>
            <button type='button' className='btn btn-primary' onClick={onclick}>
                Review
            </button>
        </div>
    );
};

export default PastOrderCard;
