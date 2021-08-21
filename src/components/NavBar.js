import React from "react";
import Logo from "../images/salad.png";
import { Link } from "react-router-dom";

const LINKS = [
    { to: "/", text: "Home" },
    { to: "/categories", text: "Categories" },
    { to: "/cart", text: "Cart" },
];

const NavBar = () => {
    console.log("render");
    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='container'>
                    <a className='navbar-brand' href='/'>
                        <img src={Logo} alt='show' width='32' height='32' />
                        <span className='m-2'>Fooders</span>
                    </a>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarSupportedContent'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div
                        className='collapse navbar-collapse'
                        id='navbarSupportedContent'
                    >
                        <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                            {LINKS.map((item) => (
                                <li key={item.to} className='nav-item'>
                                    <Link
                                        to={item.to}
                                        className='nav-link active m-sm-2 m-1'
                                    >
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                            <li className='nav-item'>
                                <button
                                    className='btn btn-success m-sm-2 m-1'
                                    type='button'
                                >
                                    Login
                                </button>
                            </li>
                            <li className='nav-item'>
                                <button
                                    className='btn btn-outline-success m-sm-2 m-1'
                                    type='submit'
                                >
                                    Create Account
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
