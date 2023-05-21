import React, { useState, useEffect } from 'react';
import api from '@/utils/api';
import moment from 'moment/moment';

const ModalEditEvaluacion = ({typeResource, resource, onClose, onEditSuccess }) => {
  const [formData, setFormData] = useState({
    fecha_fin: moment().format('DD-MM-YYYY'),
    estado: 'Finalizado',
    descripcion: '',
  });


  useEffect(() => {
    setFormData({
      descripcion: resource.descripcion,
    });
  }, [resource]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la llamada a la API para editar el resource con los datos del formulario
      await api.put(`/${typeResource}/${resource.id}`, formData);

      // Ejecutar la función de éxito de edición
      onEditSuccess();

      // Cerrar el modal
      onClose();
    } catch (error) {
      console.error('Error al editar el resource', error);
    }
  };

  return (
    <div className="modal modal-wrapper" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Finalizar Evaluacion</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Fecha Finalizado</label>
                <input
                  type="text"
                  className="form-control"
                  name="fecha_fin"
                  value={formData.fecha_fin}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control"
                  name="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                />
              </div>
              <div className='d-flex flex-row justify-content-center gap-2 pt-2'>
                <button type="submit" className="btn btn-primary">
                  Finalizar
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditEvaluacion;
