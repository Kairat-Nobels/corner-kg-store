import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/slices/reviewsSlice";
import "./contact.scss";

const Contact = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const isPhoneValid = phone.replace(/\D/g, "").length >= 9;
    const isFormValid = name.trim() && comment.trim() && isPhoneValid;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        try {
            setIsSubmitting(true);
            setSuccess(false);

            await dispatch(
                createReview({
                    name: name.trim(),
                    phone: phone.trim(),
                    comment: comment.trim(),
                })
            );

            setName("");
            setPhone("");
            setComment("");
            setSuccess(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="corner-review-section">
            <div className="corner-review-wrapper">
                <span className="corner-label">Отзывы</span>

                <h2>Оставьте отзыв</h2>
                <p className="corner-review-subtitle">
                    Поделитесь своим мнением о магазине и качестве товаров
                </p>

                <form onSubmit={handleSubmit} className="corner-review-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Ваше имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="tel"
                            placeholder="Ваш телефон"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        {phone.length > 0 && !isPhoneValid && (
                            <span className="error-text">
                                Введите корректный номер
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <textarea
                            placeholder="Ваш отзыв"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={5}
                            required
                        />
                    </div>

                    <button type="submit" disabled={!isFormValid || isSubmitting}>
                        {isSubmitting ? "Отправка..." : "Отправить отзыв"}
                    </button>

                    {success && (
                        <p className="success-text">
                            Спасибо! Отзыв отправлен 👍
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Contact;
