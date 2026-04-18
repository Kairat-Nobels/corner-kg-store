import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import RecordsTable from "../../Tables/RecordsTable/RecordsTable";
import DeleteModal from "../../components/DeleteModalNew/DeleteModalNew";
import EditOrderModal from "../../components/EditOrderModal/EditOrderModal";
import "rsuite/dist/rsuite.min.css";
import { deleteOrder, updateOrder } from "../../store/slices/ordersSlice";

const statusList = [
  { label: "Все", value: "all" },
  { label: "Новый", value: "Новый" },
  { label: "Подтвержден", value: "Подтвержден" },
  { label: "Оплачен", value: "Оплачен" },
  { label: "Доставлен", value: "Доставлен" },
  { label: "Отменен", value: "Отменен" },
];

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state) => state.ordersReducer
  );

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleEdit = (order) => {
    setEditTarget(order);
  };

  const handleEditSave = (updated) => {
    dispatch(
      updateOrder({
        id: updated.id,
        updatedData: {
          status: updated.status,
          address: updated.address,
          comment: updated.comment,
          phone: updated.phone,
          name: updated.name,
        },
      })
    );
    setEditTarget(null);
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <div className="adminRecords">
      <div className="adminHeader">
        <h3>Заказы</h3>

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {statusList.map((status) => (
            <button
              key={status.value}
              className={statusFilter === status.value ? "btnActive" : "btn-outline"}
              onClick={() => setStatusFilter(status.value)}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>Ошибка: {error}</h3>
      ) : (
        <RecordsTable
          data={filteredOrders}
          onDelete={setDeleteTarget}
          onEdit={handleEdit}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          deleteFunc={deleteOrder}
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
        />
      )}

      {editTarget && (
        <EditOrderModal
          open={!!editTarget}
          onClose={() => setEditTarget(null)}
          order={editTarget}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default OrdersPage;