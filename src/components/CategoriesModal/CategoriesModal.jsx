import React, { useEffect, useState, useRef } from "react";
import { Modal, Form, Button, Input } from "rsuite";
import { useDispatch } from "react-redux";
import {
  createCategory,
  updateCategory,
} from "../../store/slices/categoriesSlice";

const emptyCategory = {
  name: "",
  description: "",
};

const CategoriesModal = ({ open, onClose, categoryData }) => {
  const isEdit = Boolean(categoryData);
  const formRef = useRef();
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(emptyCategory);

  useEffect(() => {
    if (isEdit) {
      setFormValue({
        name: categoryData.name || "",
        description: categoryData.description || "",
      });
    } else {
      setFormValue(emptyCategory);
    }
  }, [categoryData, isEdit, open]);

  const handleChange = (value, key) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!formValue.name.trim() || !formValue.description.trim()) return;

    if (isEdit) {
      dispatch(
        updateCategory({
          id: categoryData.id,
          updatedData: {
            name: formValue.name.trim(),
            description: formValue.description.trim(),
          },
        })
      );
    } else {
      dispatch(
        createCategory({
          name: formValue.name.trim(),
          description: formValue.description.trim(),
        })
      );
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="460px" className="edit-order-modal">
      <Modal.Header>
        <Modal.Title>
          {isEdit ? "Редактировать категорию" : "Добавить категорию"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form fluid ref={formRef}>
          <Form.Group>
            <Form.ControlLabel>Название</Form.ControlLabel>
            <Input
              value={formValue.name}
              onChange={(value) => handleChange(value, "name")}
              placeholder="Введите название категории"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Описание</Form.ControlLabel>
            <Input
              as="textarea"
              rows={4}
              value={formValue.description}
              onChange={(value) => handleChange(value, "description")}
              placeholder="Введите описание категории"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          appearance="primary"
          onClick={handleSubmit}
          disabled={!formValue.name.trim() || !formValue.description.trim()}
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

export default CategoriesModal;
