import React from 'react';
import { Modal, Button } from 'rsuite';
import { useDispatch } from 'react-redux';

const DeleteModal = ({ deleteFunc, open, onClose, id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteFunc(id));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>Жазууну өчүрүү</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Чын эле өчүргүңүз келеби?
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleDelete} appearance="primary" color="red">
          Өчүрүү
        </Button>

        <Button onClick={onClose} appearance="subtle">
          Жокко чыгаруу
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
