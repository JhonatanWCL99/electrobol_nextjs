import React, { useState, useEffect } from 'react';
import api from '@/utils/api';


const ModalEditEquipo = ({typeResource, resource, onClose, onEditSuccess }) => {
  const [formData, setFormData] = useState({
    nro_serie: '',
    modelo: '',
    marca: '',
    fecha: '',
    garantia: '',
    clienteId: '',
  });

  const [clientes,setClientes] = useState([]);

  useEffect(function(){
    fetchClientes();
  },[])

  const fetchClientes = async () => {
    try {
        const response = await api.get(`/clientes`);
        setClientes(response.data);
    } catch (error) {
        console.error(`Error al obtener la lista de ${typeResource}`, error);
    }
  };


  useEffect(() => {
    setFormData({
      nro_serie: resource.nro_serie,
      modelo: resource.modelo,
      marca: resource.marca,
      fecha: resource.fecha,
      garantia: resource.garantia,
      clienteId: resource.clienteId,
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
            <h5 className="modal-title">Editar Cliente</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nro de Serie</label>
                  <input
                    type="number"
                    className="form-control"
                    name="nro_serie"
                    value={formData.nro_serie}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Modelo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="modelo"
                    value={formData.modelo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Marca</label>
                  <input
                    type="text"
                    className="form-control"
                    name="marca"
                    value={formData.marca}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Fecha</label>
                  <input
                    type="date"
                    className="form-control"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Garantia</label>
                  <input
                    type="text"
                    className="form-control"
                    name="garantia"
                    value={formData.garantia}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='form-group'>
                  <label>Seleccione el Cliente</label>
                  <select className='select form-select' name='clienteId'>
                      <option >Seleccione</option>
                      {clientes.map(cliente=>(
                        <option value={cliente.id}>{cliente.persona.nombre}</option>
                      ))}
                  </select>
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

export default ModalEditEquipo;
