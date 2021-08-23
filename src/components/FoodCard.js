import React from "react";

const FoodCard = ({ name, image }) => {
    const rand = Math.floor(Math.random() * 200);
    var price = `${rand}₹ / Order`;
    return (
        <div className='card m-1'>
            <img src={image} className='card-img-top' alt='food' />
            <div className='card-body'>
                <h5 className='card-title'>{name}</h5>
                <div className='row mt-2 mb-2'>
                    <div className='col-8'>
                        <p className='card-text'>{price}</p>
                    </div>
                    <div className='col-4'>
                        <p className='card-text'>
                            ⭐{Math.floor(Math.random() * 5)}
                        </p>
                    </div>
                </div>
                <a href='/' className='btn btn-outline-success'>
                    Order Now
                </a>
            </div>
        </div>
    );
};

export default FoodCard;
