import React, { useEffect, useState } from "react";
import { Modal, Button, SelectPicker, Input } from "rsuite";

const statusOptions = [
  { label: "Новый", value: "Новый" },
  { label: "Подтвержден", value: "Подтвержден" },
  { label: "Оплачен", value: "Оплачен" },
  { label: "Доставлен", value: "Доставлен" },
  { label: "Отменен", value: "Отменен" },
];

const EditOrderModal = ({ open, onClose, order, onSave }) => {
  const [status, setStatus] = useState(order?.status || "");
  const [address, setAddress] = useState(order?.address || "");

  useEffect(() => {
    if (order) {
      setStatus(order.status || "");
      setAddress(order.address || "");
    }
  }, [order]);

  const handleSave = () => {
    onSave({
      ...order,
      status,
      address,
    });
  };

  return (
    <Modal open={open} onClose={onClose} size="xs" className="edit-order-modal">
      <Modal.Header>
        <Modal.Title>
          Редактирование заказа #{order?.id}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group">
          <label>Статус</label>

          <SelectPicker
            data={statusOptions}
            value={status}
            onChange={setStatus}
            searchable={false}
            cleanable={false}
            placeholder="Выберите статус"
            style={{ width: "100%" }}
          />
        </div>

        <div className="form-group">
          <label>Адрес</label>

          <Input
            value={address}
            onChange={setAddress}
            placeholder="Введите адрес доставки"
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button appearance="primary" onClick={handleSave}>
          Сохранить
        </Button>

        <Button appearance="subtle" onClick={onClose}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOrderModal;
