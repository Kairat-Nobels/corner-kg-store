import React from 'react';
import "./hero.scss";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div data-aos="zoom-in" className="hero not-container mb-4">
            <div className="hero-content">

                <h1 data-aos="fade-up">
                    Гүлдөр дүйнөсү
                </h1>

                <div className="hero-subtitle" data-aos="fade-up">
                    Сүйүктүүлөрүңүзгө өзгөчө маанай тартуулаңыз.
                    Биздин кооз букеттер ар бир учурду унутулгус кылат.
                </div>

                <button
                    data-aos="fade-up"
                    onClick={() => navigate("/shop")}
                    className='general-button mt-4'
                >
                    Азыр заказ берүү
                </button>

            </div>
        </div>
    );
};

export default Hero;
