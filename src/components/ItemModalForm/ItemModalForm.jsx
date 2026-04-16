import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, Schema, Uploader, Input, SelectPicker } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { createItem, updateItem } from "../../store/slices/itemsSlice";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  title: StringType().isRequired("Атын жазыңыз"),
  category: StringType().isRequired("Категорияны тандаңыз"),
  content: StringType().isRequired("Сүрөттөмөнү жазыңыз"),
  price: NumberType("Баасы сан болушу керек").isRequired("Баасын жазыңыз"),
});

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const ItemModalForm = ({ open, onClose, itemData }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const { categories } = useSelector((state) => state.categoriesReducer);

  const [formValue, setFormValue] = useState({});
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (itemData) {
      setFormValue({
        title: itemData.title || "",
        category: itemData.category || "",
        content: itemData.content || "",
        price: itemData.price || "",
        oldPrice: itemData.oldPrice || "",
      });
      setImgUrl(itemData.image || "");
    } else {
      setFormValue({});
      setImgUrl("");
    }
  }, [itemData]);

  const handleSubmit = () => {
    if (!formRef.current.check()) return;

    const payload = { ...formValue, image: imgUrl };

    if (itemData) {
      dispatch(updateItem({ id: itemData.id, updatedData: payload }));
    } else {
      dispatch(createItem(payload));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="600px" className="add-edit-modal">
      <Modal.Header>
        <Modal.Title>
          {itemData ? "Товарды өзгөртүү" : "Товар кошуу"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="item-modal__img">
          {imgUrl && (
            <img
              src={imgUrl}
              alt="item"
              style={{ width: "100%", borderRadius: 8 }}
            />
          )}

          <Uploader
            action="https://10164d994b23c605.mokky.dev/uploads"
            name="file"
            autoUpload
            style={{ marginTop: '15px' }}
            fileListVisible={false}
            onSuccess={(res) => {
              const url = res?.url;
              if (url) setImgUrl(url);
            }}
          >
            <Button appearance="ghost">Сүрөт жүктөө</Button>
          </Uploader>

          <Input
            placeholder="Же сүрөттүн шилтемесин киргизиңиз"
            value={imgUrl}
            onChange={setImgUrl}
            style={{ marginTop: 10 }}
          />
        </div>

        <Form
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          fluid
          className="item-modal__form"
        >
          <Form.Group>
            <Form.ControlLabel>Категория:</Form.ControlLabel>
            <Form.Control
              className="category"
              name="category"
              accepter={SelectPicker}
              data={categories.map(cat => ({ label: cat.name, value: cat.name }))}
              searchable={false}
              placeholder="Категорияны тандаңыз"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Аты:</Form.ControlLabel>
            <Form.Control name="title" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Сүрөттөмө:</Form.ControlLabel>
            <Form.Control name="content" accepter={Textarea} rows={3} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Баасы (сом):</Form.ControlLabel>
            <Form.Control name="price" type="number" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Эски баа (сом):</Form.ControlLabel>
            <Form.Control name="oldPrice" type="number" />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="modal-footer">
        <Button
          disabled={
            !formValue.title ||
            !formValue.category ||
            !formValue.content ||
            !formValue.price
          }
          appearance="primary"
          onClick={handleSubmit}
        >
          {itemData ? "Өзгөртүүлөрдү сактоо" : "Товар кошуу"}
        </Button>

        <Button onClick={onClose} appearance="subtle">
          Жокко чыгаруу
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModalForm;
