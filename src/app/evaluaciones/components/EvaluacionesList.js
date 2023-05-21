'use client'
import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';

import TableContainer from '@/containers/TableContainer';
import ModalCreateEvaluacion from './modals/ModalCreateEvaluacion';
import ModalEditEvaluacion from './modals/ModalEditEvaluacion';
import ModalDeleteEvaluacion from './modals/ModalDeleteEvaluacion';
import moment from 'moment';


const EvaluacionesList = ({typeResource='evaluaciones'}) => {
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
              costo_inicial: resource.costo_inicial,
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
        nameResource={'Evaluacion'}
        headeTable={[
          'Nro',
          'Fecha de Inicio',
          'Estado',
          'Descripcion',
          'Costo Inicial',
          'Acciones',
        ]}
        mappedResource={mappedResources}
        resources={resources}
        setShowModalCreate={setShowModalCreate}
        setShowModalEdit={setShowModalEdit}
        setShowModalDelete={setShowModalDelete}
        setResource={setResource}
      >
      {showModalCreate && (
          <ModalCreateEvaluacion 
            typeResource={typeResource}
            onClose={handleModalCreateClose}
            onCreateSuccess={handleCreateSuccess}
          />
      )}
      {showModalEdit && resource && (
        <ModalEditEvaluacion
          typeResource={typeResource}
          resource={resource} 
          onClose={handleModalEditClose} 
          onEditSuccess={handleEditSuccess} 
        />
      )}
      {showModalDelete && resource && (
        <ModalDeleteEvaluacion
          typeResource={typeResource}
          resource={resource} 
          onClose={handleModalDeleteClose} 
          onDeleteSuccess={handleDeleteSuccess} 
        />
      )}
      </TableContainer>}
    </div>
  );
 
};

export default EvaluacionesList;
