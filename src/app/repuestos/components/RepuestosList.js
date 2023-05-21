'use client'
import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';

import TableContainer from '@/containers/TableContainer';
import ModalCreateEquipo from './modals/ModalCreateRepuesto';
import ModalEditEquipo from './modals/ModalEditRepuesto';
import ModalDeleteEquipo from './modals/ModalDeleteRepuesto';
import ModalCreateRepuesto from './modals/ModalCreateRepuesto';
import ModalEditRepuesto from './modals/ModalEditRepuesto';
import ModalDeleteRepuesto from './modals/ModalDeleteRepuesto';

const RepuestosList = ({typeResource='repuestos'}) => {
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
              nombre: resource.nombre,
              descripcion: resource.descripcion,
              proveedor: resource.proveedor,
              precio: resource.precio,
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
        nameResource={'Repuesto'}
        headeTable={[
          'Nro',
          'Nombre',
          'Descripcion',
          'Proveedor',
          'Precio',
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
          <ModalCreateRepuesto 
            typeResource={typeResource}
            onClose={handleModalCreateClose}
            onCreateSuccess={handleCreateSuccess}
          />
      )}
      {showModalEdit && resource && (
        <ModalEditRepuesto
          typeResource={typeResource}
          resource={resource} 
          onClose={handleModalEditClose} 
          onEditSuccess={handleEditSuccess} 
        />
      )}
      {showModalDelete && resource && (
        <ModalDeleteRepuesto 
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

export default RepuestosList;
