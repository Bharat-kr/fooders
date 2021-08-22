import React from "react";
import image from "../images/bro.svg";

const SearchBox = () => {
    return (
        <div className='container d-flex justify-content-around flex-column flex-md-row rounded-3 upper'>
            <div className='w-auto d-flex justify-content-center align-items-baseline p-5 flex-column'>
                <h6 className='bg-light rounded pe-1'>
                    <span className='badge bg-dark'>40% off</span> On your first
                    order!
                </h6>
                <div className='display-4 fw-bold text-success'>
                    Order Best Food anytime.
                </div>
                <form className='d-flex flex-row mt-4'>
                    <input
                        className='form-control me-2'
                        type='text'
                        placeholder='Search Your favorite food'
                    />
                    <button type='submit' className='btn bg-success text-light'>
                        Search
                    </button>
                </form>
            </div>
            <div className='w-50 d-none d-md-flex align-items-center'>
                <img src={image} alt='MainImage' className='MainImage' />
            </div>
        </div>
    );
};

export default SearchBox;
