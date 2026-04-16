import React, { useState } from 'react';
import { Modal, Button } from 'rsuite';

const statusOptions = [
  "Заказано",
  "Оплачено",
  "Доставлено",
  "Отменен"
];

const EditOrderModal = ({ open, onClose, order, onSave }) => {
  const [status, setStatus] = useState(order.status);
  const [address, setAddress] = useState(order.address);

  const handleSave = () => {
    onSave({ ...order, status, address });
  };

  return (
    <Modal open={open} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>
          Заказды өзгөртүү #{order.id}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Статус</label>
          <select
            className="form-select"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt === "Заказано" && "Кабыл алынды"}
                {opt === "Оплачено" && "Төлөндү"}
                {opt === "Доставлено" && "Жеткирилди"}
                {opt === "Отменен" && "Жокко чыгарылды"}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Дарек</label>
          <input
            className="form-control"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleSave} appearance="primary">
          Сактоо
        </Button>

        <Button onClick={onClose} appearance="subtle">
          Жокко чыгаруу
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOrderModal;
