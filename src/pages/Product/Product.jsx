import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/features/cartSlice';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import Spinner from '../../components/Spinner/Spinner';
import "./product.scss";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.itemsReducer);

    useEffect(() => {
        const productDetail = items.find((item) => +item.id === +id);
        setProduct(productDetail);
    }, [id, items]);

    return (
        <div className="product product-page page-container">
            <div className="pt-4 pt-md-5 back-shop">
                <h6 className="mb-0">
                    <Link to="/shop">
                        <HiOutlineArrowNarrowLeft />
                        Дүкөнгө кайтуу
                    </Link>
                </h6>
            </div>

            <div className="row">
                {loading ? (
                    <div className='loading'>
                        <Spinner />
                    </div>
                ) : error ? (
                    <div className='fetchError'>
                        <p>😕 Ката: {error}</p>
                        <p>Интернетти текшерип, баракты жаңыртып көрүңүз</p>
                    </div>
                ) : !product ? (
                    <div className='fetchError'>
                        <p>Товар табылган жок</p>
                    </div>
                ) : (
                    <div className='flexible'>
                        <div data-aos="fade-up" className="product-image">
                            <img src={product.image} alt={product.title} className='w-100' />
                        </div>

                        <div className="col-12 col-md-5 product-info">
                            <h2 data-aos="fade-left">{product.title}</h2>
                            <span data-aos="fade-left" className='product-category'>
                                {product.category}
                            </span>

                            <p data-aos="fade-left">{product.content}</p>

                            <div data-aos="fade-left" className="product-prices d-flex pb-2">
                                {product.oldPrice ? (
                                    <>
                                        <del className='product-price pe-2'>{product.oldPrice}.00 сом</del>
                                        <span className='product-price current-price'>{product.price}.00 сом</span>
                                    </>
                                ) : (
                                    <span className='product-price current-price'>{product.price}.00 сом</span>
                                )}
                            </div>

                            <button
                                data-aos="fade-left"
                                className='general-button add-button'
                                onClick={() => dispatch(addToCart(product))}
                            >
                                Себетке кошуу
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
