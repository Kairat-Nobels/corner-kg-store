import { useEffect, useState } from "react";
import styles from "./cameModal.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../store/slices/adminSlice";

function CameModal({ setModal }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const closeModal = () => {
        setModal(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorText("");

        const res = await dispatch(loginAdmin({ login, password }));

        if (res.meta.requestStatus === "fulfilled") {
            setModal(false);
            navigate("/admin");
        } else {
            setErrorText("Неверный логин или пароль");
        }
    };

    return (
        <div onClick={handleOverlayClick} className={styles.window}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <button
                    type="button"
                    onClick={closeModal}
                    className={styles.closeX}
                    aria-label="Закрыть"
                >
                    ×
                </button>

                <span className={styles.badge}>Admin panel</span>
                <h2>Вход в админку</h2>
                <p className={styles.subtitle}>
                    Введите логин и пароль, чтобы перейти в панель управления магазином
                </p>

                <div className={styles.field}>
                    <label htmlFor="admin-login">Логин</label>
                    <input
                        id="admin-login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                        placeholder="Введите логин"
                        autoComplete="username"
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="admin-password">Пароль</label>
                    <input
                        id="admin-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                        placeholder="Введите пароль"
                        autoComplete="current-password"
                    />
                </div>

                {errorText ? <p className={styles.error}>{errorText}</p> : null}

                <button type="submit" className={styles.submitButton}>
                    Войти
                </button>
            </form>
        </div>
    );
}

export default CameModal;
