import { Table, Button, Whisper, Tooltip } from "rsuite";
import { MdEdit, MdDeleteOutline } from "react-icons/md";

const ItemsTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="admin-table-wrap">
      <Table
        bordered
        cellBordered
        data={data}
        autoHeight
        wordWrap="break-word"
        className="admin-rs-table"
      >
        <Table.Column width={70} align="center">
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.Cell dataKey="id" />
        </Table.Column>

        <Table.Column width={120}>
          <Table.HeaderCell>Фото</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <img
                src={rowData.image}
                alt="product"
                className="admin-table-image"
              />
            )}
          </Table.Cell>
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Категория</Table.HeaderCell>
          <Table.Cell dataKey="category" />
        </Table.Column>

        <Table.Column flexGrow={2}>
          <Table.HeaderCell>Название</Table.HeaderCell>
          <Table.Cell dataKey="title" />
        </Table.Column>

        <Table.Column width={150}>
          <Table.HeaderCell>Размеры</Table.HeaderCell>
          <Table.Cell>
            {(rowData) =>
              rowData.sizes?.length ? rowData.sizes.join(", ") : "—"
            }
          </Table.Cell>
        </Table.Column>

        <Table.Column width={110}>
          <Table.HeaderCell>Остаток</Table.HeaderCell>
          <Table.Cell>{(rowData) => rowData.stock ?? 0}</Table.Cell>
        </Table.Column>

        <Table.Column width={120}>
          <Table.HeaderCell>Старая цена</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (rowData.oldPrice ? `${rowData.oldPrice} сом` : "—")}
          </Table.Cell>
        </Table.Column>

        <Table.Column width={120}>
          <Table.HeaderCell>Цена</Table.HeaderCell>
          <Table.Cell>{(rowData) => `${rowData.price} сом`}</Table.Cell>
        </Table.Column>

        <Table.Column width={130} align="center" fixed="right">
          <Table.HeaderCell>Действия</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <div className="admin-table-actions">
                <Whisper
                  placement="top"
                  trigger="hover"
                  speaker={<Tooltip>Редактировать</Tooltip>}
                >
                  <Button
                    onClick={() => onEdit(rowData)}
                    appearance="subtle"
                    className="admin-icon-btn"
                  >
                    <MdEdit color="#4ade80" size={20} />
                  </Button>
                </Whisper>

                <Whisper
                  placement="top"
                  trigger="hover"
                  speaker={<Tooltip>Удалить</Tooltip>}
                >
                  <Button
                    onClick={() => onDelete(rowData)}
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
    </div>
  );
};

export default ItemsTable;