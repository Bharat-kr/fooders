import React from "react";
import FoodGrid from "../components/FoodGrid";
import Footer from "../components/Footer";
import MainPageLayout from "../components/MainPageLayout";
import SearchBox from "../components/SearchBox";
import CallBack from "../components/CallBack";
import * as Area from "../data/Area.json";

const Home = () => {
    const data = Area.meals;
    return (
        <MainPageLayout>
            <SearchBox />
            <section id='categories'>
                <div className='container'>
                    <h2 className='text-center mt-3 mb-3 fs-1 fw-normal'>
                        Explore the Different Categories
                    </h2>
                </div>
                {data.map((a) => {
                    return <FoodGrid key={a.strArea} name={a.strArea} />;
                })}
            </section>
            <CallBack/>
            <Footer />
        </MainPageLayout>
    );
};

export default Home;
