import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import CartItem from "../CartItem/CartItem";
import PaymentModal from "../PaymentModal/PaymentModal";
import { createOrder } from "../../../../store/slices/ordersSlice";
import { clearCart } from "../../../../store/features/cartSlice";
import "./cartPayment.scss";

const normalizePhone = (value = "") => value.replace(/\D/g, "");

const CartPayment = () => {
    const cart = useSelector((state) => state.cart.cart);
    const promocods = useSelector((state) => state.promocodReducer?.promocods || []);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [delivery, setDelivery] = useState(false);
    const [address, setAddress] = useState("");
    const [comment, setComment] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [orderDataState, setOrderDataState] = useState(null);

    const isPhoneValid = normalizePhone(phone).length >= 9;

    const totalQuantity = useMemo(
        () => cart.reduce((sum, item) => sum + item.quantity, 0),
        [cart]
    );

    const totalPrice = useMemo(
        () =>
            cart.reduce(
                (sum, item) =>
                    sum + Number(item.price || 0) * Number(item.quantity || 0),
                0
            ),
        [cart]
    );

    const foundDiscountCard = useMemo(() => {
        const normalizedInputPhone = normalizePhone(phone);
        if (!normalizedInputPhone) return null;

        return (
            promocods.find((card) => {
                const cardPhone = normalizePhone(card.phone);
                const isActive = !card.status || card.status === "active";
                return cardPhone === normalizedInputPhone && isActive;
            }) || null
        );
    }, [phone, promocods]);

    const discountPercent = Number(foundDiscountCard?.discount || 0);

    const discountedTotalPrice = useMemo(() => {
        if (!discountPercent) return totalPrice;
        return Math.round(totalPrice * (1 - discountPercent / 100));
    }, [totalPrice, discountPercent]);

    const handleCheckout = (e) => {
        e.preventDefault();

        if (
            !name.trim() ||
            !phone.trim() ||
            !isPhoneValid ||
            (delivery && !address.trim())
        ) {
            return;
        }

        const orderData = {
            order: cart.map((item) => ({
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                price: item.price,
                selectedSize: item.selectedSize || "",
                selectedColor: item.selectedColor || "",
            })),
            date: new Date().toISOString(),
            name: name.trim(),
            phone: phone.trim(),
            address: delivery ? address.trim() : "",
            comment: comment.trim(),
            amount: discountedTotalPrice,
            totalBeforeDiscount: totalPrice,
            discountPercent,
            discountCardNumber: foundDiscountCard?.cardNumber || "",
            delivery,
            status: "Новый",
        };

        dispatch(createOrder(orderData));
        setOrderDataState(orderData);
        setShowModal(true);
    };

    const handleClosePaymentModal = () => {
        setShowModal(false);
        dispatch(clearCart());
    };

    return (
        <section className="cart-payment page-container">
            <div className="cart-payment__top">
                <div>
                    <span className="cart-label">Корзина</span>
                    <h1>Оформление заказа</h1>
                    <p>
                        Проверьте товары, заполните данные и нажмите кнопку оплаты.
                        Если у вас есть дисконтная карта, скидка применится автоматически по номеру телефона.
                    </p>
                </div>
            </div>

            <div className="cart-layout">
                <div className="cart-left">
                    <div className="cart-block">
                        <div className="cart-head">
                            <h2>Ваш заказ</h2>
                            <span>{totalQuantity} товар(ов)</span>
                        </div>

                        {cart.length === 0 ? (
                            <div className="empty-cart">
                                <h3>Корзина пуста</h3>
                                <Link to="/shop" className="go-shop-btn">
                                    Перейти в каталог
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="cart-products">
                                    {cart.map((item) => (
                                        <CartItem
                                            key={`${item.id}-${item.selectedSize || ""}-${item.selectedColor || ""}`}
                                            item={item}
                                            quantity={item.quantity}
                                            image={item.image}
                                            title={item.title}
                                            category={item.category}
                                            price={item.price}
                                        />
                                    ))}
                                </div>

                                <div className="back-shop">
                                    <Link to="/shop">
                                        <HiOutlineArrowNarrowLeft />
                                        <span>Вернуться в каталог</span>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="cart-right">
                    <div className="cart-block">
                        <h2>Данные покупателя</h2>

                        {cart.length === 0 ? (
                            <div className="empty-side-text">
                                Чтобы перейти к оформлению, сначала добавьте товары в корзину.
                            </div>
                        ) : (
                            <form onSubmit={handleCheckout} className="checkout-form">
                                <div className="form-group">
                                    <label>Имя</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Введите ваше имя"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Телефон</label>
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Введите номер телефона"
                                        required
                                    />
                                    {!isPhoneValid && phone.length > 0 && (
                                        <span className="error-text">Введите корректный номер</span>
                                    )}
                                </div>

                                {phone.trim() && isPhoneValid && (
                                    <div className="discount-card-info">
                                        {foundDiscountCard ? (
                                            <>
                                                <div className="discount-card-info__title">
                                                    Дисконтная карта найдена
                                                </div>
                                                <div className="discount-card-info__rows">
                                                    <p>
                                                        <span>Номер карты</span>
                                                        <strong>{foundDiscountCard.cardNumber || "—"}</strong>
                                                    </p>
                                                    <p>
                                                        <span>Скидка</span>
                                                        <strong>{discountPercent}%</strong>
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <p className="discount-card-info__empty">
                                                По этому номеру телефона активная дисконтная карта не найдена
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div className="checkbox-row">
                                    <input
                                        id="delivery"
                                        type="checkbox"
                                        checked={delivery}
                                        onChange={(e) => setDelivery(e.target.checked)}
                                    />
                                    <label htmlFor="delivery">Доставка</label>
                                </div>

                                {delivery && (
                                    <div className="form-group">
                                        <label>Адрес доставки</label>
                                        <input
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Введите адрес"
                                            required
                                        />
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Комментарий к заказу</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Например: нужный размер, удобное время связи и т.д."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>

                                <div className="order-summary">
                                    <div className="summary-row">
                                        <span>Количество товаров</span>
                                        <strong>{totalQuantity}</strong>
                                    </div>

                                    <div className="summary-row">
                                        <span>Сумма без скидки</span>
                                        <strong>{totalPrice} сом</strong>
                                    </div>

                                    {discountPercent > 0 && (
                                        <div className="summary-row summary-row--discount">
                                            <span>Скидка по карте</span>
                                            <strong>-{discountPercent}%</strong>
                                        </div>
                                    )}

                                    <div className="summary-row summary-row--final">
                                        <span>Итого</span>
                                        <strong>{discountedTotalPrice} сом</strong>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="checkout-btn"
                                    disabled={
                                        !name.trim() ||
                                        !phone.trim() ||
                                        !isPhoneValid ||
                                        (delivery && !address.trim())
                                    }
                                >
                                    Перейти к оплате
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <PaymentModal
                isOpen={showModal}
                onClose={handleClosePaymentModal}
                orderData={orderDataState}
            />
        </section>
    );
};

export default CartPayment;
