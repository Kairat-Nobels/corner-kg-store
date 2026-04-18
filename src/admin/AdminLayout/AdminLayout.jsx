import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./adminLayout.module.css";
import { useDispatch, useSelector } from "react-redux";

import { outAdmin } from "../../store/slices/adminSlice";
import { getItems } from "../../store/slices/itemsSlice";
import { getOrders } from "../../store/slices/ordersSlice";
import { getCategories } from "../../store/slices/categoriesSlice";
import { getReviews } from "../../store/slices/reviewsSlice";
import { getPromocods } from "../../store/slices/promocodSlice";

function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { valid, adminData } = useSelector((state) => state.adminReducer);

  useEffect(() => {
    if (valid && location.pathname === "/admin") {
      navigate("/admin/orders", { replace: true });
    }
  }, [valid, location.pathname, navigate]);

  useEffect(() => {
    if (!valid) return;

    dispatch(getOrders());
    dispatch(getItems());
    dispatch(getCategories());
    dispatch(getReviews());
    dispatch(getPromocods());
  }, [valid, dispatch]);

  const handleLogout = () => {
    dispatch(outAdmin());
    navigate("/");
  };

  if (!valid) {
    return (
      <div className={styles.notWelcome}>
        <div className={styles.notWelcomeBox}>
          <span className={styles.badge}>Admin panel</span>
          <h2>Доступ запрещен</h2>
          <p>Чтобы открыть панель управления, нужно войти как администратор.</p>
          <button className={styles.primaryButton} onClick={() => navigate("/")}>
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.logoBlock}>
          <span className={styles.logo}>CORNER</span>
          <span className={styles.logoSub}>Admin panel</span>
        </div>

        <nav className={styles.navbar}>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            Заказы
          </NavLink>

          <NavLink
            to="/admin/reviews"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            Отзывы
          </NavLink>

          <NavLink
            to="/admin/items"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            Товары
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            Категории
          </NavLink>

          <NavLink
            to="/admin/promocodes"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            Дисконтные карты
          </NavLink>
        </nav>

        <div className={styles.sidebarBottom}>
          <button className={styles.secondaryButton} onClick={() => navigate("/")}>
            На сайт
          </button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <span className={styles.badge}>Управление магазином</span>
            <h1>Панель администратора</h1>
            <p>
              Управляйте товарами, заказами, отзывами, категориями и дисконтными
              картами магазина.
            </p>
          </div>

          <div className={styles.adminInfo}>
            <span className={styles.adminInfoLabel}>Администратор</span>
            <strong>{adminData?.name || adminData?.login || "Admin"}</strong>
          </div>
        </div>

        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
