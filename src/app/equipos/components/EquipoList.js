'use client'
import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';

import TableContainer from '@/containers/TableContainer';
import ModalCreateEquipo from './modals/ModalCreateEquipo';
import ModalEditEquipo from './modals/ModalEditEquipo';
import ModalDeleteEquipo from './modals/ModalDeleteEquipo';

const EquiposList = ({typeResource='equipos'}) => {
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
              nro_serie: resource.nro_serie,
              modelo: resource.modelo,
              marca: resource.marca,
              fecha: resource.fecha,
              garantia: resource.garantia,
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
        nameResource={'Equipo'}
        headeTable={[
          'Nro',
          'Nro de Serie',
          'Modelo',
          'Marca',
          'Fecha',
          'Garantia',
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
          <ModalCreateEquipo 
            typeResource={typeResource}
            onClose={handleModalCreateClose}
            onCreateSuccess={handleCreateSuccess}
          />
      )}
      {showModalEdit && resource && (
        <ModalEditEquipo
          typeResource={typeResource}
          resource={resource} 
          onClose={handleModalEditClose} 
          onEditSuccess={handleEditSuccess} 
        />
      )}
      {showModalDelete && resource && (
        <ModalDeleteEquipo 
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

export default EquiposList;
