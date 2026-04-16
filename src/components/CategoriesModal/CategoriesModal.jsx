import React, { useEffect, useState, useRef } from 'react';
import { Modal, Form, Button, Input } from 'rsuite';
import { useDispatch } from 'react-redux';
import { createCategories, updateCategories } from '../../store/slices/categoriesSlice';

const emptyCategory = {
  name: '',
  description: ''
};

const CategoriesModal = ({ open, onClose, categoryData }) => {
  const isEdit = Boolean(categoryData);
  const formRef = useRef();
  const [formValue, setFormValue] = useState(emptyCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      setFormValue({
        name: categoryData.name || '',
        description: categoryData.description || ''
      });
    } else {
      setFormValue(emptyCategory);
    }
  }, [categoryData, isEdit]);

  const handleChange = (val, key) => {
    setFormValue(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = () => {
    if (!formValue.name || !formValue.description) return;

    if (isEdit) {
      dispatch(updateCategories({ id: categoryData.id, news: formValue }));
    } else {
      dispatch(createCategories(formValue));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="460px">
      <Modal.Header>
        <Modal.Title>
          {isEdit ? 'Категорияны өзгөртүү' : 'Категория кошуу'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form fluid ref={formRef}>
          <Form.Group>
            <Form.ControlLabel>Аты</Form.ControlLabel>
            <Input
              value={formValue.name}
              onChange={val => handleChange(val, 'name')}
              placeholder="Категориянын аты"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Сүрөттөмө</Form.ControlLabel>
            <Input
              as="textarea"
              rows={4}
              value={formValue.description}
              onChange={val => handleChange(val, 'description')}
              placeholder="Категориянын сүрөттөмөсү"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          appearance="primary"
          onClick={handleSubmit}
          disabled={!formValue.name || !formValue.description}
        >
          Сактоо
        </Button>

        <Button onClick={onClose} appearance="subtle">
          Жокко чыгаруу
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoriesModal;
