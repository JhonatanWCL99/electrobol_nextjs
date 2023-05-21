
import api from '@/utils/api';
import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
const ModalCreateEvaluacion = ({ typeResource,onClose, onCreateSuccess }) => {
  const [formData, setFormData] = useState({
    fecha_inicio: moment().format('DD-MM-YYYY'),
    estado: 'Progreso',
    descripcion: '',
    costo_inicial: 100,
    equipoId: '',
  });
  const [equipos,setEquipos] = useState([]);
  const [tecnicos,setTecnicos] = useState([]);

  useEffect(function(){
    fetchEquipos();
    fetchTecnicos();
  },[])

  const fetchEquipos = async () => {
    try {
        const response = await api.get(`/equipos`);
        setEquipos(response.data);
    } catch (error) {
        console.error(`Error al obtener la lista de ${typeResource}`, error);
    }
  };

  const fetchTecnicos = async () => {
    try {
        const response = await api.get(`/tecnicos`);
        setTecnicos(response.data);
    } catch (error) {
        console.error(`Error al obtener la lista de ${typeResource}`, error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/${typeResource}`, formData);

      // Ejecutar la función de éxito de creación
      onCreateSuccess();

      // Cerrar el modal y reiniciar los valores del formulario
      onClose();
    } catch (error) {
      console.error('Error al crear la evaluacion', error);
    }
  };

  return (
    <div className="modal modal-wrapper" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Crear Evaluacion</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Fecha Inicio</label>
                <input
                  type="text"
                  className="form-control"
                  name="fecha_inicio"
                  value={formData.fecha_inicio}
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
              <div className="form-group">
                <label>Costo Inicial</label>
                <input
                  type="text"
                  className="form-control"
                  name="costo_inicial"
                  value={formData.costo_inicial}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className='form-group'>
                <label>Asignar Tecnico</label>
                <select className='select form-select' name='tecnicoId'>
                    <option >Seleccione</option>
                    {tecnicos.length !== 0 && tecnicos.map(tecnico=>(
                      <option value={tecnico.id} key={tecnico.id}>{tecnico.persona.nombre}</option>
                    ))}
                </select>
              </div>
              <div className='form-group'>
                <label>Seleccione el Equipo</label>
                <select className='select form-select' name='equipoId'>
                    <option >Seleccione</option>
                    {equipos.length !== 0 && equipos.map(equipo=>(
                      <option value={equipo.id} key={equipo.id}>{equipo.modelo}</option>
                    ))}
                </select>
              </div>
              <div className='d-flex flex-row justify-content-center gap-2 pt-2'>
                <button type="submit" className="btn btn-primary">
                  Crear
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

export default ModalCreateEvaluacion;
