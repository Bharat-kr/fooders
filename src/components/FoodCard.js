import React from "react";

const FoodCard = ({ name, image }) => {
    const rand = Math.floor(Math.random() * 200);
    var price = `${rand}₹ / Order`;
    return (
        <div className='card m-1'>
            <img src={image} className='card-img-top' alt='food' />
            <div className='card-body'>
                <h5 className='card-title'>{name}</h5>
                <div className="container d-flex justify-content-between">
                    <p className='card-text'>{price}</p>
                    <p>
                        ⭐{Math.floor(Math.random() * 5)}
                    </p>
                    </div>
                <a href='/' className='btn btn-success'>
                    Order Now
                </a>
            </div>
        </div>
    );
};

export default FoodCard;
