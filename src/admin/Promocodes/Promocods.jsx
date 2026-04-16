import { useEffect, useState } from 'react';
import { Button, Table, Whisper, Tooltip } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import { deletePromocod, getPromocods } from '../../store/slices/promocodSlice';
import PromocodesModal from '../../components/PromocodesModal/PromocodesModal';

const Promocodes = () => {
  const dispatch = useDispatch();
  const { promocods, loading, error } = useSelector(state => state.promocodReducer);

  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getPromocods());
  }, [dispatch]);

  const handleEdit = (category) => {
    setEditCategory(category);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditCategory(null);
    setShowModal(true);
  };

  return (
    <div className='adminStaff'>
      <div className='adminHeader'>
        <h3>Промокоддор</h3>
        <button appearance="ghost" onClick={handleAdd}>
          + Промокод кошуу
        </button>
      </div>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Жүктөлүүдө...</p>
        </div>
      ) : error ? (
        <h3>Ката: {error}</h3>
      ) : (
        <Table bordered cellBordered data={promocods} autoHeight wordWrap="break-word">

          <Table.Column width={60} align="center">
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.Cell dataKey="id" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Промокод</Table.HeaderCell>
            <Table.Cell dataKey="code" />
          </Table.Column>

          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Жеңилдик (%)</Table.HeaderCell>
            <Table.Cell dataKey="discount" />
          </Table.Column>

          <Table.Column width={120} align="center" fixed="right">
            <Table.HeaderCell>Аракеттер</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                <div className='actionButtons'>
                  <Whisper
                    placement="top"
                    trigger="hover"
                    speaker={<Tooltip>Өзгөртүү</Tooltip>}
                  >
                    <Button onClick={() => handleEdit(rowData)} appearance="subtle">
                      <MdEdit color="#1caf68" size={20} />
                    </Button>
                  </Whisper>

                  <Whisper
                    placement="top"
                    trigger="hover"
                    speaker={<Tooltip>Өчүрүү</Tooltip>}
                  >
                    <Button onClick={() => setDeleteTarget(rowData)} appearance="subtle">
                      <MdDeleteOutline color="rgb(210 54 54)" size={20} />
                    </Button>
                  </Whisper>
                </div>
              )}
            </Table.Cell>
          </Table.Column>

        </Table>
      )}

      <PromocodesModal
        open={showModal}
        onClose={() => {
          setEditCategory(null);
          setShowModal(false);
        }}
        categoryData={editCategory}
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
