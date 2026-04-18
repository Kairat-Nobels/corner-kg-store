import React from "react";
import { Link } from "react-router-dom";
import "./productCard.scss";
import { HiShoppingCart } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/features/cartSlice";

const ProductCard = ({ image, title, category, price, oldPrice, item }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(item));
    };

    return (
        <article className="product-card" data-aos="fade-up">
            <Link to={`/shop/${item.id}`} className="product-card__image">
                <img src={image} alt={title} />
                {oldPrice ? <span className="product-card__badge">Sale</span> : null}
            </Link>

            <div className="product-card__content">
                <div className="product-card__meta">
                    <span className="product-card__category">{category}</span>
                    <Link to={`/shop/${item.id}`} className="product-card__title">
                        {title}
                    </Link>
                </div>

                <div className="product-card__bottom">
                    <div className="product-card__prices">
                        {oldPrice ? (
                            <>
                                <span className="product-card__old-price">{oldPrice}.00 сом</span>
                                <span className="product-card__price">{price}.00 сом</span>
                            </>
                        ) : (
                            <span className="product-card__price">{price}.00 сом</span>
                        )}
                    </div>

                    <div className="product-card__actions">
                        <button className="add-cart-btn" onClick={handleAddToCart}>
                            <HiShoppingCart />
                            <span>В корзину</span>
                        </button>

                        <Link to={`/shop/${item.id}`} className="details-btn">
                            Подробнее
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
