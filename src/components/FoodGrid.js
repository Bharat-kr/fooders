import React from "react";
import FoodCard from "./FoodCard";
import * as American from "../data/American.json";
import * as British from "../data/British.json";
import * as Canadian from "../data/Canadian.json";
import * as Chinese from "../data/Chinese.json";
import * as Croatian from "../data/Croatian.json";
import * as Dutch from "../data/Dutch.json";
import * as Egyptian from "../data/Egyptian.json";
import * as French from "../data/French.json";
import * as Greek from "../data/Greek.json";
import * as Indian from "../data/Indian.json";
import * as Irish from "../data/Irish.json";
import * as Italian from "../data/Italian.json";
import * as Jamaican from "../data/Jamaican.json";
import * as Japanese from "../data/Japanese.json";
import * as Malaysian from "../data/Malaysian.json";
import * as Mexican from "../data/Mexican.json";
import * as Moroccan from "../data/Moroccan.json";
import * as Polish from "../data/Polish.json";
import * as Portuguese from "../data/Portuguese.json";
import * as Spanish from "../data/Spanish.json";
import * as Thai from "../data/Thai.json";
import * as Tunisian from "../data/Tunisian.json";

const FoodGrid = ({ name }) => {
    var data = [];
    if (name === "American") {
        data = American.meals;
    }
    if (name === "British") {
        data = British.meals;
    }
    if (name === "Canadian") {
        data = Canadian.meals;
    }
    if (name === "Chinese") {
        data = Chinese.meals;
    }
    if (name === "Croatian") {
        data = Croatian.meals;
    }
    if (name === "Dutch") {
        data = Dutch.meals;
    }
    if (name === "Egyptian") {
        data = Egyptian.meals;
    }
    if (name === "French") {
        data = French.meals;
    }
    if (name === "Greek") {
        data = Greek.meals;
    }
    if (name === "Indian") {
        data = Indian.meals;
    }
    if (name === "Irish") {
        data = Irish.meals;
    }
    if (name === "Italian") {
        data = Italian.meals;
    }
    if (name === "Jamaican") {
        data = Jamaican.meals;
    }
    if (name === "Japanese") {
        data = Japanese.meals;
    }
    if (name === "Malaysian") {
        data = Malaysian.meals;
    }
    if (name === "Mexican") {
        data = Mexican.meals;
    }
    if (name === "Moroccan") {
        data = Moroccan.meals;
    }
    if (name === "Polish") {
        data = Polish.meals;
    }
    if (name === "Portuguese") {
        data = Portuguese.meals;
    }
    if (name === "Spanish") {
        data = Spanish.meals;
    }
    if (name === "Thai") {
        data = Thai.meals;
    }
    if (name === "Tunisian") {
        data = Tunisian.meals;
    }
    var id = `#${name}`;
    console.log(id);

    return (
        <div className='container mt-5 mb-5'>
            <div className="container d-flex flex-row justify-content-between">
                <h2>{name}</h2>
                <button
                    classname='btn'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={id}
                    aria-expanded='false'
                    aria-controls='collapseExample'
                >
                    View More
                </button>
            </div>

            <div className='container d-flex flex-wrap justify-content-center'>
                {data.slice(0, 5).map((a) => {
                    return (
                        <FoodCard
                            key={a.strMeal}
                            name={a.strMeal}
                            image={a.strMealThumb}
                        />
                    );
                })}
            </div>
            <div className='collapse' id={name}>
                <div className='container d-flex flex-wrap'>
                    {data.slice(5).map((a) => {
                        return (
                            <FoodCard
                                key={a.strMeal}
                                name={a.strMeal}
                                image={a.strMealThumb}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FoodGrid;
