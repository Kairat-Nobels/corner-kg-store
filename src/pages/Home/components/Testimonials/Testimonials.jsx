import React from 'react';
import TestimonialsItem from './TestimonialsItem';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Testimonials = () => {
    const { reviews: testimonials } = useSelector((state) => state.reviewsReducer);

    return (
        <div className="testimonials-part page-container">
            <h3 className='text-center part-title'>Пикирлер</h3>

            <div className="divider-part">
                <div className="divider"></div>
            </div>

            <Swiper
                modules={[Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                pagination={{ clickable: true }}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1200: { slidesPerView: 3 }
                }}
                style={{ paddingBottom: 32 }}
            >
                {testimonials.map((item) => (
                    <SwiperSlide key={item.id}>
                        <TestimonialsItem
                            name={item.name}
                            comment={item.comment}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Testimonials;
