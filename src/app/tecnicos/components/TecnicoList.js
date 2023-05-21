'use client'
import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import TableContainer from '@/containers/TableContainer';

import ModalCreateTecnico from './modals/ModalCreateTecnico';
import ModalEditTecnico from './modals/ModalEditCliente';
import ModalDeleteTecnico from './modals/ModalDeleteTecnico';



const TecnicosList = ({typeResource='tecnicos'}) => {
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
              especialidad: resource.especialidad,
              nombre: resource.persona.nombre,
              correo: resource.persona.correo,
              telefono: resource.persona.telefono,
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
    <>
      {<TableContainer
        nameResource={'Tecnico'}
        headeTable={[
          'Nro',
          'Especialidad',
          'Nombre',
          'Correo',
          'Teléfono',
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
          <ModalCreateTecnico
            typeResource={typeResource}
            onClose={handleModalCreateClose}
            onCreateSuccess={handleCreateSuccess}
          />
      )}
      {showModalEdit && resource && (
        <ModalEditTecnico 
            typeResource={typeResource}
            resource={resource} 
            onClose={handleModalEditClose} 
            onEditSuccess={handleEditSuccess} 
        />
      )}
      {showModalDelete && resource && (
        <ModalDeleteTecnico
            typeResource={typeResource}
            resource={resource} 
            onClose={handleModalDeleteClose} 
            onDeleteSuccess={handleDeleteSuccess} 
        />
      )}
      </TableContainer>}
    </>
  );
 
};

export default TecnicosList;
