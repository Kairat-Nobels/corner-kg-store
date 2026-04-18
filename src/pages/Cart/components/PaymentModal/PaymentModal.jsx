import React from "react";
import { Modal } from "rsuite";
import { FaWhatsapp } from "react-icons/fa";
import payment from "../../../../assets/images/payment.png";
import "rsuite/dist/rsuite.min.css";
import "./paymentModal.scss";

const PaymentModal = ({ isOpen, onClose, orderData }) => {
  const orderItems = orderData?.order || [];
  const totalPrice = orderData?.amount || 0;

  const orderText =
    "Здравствуйте! Отправляю чек по заказу.\n\n" +
    "Детали заказа:\n" +
    orderItems
      .map((item, idx) => {
        const sizeText = item.selectedSize ? `, размер: ${item.selectedSize}` : "";
        const colorText = item.selectedColor ? `, цвет: ${item.selectedColor}` : "";

        return `${idx + 1}) ${item.title} — ${item.quantity} шт. (${item.price} сом${sizeText}${colorText})`;
      })
      .join("\n") +
    `\n\nИтого: ${totalPrice} сом`;

  const whatsappLink = `https://wa.me/996709993289?text=${encodeURIComponent(
    orderText
  )}`;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="xs"
      className="corner-payment-modal"
    >
      <Modal.Header>
        <Modal.Title>Оплата заказа</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="corner-payment-modal__body">
          <div className="corner-payment-modal__image">
            <img src={payment} alt="Реквизиты для оплаты" />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="corner-payment-modal__whatsapp"
        >
          <FaWhatsapp />
          <span>Отправить чек в WhatsApp</span>
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
