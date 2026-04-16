import React, { useEffect, useState, useRef } from 'react';
import { Modal, Form, Button, Input } from 'rsuite';
import { useDispatch } from 'react-redux';
import { createPromocod, updatePromocod } from '../../store/slices/promocodSlice';

const emptyCategory = {
  code: '',
  discount: ''
};

const PromocodesModal = ({ open, onClose, categoryData }) => {
  const isEdit = Boolean(categoryData);
  const formRef = useRef();
  const [formValue, setFormValue] = useState(emptyCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      setFormValue({
        code: categoryData.code || '',
        discount: categoryData.discount || 0
      });
    } else {
      setFormValue(emptyCategory);
    }
  }, [categoryData, isEdit]);

  const handleChange = (val, key) => {
    setFormValue(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = () => {
    if (!formValue.code || !formValue.discount) return;

    if (isEdit) {
      dispatch(updatePromocod({ id: categoryData.id, promocod: formValue }));
    } else {
      dispatch(createPromocod(formValue));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="460px">
      <Modal.Header>
        <Modal.Title>
          {isEdit ? 'Промокодду өзгөртүү' : 'Промокод кошуу'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form fluid ref={formRef}>
          <Form.Group>
            <Form.ControlLabel>Промокод</Form.ControlLabel>
            <Input
              value={formValue.code}
              onChange={val => handleChange(val, 'code')}
              placeholder="Промокодду киргизиңиз"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Жеңилдик (%)</Form.ControlLabel>
            <Form.Control
              name="discount"
              type="number"
              value={formValue.discount}
              onChange={val => handleChange(val, 'discount')}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          appearance="primary"
          onClick={handleSubmit}
          disabled={!formValue.code || !formValue.discount}
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

export default PromocodesModal;
