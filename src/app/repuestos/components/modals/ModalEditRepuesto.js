import React, { useState, useEffect } from 'react';
import api from '@/utils/api';


const ModalEditRepuesto = ({typeResource, resource, onClose, onEditSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    proveedor: '',
    precio: '',
  });

  const [clientes,setClientes] = useState([]);

  useEffect(() => {
    setFormData({
      nombre: resource.nombre,
      descripcion: resource.descripcion,
      proveedor: resource.proveedor,
      precio: resource.precio,
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
            <h5 className="modal-title">Editar Repuesto</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formData.nombre}
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
              <div className="form-group">
                <label>Proveedor</label>
                <input
                  type="text"
                  className="form-control"
                  name="proveedor"
                  value={formData.proveedor}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                />
              </div>
              <div className='d-flex flex-row justify-content-center gap-2 pt-2'>
                <button type="submit" className="btn btn-primary">
                  Guardar
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

export default ModalEditRepuesto;
