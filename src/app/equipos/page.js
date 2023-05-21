import LayoutContainer from '@/containers/LayoutContainer';
import React from 'react';
import './../../css/modal.css';
import EquiposList from './components/EquipoList';
const EquiposPage = () => {
  return (
    <LayoutContainer>
      <div className='card'>
        <div className='card-header'>
          <h1>Equipos</h1>
        </div>
        <div className='card-body'>
          <EquiposList />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default EquiposPage;
