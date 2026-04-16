import React from 'react';
import HomeServicesItem from './HomeServicesItem';

const services = [
    {
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyHYVnAIn1TrKcTvzvzVhc9yoOimnyNOF8QQvkTmRQNYUbISCJC4VpbJUL-IB1y0tq_XxT2kAecNqT1FxWvoBJ226j7kW6zNXOW46WBcTg0WumkEFDr83k1aP8y5HfyNZyi4RARwDejY_KyHvxgCe_dmlFs6C7Ld1rLrHoXgeldlE0GXMr_nlTwrPhl9k/s1600/delivery-truck.png",
        title: "Шаар ичинде тез жеткирүү"
    },
    {
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgn6V4wTYkapf_UF_qmqdHfmIHRgQ1CwvYczIbE8JwQADG0JApgJqcewEtOfxcC8GKMWeMpBfXKvBb_03_wBXtGdEmv0iM-OWgfUzqzSG4jE8Xr8NMEslBazY9_FW7ccGrfmnO5pRFZJXR5KsP737wjdk69nmb_ZV_kKPCSH6ymKaC8cGYTIhqbTGpUdr4/s1600/flowers%20(1).png",
        title: "Гүлдөрдүн жаңы болушуна кепилдик"
    },
    {
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9cjkWmgRdp6yR25iqdA-CCvISs5WcrcJ-uEuQFRZRLmrDCzYwDuEuEdIqVr9GohCIfL8Ak4YW-7pJ3lhPDh3lgp-kPYlZbcbDRaHZp-y13_n84RhWMDhiukuyve34S8V_cZaoDJoBWvtRLFy4camueHNjRICaH_IuEpnai0hODJjx-QlaTQSq5hNPESQ/s1600/individuality.png",
        title: "Ар бир кардарга өзгөчө мамиле"
    },
    {
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRQJYJ3c4axHW-1a402gHM2ZtsgUb6aB0HASrgiVFp33rOhDMgNhV6Ro0gurwfnW99po0RD2zC5GoyALlwTFQlpPEwD88uBMsROWwfzMn38ZtKASKoOUW-fAQfSBeCAHXyw_G9fY4C79gqHy9Ps31TiawXzBN8PsAlktVyixmdXhotYDPllkuZ4THrH50/s1600/credit-card.png",
        title: "Белекке таңгактоо жана открыткалар"
    }
];

const HomeServices = () => (
    <div className='page-container'>
        <div className="services-home flex justify-content-between align-items-center">
            {services.map((item, idx) => (
                <HomeServicesItem
                    key={idx}
                    image={item.image}
                    title={item.title}
                />
            ))}
        </div>
    </div>
);

export default HomeServices;
