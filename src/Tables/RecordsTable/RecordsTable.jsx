import React from "react";
import { Table, Button, Whisper, Tooltip } from "rsuite";
import { MdEdit, MdDeleteOutline } from "react-icons/md";

const RecordsTable = ({ data = [], loading, error, onDelete, onEdit }) => {
  return (
    <div className="admin-table-wrap">
      <Table
        bordered
        cellBordered
        data={data}
        autoHeight
        wordWrap="break-word"
        locale={{ emptyMessage: "Заказов нет" }}
        loading={loading}
        className="admin-rs-table"
      >
        <Table.Column width={70} align="center">
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.Cell dataKey="id" />
        </Table.Column>

        <Table.Column width={300}>
          <Table.HeaderCell>Товары</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <div className="order-products-list">
                {rowData.order?.map((item, idx) => (
                  <div key={idx} className="order-product-item">
                    <strong>{item.title}</strong>
                    <span>
                      {item.quantity} шт. × {item.price} сом
                    </span>
                    {(item.selectedSize || item.selectedColor) && (
                      <small>
                        {item.selectedSize ? `Размер: ${item.selectedSize}` : ""}
                        {item.selectedSize && item.selectedColor ? " · " : ""}
                        {item.selectedColor ? `Цвет: ${item.selectedColor}` : ""}
                      </small>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Table.Cell>
        </Table.Column>

        <Table.Column width={130}>
          <Table.HeaderCell>Дата</Table.HeaderCell>
          <Table.Cell>
            {(rowData) =>
              rowData.date
                ? new Date(rowData.date).toLocaleDateString("ru-RU")
                : "—"
            }
          </Table.Cell>
        </Table.Column>

        <Table.Column width={140}>
          <Table.HeaderCell>Имя</Table.HeaderCell>
          <Table.Cell dataKey="name" />
        </Table.Column>

        <Table.Column width={150}>
          <Table.HeaderCell>Телефон</Table.HeaderCell>
          <Table.Cell dataKey="phone" />
        </Table.Column>

        <Table.Column width={180}>
          <Table.HeaderCell>Адрес</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => rowData.address || "Самовывоз"}
          </Table.Cell>
        </Table.Column>

        <Table.Column width={120}>
          <Table.HeaderCell>Сумма</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => `${rowData.amount} сом`}
          </Table.Cell>
        </Table.Column>

        <Table.Column width={120}>
          <Table.HeaderCell>Скидка</Table.HeaderCell>
          <Table.Cell>
            {(rowData) =>
              rowData.discountPercent ? `${rowData.discountPercent}%` : "—"
            }
          </Table.Cell>
        </Table.Column>

        <Table.Column width={140}>
          <Table.HeaderCell>Статус</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <span className="order-status-badge">{rowData.status}</span>
            )}
          </Table.Cell>
        </Table.Column>

        <Table.Column width={120} align="center" fixed="right">
          <Table.HeaderCell>Действия</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <div className="admin-table-actions">
                <Whisper
                  trigger="hover"
                  placement="top"
                  speaker={<Tooltip>Редактировать</Tooltip>}
                >
                  <Button
                    onClick={() => onEdit && onEdit(rowData)}
                    appearance="subtle"
                    className="admin-icon-btn"
                  >
                    <MdEdit color="#4ade80" size={20} />
                  </Button>
                </Whisper>

                <Whisper
                  trigger="hover"
                  placement="top"
                  speaker={<Tooltip>Удалить</Tooltip>}
                >
                  <Button
                    onClick={() => onDelete && onDelete(rowData)}
                    appearance="subtle"
                    className="admin-icon-btn"
                  >
                    <MdDeleteOutline color="#ef4444" size={20} />
                  </Button>
                </Whisper>
              </div>
            )}
          </Table.Cell>
        </Table.Column>
      </Table>

      {error && <div className="text-danger mt-3">Ошибка: {error}</div>}
    </div>
  );
};

export default RecordsTable;
