import React from "react";
import { useDispatch } from "react-redux";
import {
    decrementQuantity,
    incrementQuantity,
    removeItem,
} from "../../../../store/features/cartSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./cartItem.scss";

const CartItem = ({ image, title, price, quantity, category, item }) => {
    const dispatch = useDispatch();

    const total = Number(price || 0) * Number(quantity || 0);

    return (
        <article className="cart-item">
            <div className="cart-item__image">
                <img src={image} alt={title} />
            </div>

            <div className="cart-item__info">
                <span className="cart-item__category">{category}</span>
                <h3 className="cart-item__title">{title}</h3>

                {item?.selectedSize || item?.selectedColor ? (
                    <div className="cart-item__meta">
                        {item?.selectedSize && <span>Размер: {item.selectedSize}</span>}
                        {item?.selectedColor && <span>Цвет: {item.selectedColor}</span>}
                    </div>
                ) : null}
            </div>

            <div className="cart-item__quantity">
                <button
                    type="button"
                    className="quantity-button"
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    aria-label="Уменьшить количество"
                >
                    −
                </button>

                <span className="quantity-value">{quantity}</span>

                <button
                    type="button"
                    className="quantity-button"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    aria-label="Увеличить количество"
                >
                    +
                </button>
            </div>

            <div className="cart-item__price">
                <strong>{total}.00 сом</strong>
            </div>

            <div className="cart-item__remove">
                <button
                    type="button"
                    onClick={() => dispatch(removeItem(item.id))}
                    className="cart-trash"
                    aria-label="Удалить товар"
                >
                    <IoIosCloseCircleOutline />
                </button>
            </div>
        </article>
    );
};

export default CartItem;
