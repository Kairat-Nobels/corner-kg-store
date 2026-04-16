import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import PaymentModal from '../PaymentModal/PaymentModal';
import "./cartPayment.scss";
import { createOrder } from '../../../../store/slices/ordersSlice';

const CartPayment = () => {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const promocods = useSelector(state => state.promocodReducer.promocods);

    const [promo, setPromo] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [delivery, setDelivery] = useState(false);
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const getTotalQuantity = () => cart.reduce((sum, item) => sum + item.quantity, 0);
    const getTotalPrice = () => cart.reduce((sum, item) => sum + Math.round(item.price) * item.quantity, 0);
    const getDiscountedPrice = () => Math.round(getTotalPrice() * (1 - discount));

    const handlePromoApply = (e) => {
        e.preventDefault();
        const found = promocods.find(p => p.code.toLowerCase() === promo.trim().toLowerCase());
        if (found) {
            setPromoApplied(true);
            setDiscount(found.discount / 100);
        } else {
            setPromoApplied(false);
            setDiscount(0);
            alert('Промокод туура эмес');
        }
    };

    const handleCheckout = (e) => {
        e.preventDefault();

        if (!name || !phone || (delivery && !address)) {
            alert('Сураныч, бардык талааларды толтуруңуз');
            return;
        }

        if (!isValid) {
            alert('Телефон номери туура эмес');
            return;
        }

        const orderData = {
            order: cart.map(item => ({
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                price: item.price
            })),
            date: new Date().toISOString(),
            name,
            phone,
            address: delivery ? address : "",
            amount: getDiscountedPrice(),
            status: "Заказано"
        };

        dispatch(createOrder(orderData));
        setShowModal(true);
    };

    const handlePhoneNumberChange = (event) => {
        let input = event.target.value.replace(/\D/g, '');
        if (!/^(2\d{2}|5\d{2}|7\d{2}|9\d{2})\d{6}$/.test(input)) {
            setIsValid(false);
            setPhone(input);
            return;
        }
        input = input.replace(/^(\d{3})(\d{3})(\d{3})$/, '($1)-$2-$3');
        setIsValid(/^\(\d{3}\)-\d{3}-\d{3}$/.test(input));
        setPhone(input);
    };

    return (
        <div className="cart-payment">
            <div className="container py-2 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div className="card card-registration card-registration-2">
                            <div className={`card-body p-0 ${cart.length === 0 ? "empty-cart" : ""}`}>
                                <div className="row g-0">

                                    {/* LEFT */}
                                    <div className="col-lg-8">
                                        <div className="p-5 left-cart">

                                            <div className="cart-head d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0">Себет</h1>
                                                <h6 className="mb-0 text-muted">{getTotalQuantity()} товар</h6>
                                            </div>

                                            <div className={`cart-products ${cart.length === 0 ? "empty" : ""}`}>
                                                {cart.length === 0 ? (
                                                    <div className="text-center py-5">
                                                        <h4>Себет бош</h4>
                                                        <Link to="/shop" className="btn btn-primary mt-3">
                                                            Дүкөнгө өтүү
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    cart.map((item) => (
                                                        <CartItem
                                                            key={item.id}
                                                            item={item}
                                                            quantity={item.quantity}
                                                            image={item.image}
                                                            title={item.title}
                                                            category={item.category}
                                                            price={item.price}
                                                        />
                                                    ))
                                                )}
                                            </div>

                                            <div className="pt-5 back-shop">
                                                <h6 className="mb-0">
                                                    <Link to="/shop">
                                                        <HiOutlineArrowNarrowLeft />
                                                        Дүкөнгө кайтуу
                                                    </Link>
                                                </h6>
                                            </div>

                                        </div>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="col-lg-4 bg-grey">
                                        <div className="p-5">

                                            <h3 className="fw-bold mb-5 text-center cart-head">
                                                Заказды тариздөө
                                            </h3>

                                            {cart.length === 0 ? (
                                                <div className="text-center text-muted">
                                                    Заказ берүү үчүн товар кошуңуз
                                                </div>
                                            ) : (
                                                <form onSubmit={handleCheckout}>

                                                    <div className="mb-3">
                                                        <label className="form-label">Атыңыз</label>
                                                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Телефон</label>
                                                        <input type="tel" className="form-control" value={phone} onChange={handlePhoneNumberChange} required />
                                                        {!isValid && phone.length > 0 && (
                                                            <div className="text-danger mt-1">
                                                                Телефон номери туура эмес
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="form-check mb-3">
                                                        <input className="form-check-input" type="checkbox" checked={delivery} onChange={e => setDelivery(e.target.checked)} id="deliveryCheck" />
                                                        <label className="form-check-label">
                                                            Жеткирүү
                                                        </label>
                                                    </div>

                                                    {delivery && (
                                                        <div className="mb-3">
                                                            <label className="form-label">Дарек</label>
                                                            <input type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)} required />
                                                        </div>
                                                    )}

                                                    <div className="mb-3">
                                                        <label className="form-label">Промокод</label>
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" value={promo} onChange={e => setPromo(e.target.value)} disabled={promoApplied} />
                                                            <button className="btn btn-outline-secondary" onClick={handlePromoApply} disabled={promoApplied}>
                                                                Колдонуу
                                                            </button>
                                                        </div>
                                                        {promoApplied && (
                                                            <div className="text-success mt-1">
                                                                Промокод колдонулду! -{discount * 100}%
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="d-flex justify-content-between mb-3">
                                                        <h5>Жалпы</h5>
                                                        <h5>
                                                            {promoApplied && (
                                                                <span style={{ textDecoration: 'line-through', color: '#888', marginRight: 8 }}>
                                                                    {getTotalPrice()} сом
                                                                </span>
                                                            )}
                                                            {getDiscountedPrice()} сом
                                                        </h5>
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className="general-button w-100"
                                                        disabled={!name || !phone || !isValid || (delivery && !address)}
                                                    >
                                                        Төлөөгө өтүү
                                                    </button>

                                                </form>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PaymentModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                promoApplied={promoApplied}
                discount={discount}
            />
        </div>
    );
};

export default CartPayment;
