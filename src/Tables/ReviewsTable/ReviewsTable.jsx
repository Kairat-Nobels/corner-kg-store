import React from "react";
import { Table, Button, Whisper, Tooltip } from "rsuite";
import { MdDeleteOutline } from "react-icons/md";

const ReviewsTable = ({ data = [], onDelete }) => {
  return (
    <div className="admin-table-wrap">
      <Table
        bordered
        cellBordered
        data={data}
        autoHeight
        wordWrap="break-word"
        className="admin-rs-table"
        locale={{
          emptyMessage: "Отзывов нет",
        }}
      >
        {/* NAME */}
        <Table.Column flexGrow={1.2}>
          <Table.HeaderCell>Имя</Table.HeaderCell>
          <Table.Cell dataKey="name" />
        </Table.Column>

        {/* PHONE */}
        <Table.Column flexGrow={1.2}>
          <Table.HeaderCell>Телефон</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => rowData.phone || "—"}
          </Table.Cell>
        </Table.Column>

        {/* COMMENT */}
        <Table.Column flexGrow={3}>
          <Table.HeaderCell>Отзыв</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <div style={{ whiteSpace: "pre-wrap" }}>
                {rowData.comment || "—"}
              </div>
            )}
          </Table.Cell>
        </Table.Column>

        {/* ACTIONS */}
        <Table.Column width={120} align="center">
          <Table.HeaderCell>Действия</Table.HeaderCell>
          <Table.Cell>
            {(rowData) => (
              <div className="admin-table-actions">
                <Whisper
                  trigger="hover"
                  placement="top"
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

export default ReviewsTable;
