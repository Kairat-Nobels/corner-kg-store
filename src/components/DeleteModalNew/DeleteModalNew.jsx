import React from "react";
import { Modal, Button } from "rsuite";
import { useDispatch } from "react-redux";

const DeleteModal = ({ deleteFunc, open, onClose, id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteFunc(id));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="xs" className="edit-order-modal">
      <Modal.Header>
        <Modal.Title>Удаление</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p style={{ textAlign: "center", color: "#b8b8b8" }}>
          Вы уверены, что хотите удалить?
        </p>
      </Modal.Body>

      <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={handleDelete}
          appearance="primary"
          style={{
            background: "#ef4444",
            border: "none",
            fontWeight: 700,
            borderRadius: 12,
            width: "48%",
          }}
        >
          Удалить
        </Button>

        <Button
          onClick={onClose}
          appearance="subtle"
          style={{
            width: "48%",
          }}
        >
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
