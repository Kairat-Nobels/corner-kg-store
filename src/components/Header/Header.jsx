import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./header.scss";
import { HiShoppingCart } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import Connect from "../Connect/Connect";
import Footer from "../Footer/Footer";
import CameModal from "../CameModal/CameModal";
import CategoriesDropdown from "../CategoriesDropdown/CategoriesDropdown";

import { getOrders } from "../../store/slices/ordersSlice";
import { getReviews } from "../../store/slices/reviewsSlice";
import { getItems } from "../../store/slices/itemsSlice";
import { getCategories } from "../../store/slices/categoriesSlice";
import { getPromocods } from "../../store/slices/promocodSlice";
import { setCategory } from "../../store/features/filterSlice";

const Header = () => {
    const [hamburger, setHamburger] = useState(true);
    const [nav, setNav] = useState(false);
    const [modal, setModal] = useState(false);

    const cart = useSelector((state) => state.cart.cart);
    const { categories } = useSelector((state) => state.categoriesReducer);
    const { selectedCategory } = useSelector((state) => state.filterReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(getItems());
        dispatch(getReviews());
        dispatch(getOrders());
        dispatch(getCategories());
        dispatch(getPromocods());
    }, [dispatch]);

    const getTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return cart.reduce(
            (total, item) => total + Math.round(item.price) * item.quantity,
            0
        );
    };

    const changeCategory = (categoryName) => {
        dispatch(setCategory(categoryName));
        navigate("/shop");
        closeHamburger();
    };

    const closeHamburger = () => {
        setNav(false);
        setHamburger(true);
    };

    const openHamburger = () => {
        setNav(true);
        setHamburger(false);
    };

    const goToDiscountCards = () => {
        navigate("/shop");
        closeHamburger();
    };

    return (
        <>
            <header className="corner-header">
                <div className="header-container">
                    <div className="header-content">
                        <div className="header-left">
                            <div className="logo-part">
                                <Link to="/">CORNER</Link>
                            </div>

                            <ul className="dekstop-nav list-unstyled m-0">
                                <li>
                                    <Link
                                        to="/shop"
                                        className={location.pathname === "/shop" ? "active-link" : ""}
                                        onClick={() => dispatch(setCategory("All"))}
                                    >
                                        Каталог
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        className={`clean-button ${selectedCategory === "All" && location.pathname === "/shop"
                                            ? "active"
                                            : ""
                                            }`}
                                        onClick={() => changeCategory("All")}
                                    >
                                        Все товары
                                    </button>
                                </li>

                                <CategoriesDropdown
                                    categories={categories}
                                    changeCategory={changeCategory}
                                    selectedCategory={selectedCategory}
                                />

                                <li>
                                    <button className="clean-button" onClick={goToDiscountCards}>
                                        Дисконтные карты
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="header-right">
                            <button
                                className="admin-button"
                                onClick={() => {
                                    if (localStorage.getItem("admin") === "true") {
                                        navigate("/admin");
                                    } else {
                                        setModal(true);
                                    }
                                    closeHamburger();
                                }}
                            >
                                Админка
                            </button>

                            <p className="price">{getTotalPrice()} сом</p>

                            <div className="cart">
                                <Link to="/cart">
                                    <HiShoppingCart />
                                </Link>
                                <p className="cart-quantity">{getTotalQuantity()}</p>
                            </div>

                            <div className="hamburger-menu">
                                {hamburger ? (
                                    <button onClick={openHamburger}>
                                        <GiHamburgerMenu />
                                    </button>
                                ) : (
                                    <button onClick={closeHamburger}>
                                        <IoCloseSharp />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <ul
                    className={
                        nav ? "mobile-nav open-nav list-unstyled m-0" : "mobile-nav list-unstyled m-0"
                    }
                >
                    <li>
                        <Link to="/shop" onClick={closeHamburger}>
                            Каталог
                        </Link>
                    </li>

                    <li>
                        <button className="clean-button" onClick={() => changeCategory("All")}>
                            Все товары
                        </button>
                    </li>

                    {categories.map((category) => (
                        <li key={category.id}>
                            <button
                                className="clean-button"
                                onClick={() => changeCategory(category.name)}
                            >
                                {category.name}
                            </button>
                        </li>
                    ))}

                    <li>
                        <button className="clean-button" onClick={goToDiscountCards}>
                            Дисконтные карты
                        </button>
                    </li>
                </ul>
            </header>

            {modal && <CameModal setModal={setModal} />}

            <main>
                <Outlet />
            </main>

            <Connect />
            <Footer />
        </>
    );
};

export default Header;
