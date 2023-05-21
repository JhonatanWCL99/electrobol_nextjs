import ClientesList from '@/app/clientes/components/ClientList';
import LayoutContainer from '@/containers/LayoutContainer';
import React from 'react';
import './../../css/modal.css';
const ClientesPage = () => {
  return (
    <LayoutContainer>
      <div className='card'>
        <div className='card-header'>
          <h1>Clientes</h1>
        </div>
        <div className='card-body'>
          <ClientesList />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default ClientesPage;
