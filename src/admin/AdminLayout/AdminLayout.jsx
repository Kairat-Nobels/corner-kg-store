import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'rsuite';
import styles from './adminLayout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { outAdmin } from '../../store/slices/adminSlice';
import { getItems } from '../../store/slices/itemsSlice';
import { getOrders } from '../../store/slices/ordersSlice';
import { getCategories } from '../../store/slices/categoriesSlice';
import { getReviews } from '../../store/slices/reviewsSlice';

function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { valid } = useSelector(state => state.adminReducer);
  const location = useLocation();

  useEffect(() => {
    if (valid && location.pathname === '/admin') {
      navigate('/admin/orders');
    }

    dispatch(getOrders());
    dispatch(getItems());
    dispatch(getCategories());
    dispatch(getReviews());
  }, [valid, location.pathname, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(outAdmin());
    navigate('/');
  };

  if (!valid) {
    return (
      <div className={styles.notWelcome}>
        <h2>Администратор катары кирүү керек</h2>
        <Button appearance="primary" onClick={handleLogout}>Чыгуу</Button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className='container'>
        <div className={styles.header}>
          <button className='general-button' onClick={() => navigate('/')}>
            Башкы бет
          </button>

          <h2>Башкаруу панели</h2>

          <button className='general-button red' onClick={handleLogout}>
            Чыгуу
          </button>
        </div>

        <div className={styles.navbar}>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? styles.active : ''}>
            Заказдар
          </NavLink>

          <NavLink to="/admin/reviews" className={({ isActive }) => isActive ? styles.active : ''}>
            Пикирлер
          </NavLink>

          <NavLink to="/admin/items" className={({ isActive }) => isActive ? styles.active : ''}>
            Товарлар
          </NavLink>

          <NavLink to="/admin/categories" className={({ isActive }) => isActive ? styles.active : ''}>
            Категориялар
          </NavLink>

          <NavLink to="/admin/promocodes" className={({ isActive }) => isActive ? styles.active : ''}>
            Промокоддор
          </NavLink>
        </div>

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
