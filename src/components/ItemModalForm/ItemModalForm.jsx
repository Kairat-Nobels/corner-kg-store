import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Button,
  Form,
  Schema,
  Uploader,
  Input,
  SelectPicker,
  TagPicker,
} from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { createItem, updateItem } from "../../store/slices/itemsSlice";

const { StringType, NumberType, ArrayType } = Schema.Types;

const model = Schema.Model({
  title: StringType().isRequired("Введите название товара"),
  category: StringType().isRequired("Выберите категорию"),
  description: StringType().isRequired("Введите описание"),
  price: NumberType("Цена должна быть числом").isRequired("Введите цену"),
  stock: NumberType("Остаток должен быть числом").isRequired("Введите остаток"),
  sizes: ArrayType().isRequired("Добавьте размеры"),
  colors: ArrayType().isRequired("Добавьте цвета"),
});

const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const sizeOptions = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
  { label: "40", value: "40" },
  { label: "41", value: "41" },
  { label: "42", value: "42" },
  { label: "43", value: "43" },
  { label: "44", value: "44" },
  { label: "45", value: "45" },
  { label: "One Size", value: "One Size" },
];

const colorOptions = [
  { label: "Черный", value: "Черный" },
  { label: "Белый", value: "Белый" },
  { label: "Серый", value: "Серый" },
  { label: "Бежевый", value: "Бежевый" },
  { label: "Синий", value: "Синий" },
  { label: "Красный", value: "Красный" },
  { label: "Зеленый", value: "Зеленый" },
];

const ItemModalForm = ({ open, onClose, itemData }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const { categories } = useSelector((state) => state.categoriesReducer);

  const [formValue, setFormValue] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    oldPrice: "",
    stock: "",
    sizes: [],
    colors: [],
    isHit: false,
  });

  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (itemData) {
      setFormValue({
        title: itemData.title || "",
        category: itemData.category || "",
        description: itemData.description || itemData.content || "",
        price: itemData.price || "",
        oldPrice: itemData.oldPrice || "",
        stock: itemData.stock || "",
        sizes: itemData.sizes || [],
        colors: itemData.colors || [],
        isHit: itemData.isHit || false,
      });
      setImgUrl(itemData.image || "");
    } else {
      setFormValue({
        title: "",
        category: "",
        description: "",
        price: "",
        oldPrice: "",
        stock: "",
        sizes: [],
        colors: [],
        isHit: false,
      });
      setImgUrl("");
    }
  }, [itemData, open]);

  const handleSubmit = () => {
    if (!formRef.current.check()) return;

    const payload = {
      ...formValue,
      image: imgUrl,
      price: Number(formValue.price),
      oldPrice: formValue.oldPrice ? Number(formValue.oldPrice) : null,
      stock: Number(formValue.stock),
    };

    if (itemData) {
      dispatch(updateItem({ id: itemData.id, updatedData: payload }));
    } else {
      dispatch(createItem(payload));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="700px" className="add-edit-modal">
      <Modal.Header>
        <Modal.Title>
          {itemData ? "Редактировать товар" : "Добавить товар"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="item-modal__img">
          {imgUrl && (
            <img
              src={imgUrl}
              alt="preview"
              style={{ width: "100%", borderRadius: 10 }}
            />
          )}

          <Uploader
            action="https://8125b7a6d714c2fc.mokky.dev/uploads"
            name="file"
            autoUpload
            style={{ marginTop: "15px" }}
            fileListVisible={false}
            onSuccess={(res) => {
              const url = res?.url;
              if (url) setImgUrl(url);
            }}
          >
            <Button appearance="ghost">Загрузить фото</Button>
          </Uploader>

          <Input
            placeholder="Или вставьте ссылку на изображение"
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
            <Form.ControlLabel>Категория</Form.ControlLabel>
            <Form.Control
              className="category"
              name="category"
              accepter={SelectPicker}
              data={categories.map((cat) => ({
                label: cat.name,
                value: cat.name,
              }))}
              searchable={false}
              placeholder="Выберите категорию"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Название</Form.ControlLabel>
            <Form.Control name="title" placeholder="Введите название товара" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Описание</Form.ControlLabel>
            <Form.Control
              name="description"
              accepter={Textarea}
              rows={4}
              placeholder="Введите описание товара"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Размеры</Form.ControlLabel>
            <Form.Control
              name="sizes"
              accepter={TagPicker}
              data={sizeOptions}
              placeholder="Выберите размеры"
              block
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Цвета</Form.ControlLabel>
            <Form.Control
              name="colors"
              accepter={TagPicker}
              data={colorOptions}
              placeholder="Выберите цвета"
              block
            />
          </Form.Group>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Form.Group>
              <Form.ControlLabel>Цена (сом)</Form.ControlLabel>
              <Form.Control name="price" type="number" />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Старая цена (сом)</Form.ControlLabel>
              <Form.Control name="oldPrice" type="number" />
            </Form.Group>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Form.Group>
              <Form.ControlLabel>Остаток</Form.ControlLabel>
              <Form.Control name="stock" type="number" />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Хит продаж</Form.ControlLabel>
              <Form.Control
                name="isHit"
                accepter={SelectPicker}
                searchable={false}
                data={[
                  { label: "Да", value: true },
                  { label: "Нет", value: false },
                ]}
                placeholder="Выберите"
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer className="modal-footer">
        <Button
          disabled={
            !formValue.title ||
            !formValue.category ||
            !formValue.description ||
            !formValue.price ||
            !formValue.stock ||
            !formValue.sizes?.length ||
            !formValue.colors?.length
          }
          appearance="primary"
          onClick={handleSubmit}
        >
          {itemData ? "Сохранить изменения" : "Добавить товар"}
        </Button>

        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModalForm;
