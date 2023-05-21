import React, { useState, useEffect } from 'react';
import api from '@/utils/api';


const ModalEditTecnico = ({typeResource, resource, onClose, onEditSuccess }) => {
  const [formData, setFormData] = useState({
    especialidad: '',
    nombre: '',
    correo: '',
    telefono: '',
  });

  useEffect(() => {
    setFormData({
      especialidad: resource.especialidad,
      nombre: resource.persona.nombre,
      correo: resource.persona.correo,
      telefono: resource.persona.telefono,
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
            <h5 className="modal-title">Editar Tecnico</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Especialidad</label>
                <input
                  type="text"
                  className="form-control"
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleInputChange}
                />
              </div>
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
                <label>Correo</label>
                <input
                  type="email"
                  className="form-control"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  value={formData.telefono}
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

export default ModalEditTecnico;
