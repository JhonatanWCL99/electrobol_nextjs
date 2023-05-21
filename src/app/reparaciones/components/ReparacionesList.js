'use client'
import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';

import TableContainer from '@/containers/TableContainer';

import moment from 'moment';
import ModalEditEvaluacion from '@/app/evaluaciones/components/modals/ModalEditEvaluacion';


const ReparacionesList = ({typeResource='reparaciones'}) => {
  const [resource, setResource] = useState(null);
  const [resources, setResources] = useState([]);
  const [mappedResources, setMappedResources] = useState([]);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
      try {
          const response = await api.get(`/${typeResource}`);
          setResources(response.data);
          const mappedR = response.data.map((resource,index)=>{
            return {
              nro:index+1,
              fecha_inicio: moment(resource.fecha_inicio).format('DD-MM-YYYY') ,
              estado: resource.estado,
              descripcion: resource.descripcion,
              tecnico: resource.tecnico.persona.nombre,
              id: resource.id,
            }});
          setMappedResources(mappedR);
      } catch (error) {
          console.error(`Error al obtener la lista de ${typeResource}`, error);
      }
  };

  //CREAR
  const handleModalCreateClose = () => {
    setShowModalCreate(false);
  };

  const handleCreateSuccess = () => {
    fetchResources();
  };

  //EDITAR
  const handleModalEditClose = () => {
    setShowModalEdit(false);
  };

  const handleEditSuccess = () => {
    fetchResources();
  };

  //ELIMINAR
  const handleModalDeleteClose = () => {
    setShowModalDelete(false);
  };

  const handleDeleteSuccess = () => {
    fetchResources();
  };

  

  
  return (
    <div className='container-fluid bg-gray'>
      { <TableContainer
        nameResource={'Reparacion'}
        headeTable={[
          'Nro',
          'Fecha de Inicio',
          'Estado',
          'Descripcion',
          'Tecnico Asignado',
          'Acciones',
        ]}
        mappedResource={mappedResources}
        resources={resources}
        setShowModalCreate={setShowModalCreate}
        setShowModalEdit={setShowModalEdit}
        setShowModalDelete={setShowModalDelete}
        setResource={setResource}
      >
        {showModalEdit && resource && (
        <ModalEditEvaluacion
          typeResource={typeResource}
          resource={resource} 
          onClose={handleModalEditClose} 
          onEditSuccess={handleEditSuccess} 
        />
      )}
      </TableContainer>}
    </div>
  );
 
};

export default ReparacionesList;
