import React, { useEffect, useState, useRef } from "react";
import { Modal, Form, Button, Input, SelectPicker } from "rsuite";
import { useDispatch } from "react-redux";
import { createPromocod, updatePromocod } from "../../store/slices/promocodSlice";

const emptyCard = {
  cardNumber: "",
  clientName: "",
  phone: "",
  discount: "",
  totalPurchases: "",
  status: "active",
};

const statusOptions = [
  { label: "Активна", value: "active" },
  { label: "Неактивна", value: "inactive" },
];

const PromocodesModal = ({ open, onClose, categoryData }) => {
  const isEdit = Boolean(categoryData);
  const formRef = useRef();
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(emptyCard);

  useEffect(() => {
    if (isEdit) {
      setFormValue({
        cardNumber: categoryData.cardNumber || categoryData.code || "",
        clientName: categoryData.clientName || "",
        phone: categoryData.phone || "",
        discount: categoryData.discount || "",
        totalPurchases: categoryData.totalPurchases || "",
        status: categoryData.status || "active",
      });
    } else {
      setFormValue(emptyCard);
    }
  }, [categoryData, isEdit, open]);

  const handleChange = (value, key) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (
      !formValue.cardNumber.trim() ||
      !formValue.clientName.trim() ||
      !formValue.phone.trim() ||
      !formValue.discount
    ) {
      return;
    }

    const payload = {
      cardNumber: formValue.cardNumber.trim(),
      clientName: formValue.clientName.trim(),
      phone: formValue.phone.trim(),
      discount: Number(formValue.discount),
      totalPurchases: formValue.totalPurchases
        ? Number(formValue.totalPurchases)
        : 0,
      status: formValue.status || "active",
    };

    if (isEdit) {
      dispatch(updatePromocod({ id: categoryData.id, updatedData: payload }));
    } else {
      dispatch(createPromocod(payload));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="500px" className="edit-order-modal">
      <Modal.Header>
        <Modal.Title>
          {isEdit ? "Редактировать дисконтную карту" : "Добавить дисконтную карту"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form fluid ref={formRef}>
          <Form.Group>
            <Form.ControlLabel>Номер карты</Form.ControlLabel>
            <Input
              value={formValue.cardNumber}
              onChange={(value) => handleChange(value, "cardNumber")}
              placeholder="Например: CORNER-001"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Имя клиента</Form.ControlLabel>
            <Input
              value={formValue.clientName}
              onChange={(value) => handleChange(value, "clientName")}
              placeholder="Введите имя клиента"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Телефон</Form.ControlLabel>
            <Input
              value={formValue.phone}
              onChange={(value) => handleChange(value, "phone")}
              placeholder="Введите номер телефона"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Скидка (%)</Form.ControlLabel>
            <Input
              type="number"
              value={formValue.discount}
              onChange={(value) => handleChange(value, "discount")}
              placeholder="Например: 3"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Сумма покупок</Form.ControlLabel>
            <Input
              type="number"
              value={formValue.totalPurchases}
              onChange={(value) => handleChange(value, "totalPurchases")}
              placeholder="Например: 15000"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Статус</Form.ControlLabel>
            <SelectPicker
              data={statusOptions}
              value={formValue.status}
              onChange={(value) => handleChange(value, "status")}
              searchable={false}
              cleanable={false}
              placeholder="Выберите статус"
              style={{ width: "100%" }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          appearance="primary"
          onClick={handleSubmit}
          disabled={
            !formValue.cardNumber.trim() ||
            !formValue.clientName.trim() ||
            !formValue.phone.trim() ||
            !formValue.discount
          }
        >
          Сохранить
        </Button>

        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PromocodesModal;
