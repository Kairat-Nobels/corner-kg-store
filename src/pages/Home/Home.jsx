import React from 'react';
import Hero from './components/Hero/Hero';
import HomeCollection from './components/HomeCollection/HomeCollection';
import HomeSale from './components/HomeSale/HomeSale';
import HomeServices from './components/HomeServices/HomeServices';
import HomeProducts from './components/HomeProducts/HomeProducts';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from '../../components/Contact/Contact';
import HomeSlider from './components/HomeSlider/HomeSlider';
const Home = () => {
    return (
        <div className="home">
            <Hero />
            <HomeSlider />
            <HomeCollection />
            <HomeServices />
            <HomeSale />
            <HomeProducts />
            <Testimonials />
            <Contact />
        </div>
    )
}

export default Home;