import LayoutContainer from '@/containers/LayoutContainer';
import React from 'react';
import './../../css/modal.css';
import RepuestosList from './components/RepuestosList';
const RepuestosPage = () => {
  return (
    <LayoutContainer>
      <div className='card'>
        <div className='card-header'>
          <h1>Repuestos</h1>
        </div>
        <div className='card-body'>
          <RepuestosList />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default RepuestosPage;
