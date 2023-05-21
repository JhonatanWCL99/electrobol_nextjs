import React from 'react';
import api from '@/utils/api';


const ModalDeleteRepuesto = ({ typeResource,resource, onClose, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      // Realizar la llamada a la API para eliminar el resource
      await api.delete(`/${typeResource}/${resource.id}`);

      // Ejecutar la función de éxito de eliminación
      onDeleteSuccess();

      // Cerrar el modal
      onClose();
    } catch (error) {
      console.error('Error al eliminar el resource', error);
    }
  };

  return (
    <div className="modal modal-wrapper" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Eliminar Repuesto</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar este repuesto?</p>
          </div>
          <div className="modal-footer">
            <div className='d-flex flex-row justify-content-center gap-2 pt-2'>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Eliminar
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteRepuesto;
