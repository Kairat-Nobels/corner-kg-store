import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/features/cartSlice";
import { getItems } from "../../store/slices/itemsSlice";
import Spinner from "../../components/Spinner/Spinner";
import "./product.scss";

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { items, loading, error } = useSelector((state) => state.itemsReducer);

    const product = useMemo(
        () => items.find((item) => String(item.id) === String(id)),
        [items, id]
    );

    const productSizes = useMemo(() => {
        if (!product) return [];
        if (Array.isArray(product.sizes) && product.sizes.length) return product.sizes;
        return ["S", "M", "L", "XL"];
    }, [product]);

    const productColors = useMemo(() => {
        if (!product) return [];
        if (Array.isArray(product.colors) && product.colors.length) return product.colors;
        return ["Черный", "Белый"];
    }, [product]);

    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    useEffect(() => {
        if (!items.length) {
            dispatch(getItems());
        }
    }, [dispatch, items.length]);

    useEffect(() => {
        if (productSizes.length && !selectedSize) {
            setSelectedSize(productSizes[0]);
        }
    }, [productSizes, selectedSize]);

    useEffect(() => {
        if (productColors.length && !selectedColor) {
            setSelectedColor(productColors[0]);
        }
    }, [productColors, selectedColor]);

    if (loading) {
        return (
            <div className="product-page page-container">
                <div className="loading">
                    <Spinner />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-page page-container">
                <div className="fetchError">
                    <p>Ошибка: {error}</p>
                    <p>Проверь интернет и обнови страницу.</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-page page-container">
                <div className="fetchError">
                    <p>Товар не найден</p>
                    <p>Возможно, он был удален или ссылка устарела.</p>
                </div>
            </div>
        );
    }

    const stock =
        typeof product.stock === "number"
            ? product.stock
            : Math.floor(Math.random() * 8) + 1;

    const stockText =
        stock > 5
            ? "В наличии"
            : stock > 0
                ? `Осталось ${stock} шт.`
                : "Нет в наличии";

    const whatsappText = encodeURIComponent(
        `Здравствуйте! Хочу заказать товар:\n` +
        `Название: ${product.title}\n` +
        `Размер: ${selectedSize}\n` +
        `Цвет: ${selectedColor}\n` +
        `Цена: ${product.price}.00 сом`
    );

    const whatsappLink = `https://wa.me/996709993289?text=${whatsappText}`;

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                ...product,
                selectedSize,
                selectedColor,
            })
        );
    };

    return (
        <section className="product-page page-container">
            <div className="back-shop">
                <Link to="/shop">
                    <IoChevronBackOutline />
                    <span>Назад в каталог</span>
                </Link>
            </div>

            <div className="product-layout">
                <div className="product-gallery">
                    <div className="product-main-image">
                        <img src={product.image} alt={product.title} />
                        {product.oldPrice ? <span className="product-badge">Sale</span> : null}
                    </div>
                </div>

                <div className="product-details">
                    <span className="product-category">{product.category}</span>

                    <h1>{product.title}</h1>

                    <p className="product-description">
                        {product.description ||
                            "Стильный товар из ассортимента магазина Corner. Подходит для повседневного образа и удобного современного стиля."}
                    </p>

                    <div className="product-prices">
                        {product.oldPrice ? (
                            <>
                                <span className="old-price">{product.oldPrice}.00 сом</span>
                                <span className="current-price">{product.price}.00 сом</span>
                            </>
                        ) : (
                            <span className="current-price">{product.price}.00 сом</span>
                        )}
                    </div>

                    <div className="product-stock">
                        <span className={stock > 0 ? "in-stock" : "out-stock"}>{stockText}</span>
                    </div>

                    <div className="product-options">
                        <div className="option-group">
                            <h3>Размер</h3>
                            <div className="option-list">
                                {productSizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        className={selectedSize === size ? "active" : ""}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="option-group">
                            <h3>Цвет</h3>
                            <div className="option-list">
                                {productColors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        className={selectedColor === color ? "active" : ""}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="product-meta">
                        <div className="meta-card">
                            <span>Категория</span>
                            <strong>{product.category}</strong>
                        </div>
                        <div className="meta-card">
                            <span>Размер</span>
                            <strong>{selectedSize}</strong>
                        </div>
                        <div className="meta-card">
                            <span>Цвет</span>
                            <strong>{selectedColor}</strong>
                        </div>
                    </div>

                    <div className="product-actions">
                        <button className="add-cart-btn" onClick={handleAddToCart} disabled={stock <= 0}>
                            <HiShoppingCart />
                            <span>В корзину</span>
                        </button>

                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="whatsapp-btn"
                        >
                            <FaWhatsapp />
                            <span>Заказать в WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;
