import React from "react";
import image from "../images/delivery.svg";

const CallBack = () => {
    return (
        <div className='container d-flex justify-content-around flex-column flex-md-row rounded-3 upper'>
            <div className='w-50 d-none d-md-flex justify-content-center align-content-center'>
                <img src={image} alt='MainImage' className='MainImage' />
            </div>
            <div className='w-auto d-flex justify-content-center align-items-end p-5 flex-column'>
                <h6 className='bg-light rounded p-1'>
                    order Now!
                </h6>
                <div className='display-4 fw-bold text-success text-end'>
                    Fast Delivery at Your Doorstep!
                </div>
            </div>
        </div>
    );
};

export default CallBack;
