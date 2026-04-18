import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import ProductCard from "../../components/ProductCard/ProductCard";
import Spinner from "../../components/Spinner/Spinner";
import "./home.scss";
import Contact from "../../components/Contact/Contact";

const Home = () => {
    const { items, loading, error } = useSelector((state) => state.itemsReducer);
    const { reviews } = useSelector((state) => state.reviewsReducer);

    const hitProducts = items?.filter((item) => item.isHit).slice(0, 8);
    const productsToShow =
        hitProducts && hitProducts.length > 0 ? hitProducts : items?.slice(0, 8);

    return (
        <div className="corner-home">
            <section className="corner-hero">
                <div className="corner-hero__content">
                    <span className="corner-label">CORNER STORE</span>

                    <h1>
                        Магазин одежды,
                        <br />
                        обуви и
                        <br />
                        аксессуаров
                    </h1>

                    <p>
                        Современный онлайн-каталог с удобным выбором товаров, оформлением
                        заказа, оплатой по QR и подтверждением через WhatsApp.
                    </p>

                    <div className="corner-hero__actions">
                        <Link to="/shop" className="primary-btn">
                            Перейти в каталог
                        </Link>
                        <a href="#hits" className="secondary-btn">
                            Хиты продаж
                        </a>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <strong>{items?.length || 0}+</strong>
                            <span>товаров</span>
                        </div>
                        <div className="hero-stat">
                            <strong>QR</strong>
                            <span>оплата</span>
                        </div>
                        <div className="hero-stat">
                            <strong>WA</strong>
                            <span>подтверждение</span>
                        </div>
                    </div>
                </div>

                <div className="corner-hero__visual">
                    <div className="hero-tag hero-tag--top">
                        <span>New Collection</span>
                        <strong>Black & White Style</strong>
                    </div>

                    <div className="hero-image-card">
                        <div className="hero-image-card__overlay">
                            <p>corner fashion store</p>
                            <h3>Минимализм. Стиль. Удобство.</h3>
                        </div>
                    </div>

                    <div className="hero-tag hero-tag--bottom">
                        <span>Order system</span>
                        <strong>Catalog + QR + WhatsApp</strong>
                    </div>
                </div>
            </section>

            <section className="corner-categories">
                <div className="section-top">
                    <div>
                        <span className="corner-label">Категории</span>
                        <h2>Популярные разделы магазина</h2>
                    </div>

                    <Link to="/shop" className="section-link">
                        Смотреть все
                    </Link>
                </div>

                <div className="categories-grid">
                    <div className="category-card category-card--clothes">
                        <div className="category-card__overlay">
                            <h3>Одежда</h3>
                            <p>Футболки, худи, брюки, куртки и повседневные модели.</p>
                            <Link to="/shop">Открыть каталог</Link>
                        </div>
                    </div>

                    <div className="category-card category-card--shoes">
                        <div className="category-card__overlay">
                            <h3>Обувь</h3>
                            <p>Кроссовки и обувь для городского, спортивного и casual стиля.</p>
                            <Link to="/shop">Открыть каталог</Link>
                        </div>
                    </div>

                    <div className="category-card category-card--accessories">
                        <div className="category-card__overlay">
                            <h3>Аксессуары</h3>
                            <p>Сумки, кепки, рюкзаки и другие детали для завершения образа.</p>
                            <Link to="/shop">Открыть каталог</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="corner-info-band">
                <div className="info-band-card">
                    <span>Удобный каталог</span>
                    <strong>Быстрый поиск товаров по категориям</strong>
                </div>
                <div className="info-band-card">
                    <span>Актуальные остатки</span>
                    <strong>Учет размеров, вариантов и наличия</strong>
                </div>
                <div className="info-band-card">
                    <span>Простой заказ</span>
                    <strong>QR-оплата и отправка чека в WhatsApp</strong>
                </div>
            </section>

            <section className="corner-hits" id="hits">
                <div className="section-top">
                    <div>
                        <span className="corner-label">Хиты продаж</span>
                        <h2>Популярные товары</h2>
                    </div>

                    <Link to="/shop" className="section-link">
                        Посмотреть все
                    </Link>
                </div>

                {loading ? (
                    <div className="home-loader">
                        <Spinner />
                    </div>
                ) : error ? (
                    <div className="fetchError">
                        <p>Ошибка: {error}</p>
                        <p>Проверь подключение и обнови страницу.</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {productsToShow?.map((item) => (
                            <ProductCard
                                key={item.id}
                                item={item}
                                image={item.image}
                                title={item.title}
                                category={item.category}
                                price={item.price}
                                oldPrice={item.oldPrice}
                            />
                        ))}
                    </div>
                )}
            </section>

            <section className="corner-advantages">
                <div className="section-top">
                    <div>
                        <span className="corner-label">Преимущества</span>
                        <h2>Почему удобно покупать у нас</h2>
                    </div>
                </div>

                <div className="advantages-grid">
                    <div className="advantage-card">
                        <h3>Удобный каталог</h3>
                        <p>
                            Быстрый просмотр товаров по категориям, брендам, цене и
                            популярности.
                        </p>
                    </div>

                    <div className="advantage-card">
                        <h3>Актуальные остатки</h3>
                        <p>
                            Для каждого товара можно учитывать размеры, варианты и количество
                            на складе.
                        </p>
                    </div>

                    <div className="advantage-card">
                        <h3>Простой заказ</h3>
                        <p>
                            Клиент выбирает товар, оплачивает по QR и отправляет чек в
                            WhatsApp.
                        </p>
                    </div>

                    <div className="advantage-card">
                        <h3>Дисконтные карты</h3>
                        <p>
                            Система скидок помогает удерживать постоянных клиентов и повышать
                            лояльность.
                        </p>
                    </div>
                </div>
            </section>

            <section className="corner-discount">
                <div className="corner-discount__left">
                    <span className="corner-label">Дисконтная система</span>
                    <h2>Скидки для постоянных покупателей</h2>
                    <p>
                        В системе магазина можно вести базу клиентов, учитывать историю
                        покупок и назначать дисконтные карты со скидкой 3% и 5%.
                    </p>

                    <Link to="/shop" className="primary-btn">
                        Начать покупки
                    </Link>
                </div>

                <div className="corner-discount__right">
                    <div className="discount-box">
                        <strong>3%</strong>
                        <span>Базовая дисконтная карта</span>
                    </div>
                    <div className="discount-box">
                        <strong>5%</strong>
                        <span>Для активных и постоянных клиентов</span>
                    </div>
                    <div className="discount-box">
                        <strong>CRM</strong>
                        <span>История покупок и клиентская база</span>
                    </div>
                </div>
            </section>

            <section className="corner-testimonials">
                <div className="section-top">
                    <div>
                        <span className="corner-label">Отзывы</span>
                        <h2>Что говорят наши покупатели</h2>
                    </div>
                </div>

                {reviews?.length > 0 ? (
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1200: { slidesPerView: 3 },
                        }}
                        className="reviews-swiper"
                    >
                        {reviews.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="review-card">
                                    <div className="review-card__top">
                                        <div className="review-avatar">
                                            {item.name ? item.name.charAt(0).toUpperCase() : "C"}
                                        </div>
                                        <div>
                                            <h4>{item.name}</h4>
                                            <span>Покупатель Corner</span>
                                        </div>
                                    </div>
                                    <p>{item.comment}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="empty-block">
                        <p>Пока отзывов нет, но блок уже готов для вывода данных.</p>
                    </div>
                )}
            </section>
            <Contact />
            <section className="corner-about">
                <div className="corner-about__content">
                    <span className="corner-label">О магазине</span>
                    <h2>Удобная система продаж и учета для магазина Corner</h2>
                    <p>
                        Corner — это онлайн-каталог для покупателей и рабочая система для
                        администратора. Она помогает вести товары, контролировать остатки,
                        фиксировать продажи, работать с клиентами и анализировать спрос.
                    </p>
                </div>

                <div className="corner-about__cards">
                    <div className="about-mini-card">
                        <strong>Каталог</strong>
                        <span>Товары, категории и карточки товаров</span>
                    </div>
                    <div className="about-mini-card">
                        <strong>Продажи</strong>
                        <span>Онлайн и офлайн оформление заказов</span>
                    </div>
                    <div className="about-mini-card">
                        <strong>Аналитика</strong>
                        <span>Отчеты, выручка и популярные позиции</span>
                    </div>
                </div>
            </section>

            <section className="corner-contacts">
                <div className="section-top">
                    <div>
                        <span className="corner-label">Контакты</span>
                        <h2>Свяжитесь с нами</h2>
                    </div>
                </div>

                <div className="contacts-grid">
                    <div className="contact-card">
                        <h3>Адрес</h3>
                        <p>г. Бишкек, ул. Киевская / Тоголок Молдо 5</p>
                    </div>

                    <div className="contact-card">
                        <h3>WhatsApp</h3>
                        <p>Для оформления заказа и отправки чека после оплаты</p>
                        <a href="https://wa.me/996709993289" target="_blank" rel="noreferrer">
                            Написать в WhatsApp
                        </a>
                    </div>

                    <div className="contact-card">
                        <h3>Instagram</h3>
                        <p>@cornerkg_</p>
                        <a
                            href="https://www.instagram.com/cornerkg_/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Открыть Instagram
                        </a>
                    </div>
                </div>
            </section>

            <section className="corner-final-banner">
                <div className="corner-final-banner__content">
                    <span className="corner-label">Corner Store</span>
                    <h2>Выберите товары и оформите заказ онлайн</h2>
                    <p>
                        Перейдите в каталог, добавьте нужные позиции в корзину и оформите
                        заказ удобным способом.
                    </p>
                    <Link to="/shop" className="primary-btn">
                        Смотреть каталог
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;