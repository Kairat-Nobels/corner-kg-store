import { useEffect, useState } from "react";
import { Button, Table, Whisper, Tooltip } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import DeleteModal from "../../components/DeleteModalNew/DeleteModalNew";
import PromocodesModal from "../../components/PromocodesModal/PromocodesModal";
import { deletePromocod, getPromocods } from "../../store/slices/promocodSlice";

const Promocodes = () => {
  const dispatch = useDispatch();
  const { promocods, loading, error } = useSelector(
    (state) => state.promocodReducer
  );

  const [showModal, setShowModal] = useState(false);
  const [editCard, setEditCard] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getPromocods());
  }, [dispatch]);

  const handleEdit = (card) => {
    setEditCard(card);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditCard(null);
    setShowModal(true);
  };

  return (
    <div className="adminStaff">
      <div className="adminHeader">
        <h3>Дисконтные карты</h3>
        <button onClick={handleAdd}>+ Добавить карту</button>
      </div>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>Ошибка: {error}</h3>
      ) : (
        <div className="admin-table-wrap">
          <Table
            bordered
            cellBordered
            data={promocods}
            autoHeight
            wordWrap="break-word"
            className="admin-rs-table"
            locale={{ emptyMessage: "Дисконтных карт нет" }}
          >
            <Table.Column width={70} align="center">
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.Cell dataKey="id" />
            </Table.Column>

            <Table.Column flexGrow={1.2}>
              <Table.HeaderCell>Номер карты</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => rowData.cardNumber || rowData.code || "—"}
              </Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1.2}>
              <Table.HeaderCell>Клиент</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => rowData.clientName || "—"}
              </Table.Cell>
            </Table.Column>

            <Table.Column flexGrow={1.2}>
              <Table.HeaderCell>Телефон</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => rowData.phone || "—"}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={110}>
              <Table.HeaderCell>Скидка</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => `${rowData.discount || 0}%`}
              </Table.Cell>
            </Table.Column>

            <Table.Column width={150}>
              <Table.HeaderCell>Сумма покупок</Table.HeaderCell>
              <Table.Cell>
                {(rowData) =>
                  rowData.totalPurchases ? `${rowData.totalPurchases} сом` : "0 сом"
                }
              </Table.Cell>
            </Table.Column>

            <Table.Column width={120}>
              <Table.HeaderCell>Статус</Table.HeaderCell>
              <Table.Cell>
                {(rowData) => (
                  <span className="order-status-badge">
                    {rowData.status || "active"}
                  </span>
                )}
              </Table.Cell>
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
                        onClick={() => handleEdit(rowData)}
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
                        onClick={() => setDeleteTarget(rowData)}
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
      )}

      <PromocodesModal
        open={showModal}
        onClose={() => {
          setEditCard(null);
          setShowModal(false);
        }}
        categoryData={editCard}
      />

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
          deleteFunc={deletePromocod}
          refreshFunc={getPromocods}
        />
      )}
    </div>
  );
};

export default Promocodes;