import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./homeSlider.scss";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "https://www.studiofloristic.ru/files/blog/new-year-2023-2.jpg",
    title: "Гүлдөр дүйнөсү",
    description: "Ар кандай учур үчүн жаңы жана кооз гүлдөр. Жакындарыңызды кубантыңыз.",
    button: "Каталогду көрүү"
  },
  {
    image: "https://st3.depositphotos.com/8186610/32649/i/450/depositphotos_326495872-stock-photo-sexy-woman-holding-big-bouquet.jpg",
    title: "Сүйүктүүлөр үчүн букеттер",
    description: "Ар бир кардар үчүн өзгөчө жасалган гүл композициялары.",
    button: "Букет тандоо"
  },
  {
    image: "https://pandora.airun.one/media/cache/42/c4/42c4f9160128ebee5df7402eb82989cd.jpg",
    title: "Шаар боюнча жеткирүү",
    description: "Гүлдөрдү тез жана коопсуз жеткирүү кызматын сунуштайбыз.",
    button: "Заказ берүү"
  }
];

const HomeSlider = () => {
  const navigate = useNavigate();

  return (
    <div className="home-slider">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={40}
        totalSlides={slides.length}
        infinite
        // isPlaying
        interval={4000}
      >
        <Slider className="slider-content">
          {slides.map((slide, idx) => (
            <Slide index={idx} key={idx}>
              <div className="slider-inner">
                <div className="slider-text">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <button
                    className="general-button"
                    onClick={() => navigate("/shop")}
                  >
                    {slide.button}
                  </button>
                </div>

                <div className="slider-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
              </div>
            </Slide>
          ))}
        </Slider>

        <div className="slider-controls">
          <ButtonBack>{"<"}</ButtonBack>
          <DotGroup />
          <ButtonNext>{">"}</ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default HomeSlider;
