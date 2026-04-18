import React from "react";
import "./footer.scss";

const Footer = () => {
    return (
        <footer className="corner-footer">
            <div className="corner-footer__top">
                <div className="footer-col">
                    <h3 className="footer-logo">CORNER</h3>
                    <p>
                        Магазин одежды, обуви и аксессуаров.
                        Удобный каталог, быстрая оплата и оформление заказов через WhatsApp.
                    </p>
                </div>

                <div className="footer-col">
                    <h4>Навигация</h4>
                    <ul>
                        <li><a href="/">Главная</a></li>
                        <li><a href="/shop">Каталог</a></li>
                        <li><a href="/cart">Корзина</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Контакты</h4>
                    <ul>
                        <li>г. Бишкек</li>
                        <li>
                            <a href="https://wa.me/996709993289" target="_blank" rel="noreferrer">
                                WhatsApp
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/cornerkg_/" target="_blank" rel="noreferrer">
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Информация</h4>
                    <ul>
                        <li>Оплата по QR</li>
                        <li>Доставка</li>
                        <li>Дисконтные карты</li>
                    </ul>
                </div>
            </div>

            <div className="corner-footer__bottom">
                <span>© {new Date().getFullYear()} CORNER STORE</span>
                <span className="developer">
                    Developer
                </span>
            </div>
        </footer>
    );
};

export default Footer;
