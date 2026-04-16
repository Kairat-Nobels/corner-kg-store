import React from 'react';
import { Link } from 'react-router-dom';
import "./productCard.scss";
import { HiShoppingCart } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/features/cartSlice';

const ProductCard = (props) => {
    const { image, title, category, price, oldPrice, item } = props;
    const dispatch = useDispatch();

    return (
        <div data-aos="fade-up" className="product-card d-flex flex-column col-12 col-sm-6 col-md-3 mb-4">
            <div className="product-image mb-1">
                <Link to={`/shop/${item.id}`}>
                    <img src={image} alt={title} />
                </Link>
            </div>

            <div className="product-info px-3 d-flex flex-column">
                <span className='product-category'>{category}</span>
                <h3>
                    <Link to={`/shop/${item.id}`}>{title}</Link>
                </h3>

                <div className="product-prices d-flex">
                    {oldPrice ? (
                        <>
                            <del className='product-price pe-2'>{oldPrice}.00 сом</del>
                            <span className='product-price'>{price}.00 сом</span>
                        </>
                    ) : (
                        <span className='product-price'>{price}.00 сом</span>
                    )}
                </div>
            </div>

            <div className="product-card-buttons d-flex flex-column">
                <button onClick={() => { dispatch(addToCart(item)) }} className='add-cart'>
                    <HiShoppingCart />
                    <span>Себетке кошуу</span>
                </button>

                <button className='quick-view'>
                    <FaEye />
                    <span>Тез көрүү</span>
                </button>
            </div>

            {oldPrice && <span className="product-sale">Арзандатуу</span>}
        </div>
    );
};

export default ProductCard;
