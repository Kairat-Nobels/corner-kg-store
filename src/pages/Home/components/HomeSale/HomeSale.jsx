import React from 'react';
import "./homeSale.scss";
import { useNavigate } from 'react-router-dom';

const HomeSale = () => {
    const navigate = useNavigate();

    return (
        <div className="home-sale page-container">
            <div className="sale-content">

                <div className="sale-title d-flex flex-column">
                    <h2 data-aos="fade-right">
                        Жазгы арзандатуулар!
                    </h2>

                    <h3
                        data-aos="fade-right"
                        className='text-center text-sm-start'
                    >
                        Сүйүү менен гүл белек кылыңыз — бардык букеттерге 15% арзандатуу айдын аягына чейин.
                    </h3>

                    <button
                        data-aos="fade-right"
                        onClick={() => navigate("/shop")}
                        className='general-button'
                    >
                        Арзандатууларды көрүү
                    </button>
                </div>

            </div>
        </div>
    );
};

export default HomeSale;
